import { IsDate, IsEmpty, IsString } from "class-validator";

export class slotDTO{
    @IsString()
    @IsEmpty()
    date:string;

    @IsString()
    @IsEmpty()
    start_time: string;

    @IsEmpty()
    @IsString()
    end_time: string;
}