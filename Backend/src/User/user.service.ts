import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student_Regi } from './Student_Entity/student.entity';
import { CreateStudentDTO, SearchSlotDto, ValidateDTO,changePassDTO,resetPassDTO,sendEmailDto } from './studentDTO/studentdto.dto';
import { Repository } from 'typeorm';
import { Main_StudentDB } from './Student_Entity/Maindb.entity';
import * as bcrypt from 'bcrypt';
import { Sport } from '../sports/Sports_Entity/sports.entity';
import { Booking } from '../bookings/Booking_Entity/booking.entity';
import { Slot } from '../Slots/Slot_Entity/slot.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(Student_Regi) private userRepo : Repository<Student_Regi>,
                @InjectRepository(Main_StudentDB) private mainSRepo: Repository<Main_StudentDB>,
                @InjectRepository(Sport) private sportRepo: Repository<Sport> , 
                @InjectRepository(Booking) private bookRepo: Repository<Booking>,
                @InjectRepository(Slot) private slotRepo: Repository<Slot>, 
){}

    async findById(id: number) {
        return this.userRepo.findOne({ where: { id} });
    }


    async registerUser(createdto:CreateStudentDTO): Promise<any>{
        const IsPresent = await this.userRepo.findOneBy({email:createdto.email})
        if(!IsPresent){
         await this.userRepo.save(createdto);
        return {message:"Registratoin Successfull"};}
       
        throw new BadRequestException("You already have an account....!!");
    
    }

    async userLogin(logindata:ValidateDTO): Promise<any>{
        return await this.userRepo.findOneBy({email: logindata.email});
    }
   
    async forgetPass(data:sendEmailDto){
        return await this.userRepo.findOneBy({email:data.email});
    }

    async resetPassword(req)
    {
        return await this.userRepo.findOneBy({email:req.session.email});    
    }

    async saveResestPassword(userMail:string ,updatedPassword:string)
    {
        await this.userRepo.update({email:userMail} , { password: updatedPassword });
    }

    async userProfile(universityId:string){
        const IsExists = await this.mainSRepo.findOneBy({university_id: universityId})
        if(!IsExists){
            return new BadRequestException("Invalid User")
        }
        const {password, ...userData} = IsExists;
        return userData;
    }

    async getBalance(studentId:number){
        const IsExists = await this.userRepo.findOneBy({id: studentId})
        if(!IsExists){
            return new BadRequestException("Invalid User")
        }
        const {password,email,university_id,isBanned,id, ...userData} = IsExists;
        return userData;
    }

    async changePass(data:changePassDTO,userid:number)
    {
        const IsExists = await this.userRepo.findOneBy({id:userid});
        if(!IsExists)
        {
            return new BadRequestException("User not found!!")
        }
        const matchPass = await bcrypt.compare(data.oldPass, IsExists.password);
        if(!matchPass)
        {
            return new BadRequestException("Password can not be changed!!");
        }

        else if (data.newPass !== data.confirmPass)
        {
            return new BadRequestException("New password and confirm password not mathced");
        }
        const hashedPassword = await bcrypt.hash(data.newPass, 8);
        data.newPass = hashedPassword;
        await this.userRepo.update({id:userid},{password:data.newPass});
        return {message:"Password changed Successfully"};
    }

    async getOutdooSports(){
        const isExists = await this.sportRepo.find({where: {type:'outdoor'}});
        if(!isExists)
        {
            throw new BadRequestException("There are no outdoor games");
        }
        return isExists;
    }

    async getIndoor(){
        const isExists = await this.sportRepo.find({where: {type:'indoor'}});
        if(!isExists)
        {
            throw new BadRequestException("There are no indoor games");
        }
        return isExists;
    }

    async getBooking(id:number){
        const isExists = await this.bookRepo.query(
            `SELECT 
            b.id AS Booking_ID,
            s.id AS Slot_ID,
            sp.id AS Sport_ID,
            s.start_time,
            s.end_time,
            s.date,
            b.payment_status,
            b.status,
            s.member,
            sp.name AS game_name
            FROM 
            "Booking" b
            JOIN 
            "Slot" s ON s.id = b.slot_id
            JOIN 
            "Sport" sp ON sp.id = b.sport_id
            WHERE 
            b.student_id = $1`,[id]);

        if(!isExists){
            throw new BadRequestException("Not Found");
        }
        else if(isExists.length ===0){
            throw new BadRequestException("No bookings")
        }

        return isExists;
    }

    async searchSlotByTime(sportsName:string,inputTime:string) {
        const slots = await this.slotRepo.query(
          `SELECT 
            sp.name,
            s.start_time,
            s.end_time,
            TO_CHAR(s.date, 'YYYY-MM-DD') AS date,
            s.member,
            s.is_booked
          FROM 
            "Slot" s
        JOIN 
            "Sport" sp ON sp.id = s.sport_id
          WHERE 
            s.start_time = $1 AND sp.name =$2`,
          [inputTime,sportsName],
        );

        if(!slots)
        {
            throw new BadRequestException("No slots Found")
        }
        else if(slots.length==0)
            {
                throw new BadRequestException("Empty Search")
            }
    
        return slots;
      }
}
