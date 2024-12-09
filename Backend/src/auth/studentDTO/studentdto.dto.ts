import { IsNotEmpty, IsString, IsEmail, Matches } from "class-validator";
export class CreateStudentDTO {
    @IsNotEmpty({message: 'University ID is required'})
    @IsString({message: 'University ID must be a string'})
    university_id: string;

    @IsNotEmpty({message: 'Email is required'})
    @IsEmail({}, {message: 'Email must be valid'})
    email: string;

    @IsNotEmpty({message: 'Password is required'})
    @IsString({message: 'Password must be a string' })
    password: string;
}

export class ValidateDTO{

    @IsNotEmpty({message: 'Email is required'})
    @IsEmail({}, {message: 'Email must be valid'})
    email: string;

    @IsNotEmpty({message: 'Password is required'})
    @IsString({message: 'Password must be a string' })
    password: string;
}