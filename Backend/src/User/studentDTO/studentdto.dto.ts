import { IsNotEmpty, IsString, IsEmail, Matches } from "class-validator";
export class CreateStudentDTO {
    @IsNotEmpty({message: 'University ID is required'})
    @IsString({message: 'University ID must be a string'})
    university_id: string;

   @IsString()
   @IsNotEmpty()
   @Matches(/^\d{2}-\d{5}-\d{1}@student\.aiub\.edu$/, {
    message: 'Invalid email format. The email must be AIUB-provided email."',
   })
   email: string;

    @IsNotEmpty({message: 'Password is required'})
    @IsString({message: 'Password must be a string' })
    @Matches(/^.{6,}$/, {
        message: 'Password must be at least 6 characters long.',
      })
    password: string;
}

export class ValidateDTO{

  @IsString()
  @IsNotEmpty()
  email: string;

    @IsNotEmpty({message: 'Password is required'})
    @IsString({message: 'Password must be a string' })
    @Matches(/^.{6,}$/, {
        message: 'Password must be at least 6 characters long.',
      })
    password: string;
}

export class sendEmailDto{

  @IsString()
  @Matches(/^\d{2}-\d{5}-\d{1}@student\.aiub\.edu$/, {
    message: 'Invalid email format. The email must be AIUB-provided email."',
  })
  email: string;
}

export class verifyOtp{
    @IsString()
    otp:string;
}

export class resetPassDTO{
    @IsNotEmpty()
    @IsString()
    newPass: string;

    @IsNotEmpty()
    @IsString()
    confirmPass: string;

}

export class changePassDTO{
    @IsNotEmpty()
    @IsString()
    @Matches(/^.{6,}$/, {
        message: 'Password must be at least 6 characters long.',
      })
    oldPass: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^.{6,}$/, {
        message: 'Password must be at least 6 characters long.',
      })
    newPass: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^.{6,}$/, {
        message: 'Password must be at least 6 characters long.',
      })
    confirmPass: string;
}

export class SearchSlotDto {
  @IsString()
  time: string;
}