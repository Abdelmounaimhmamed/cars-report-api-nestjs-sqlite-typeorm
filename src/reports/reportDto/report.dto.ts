
import {Expose , Transform} from "class-transformer"


export class Report {
    
    @Expose()
    id : string;

    @Expose()
    make: string;

    @Expose()
    model:  string;

    @Expose()
    year : Date;
    
    @Expose()
    mileage : number;

    @Expose()
    longtitude: number;

    @Expose()
    latitude : number;

    @Expose()
    price : number
    
    @Expose()
    approved: boolean;

    @Transform(({obj}) => obj.user.id)
    @Expose()
    userId: number;

}