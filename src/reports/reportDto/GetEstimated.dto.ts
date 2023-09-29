import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";


export class GetEstimatedDto {
    
    

    @IsString()
    @IsOptional()
    make?: string;

    @IsString()
    @IsOptional()
    model?:  string;

    @IsDate()
    @IsOptional()
    year?: Date;
    
    @IsNumber()
    @IsOptional()
    mileage ?: number;

    @IsNumber()
    @IsOptional()
    longtitude ?: number;

    @IsNumber()
    @IsOptional()
    latitude ?: number;

    @IsNumber()
    @IsOptional()
    price ?: number
}