import { Exclude } from "class-transformer";
import { ReportEntity } from "src/reports/report.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: "Users"})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email : string;

    
    @Column()
    @Exclude()
    password : string;

    @Column({default : true})
    isAdmin: boolean;

    @OneToMany(() => ReportEntity , (report) => report.user )
    reports: ReportEntity[]

    
}