import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IsNull } from "typeorm";


export class CreateReportDto {
    @IsString()
    @IsNotEmpty()
    make: string;

    @IsString()
    @IsNotEmpty()
    model:  string;

    @IsNumber()
    @IsNotEmpty()
    year : Date;
    
    @IsNumber()
    @IsNotEmpty()
    mileage : number;

    @IsNumber()
    @IsNotEmpty()
    longtitude: number;

    @IsNumber()
    @IsNotEmpty()
    latitude : number;

    @IsNumber()
    @IsNotEmpty()
    price : number
}