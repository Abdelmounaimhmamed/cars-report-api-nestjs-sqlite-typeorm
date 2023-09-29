import { IsBoolean } from "class-validator";
import { UserEntity } from "src/auth/auth.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name : "Reports"})
export class ReportEntity {
    
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    make: string;


    @Column()
    model:  string;


    @Column()
    year : Date;

    
    @Column()
    mileage : number;


    @Column()
    longtitude: number;


    @Column()
    latitude : number;


    @Column()
    price : number

    @Column({default : false})
    approved : boolean

    @ManyToOne(() => UserEntity , (user) => user.reports, {eager : true})
    user : UserEntity

}