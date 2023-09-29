import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { IsNull } from "typeorm";


export class UpdateReportDto {
   

    @IsBoolean()
    approved : boolean ;
}