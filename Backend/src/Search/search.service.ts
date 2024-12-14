import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student_Regi } from 'src/User/Student_Entity/student.entity'; // Student entity
import { Search } from './Search_history Entity/search.entity';
import { Admin } from 'src/admin/Admin_Entity/admin.entity';

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
    // Fetch students matching the query (by email or university_id)
    const students = await this.studentRepository.find({
      where: [{ email: query }, { university_id: query }],
    });

    if (students.length === 0) {
      throw new NotFoundException('No students found for the given query');
    }

    // Log the search query in the search history
    const searchRecord = new Search();
    searchRecord.query = query;
    searchRecord.timestamp = new Date();

    if (adminId) {
      const admin = await this.adminRepository.findOne({
        where: { id: adminId },
      });
      if (admin) {
        searchRecord.admin = admin; // Associate admin with the search
      } else {
        throw new NotFoundException('Admin not found');
      }
    }

    await this.searchRepository.save(searchRecord); // Save the search record

    return students;
  }

  // Ban or unban a student by email or university_id
  async banUnbanStudent(
    identifier: string, // This can be either email or university_id
    banStatus: boolean,
  ): Promise<Student_Regi> {
    // Find the student by email or university_id
    const student = await this.studentRepository.findOne({
      where: [{ email: identifier }, { university_id: identifier }],
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    // Update the ban status
    student.isBanned = banStatus; // Use true for banned, false for unbanned
    return this.studentRepository.save(student); // Save the updated student entity
  }
}
