import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student_Regi } from '../User/Student_Entity/student.entity';
import { Search } from './Search_history Entity/search.entity';
import { Admin } from '../admin/Admin_Entity/admin.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Student_Regi)
    private readonly studentRepository: Repository<Student_Regi>,

    @InjectRepository(Search)
    private readonly searchRepository: Repository<Search>,

    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  // Search for a student by email or university ID
  async searchStudent(
    query: string,
    adminId?: number,
  ): Promise<Student_Regi[]> {
    const students = await this.studentRepository.find({
      where: [{ email: query }, { university_id: query }],
      select: ['id', 'university_id', 'email', 'isBanned', 'balance'],
    });

    if (students.length === 0) {
      throw new NotFoundException('No students found for the given query');
    }

    const searchRecord = new Search();
    searchRecord.query = query;
    searchRecord.timestamp = new Date();

    if (adminId) {
      const admin = await this.adminRepository.findOne({
        where: { id: adminId },
      });
      if (admin) {
        searchRecord.admin = admin;
      } else {
        throw new NotFoundException('Admin not found');
      }
    }

    await this.searchRepository.save(searchRecord);

    return students;
  }

  // Ban or unban a student by university_id
  async banUnbanStudent(
    identifier: string, // This can be either email or university_id
    banStatus: boolean,
  ): Promise<Student_Regi> {
    const student = await this.studentRepository.findOneBy({ university_id : identifier});

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    student.isBanned = banStatus;
    return this.studentRepository.save(student);
  }

  // Get all students
  async getAllStudents(): Promise<Student_Regi[]> {
    return this.studentRepository.find({
      select: ['id', 'university_id', 'email', 'isBanned', 'balance'],
    });
  }
}
