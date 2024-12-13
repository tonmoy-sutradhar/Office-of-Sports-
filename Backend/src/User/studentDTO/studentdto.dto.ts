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
    /*@Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/, {
        message:
        'Passwords must be at least 8 characters, should include atleast one uppercase and one lowercase letter and a special character and a digit'
    })*/
    password: string;
}

export class ValidateDTO{

    @IsNotEmpty({message: 'Email is required'})
    @IsEmail({}, {message: 'Email must be valid'})
    email: string;

    @IsNotEmpty({message: 'Password is required'})
    @IsString({message: 'Password must be a string' })
   /* @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/, {
        message:
        'Passwords must be at least 8 characters, should include atleast one uppercase and one lowercase letter and a special character and a digit'
    })*/
    password: string;
}

export class sendEmailDto{

    @IsEmail()
    email:string
}

export class verifyOtp{
    @IsString()
    otp:string;
}