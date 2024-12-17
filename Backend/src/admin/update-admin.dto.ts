import { IsEmail, IsEmpty, IsString } from "class-validator"
export class UpdateAdminDto {
  @IsString()
  @IsEmpty()
  password:string;
}

export class ValidAdminDTO{
  @IsEmpty({message:"Email Can not be empty"})
  @IsString()
  @IsEmail({},{message:"Email Can not be empty"})
  email:string

  @IsEmpty()
  @IsString()
  password:string;
}
