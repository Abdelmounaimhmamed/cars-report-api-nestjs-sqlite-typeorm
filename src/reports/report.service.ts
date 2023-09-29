import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UpdateReportDto } from "./reportDto/updateReport.dto";
import { CreateReportDto } from "./reportDto/createReport.dto";
import { ReportEntity } from "./report.entity";
import { DeleteResult, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { GetEstimatedDto } from "./reportDto/GetEstimated.dto";



@Injectable()
export class ReportService{
    constructor(@InjectRepository(ReportEntity) private readonly reportRepository: Repository<ReportEntity>){

    }

    async createEstimate({make , model ,latitude,longtitude , year ,mileage}: GetEstimatedDto) {
        return await  this.reportRepository.createQueryBuilder()
        .select("AVG(price)" , 'price')
        .where("make = :make" , {make})
        .andWhere("model = :model" , {model})
        .andWhere("latitude - :latitude BETWEEN -5 AND 5" , {latitude})
        .andWhere("longtitude - :longtitude BETWEEN -5 AND 5", {longtitude})
        .andWhere("year - :year BETWEEN -3 AND 5",{year})
        .orderBy("ABS(mileage - :mileage)", "DESC")
        .setParameters({mileage})
        .limit(3)
        // .getRawMany();
        .getRawOne();
    } 

    async createReport({make,model,mileage,latitude,longtitude,price,year} : CreateReportDto , user : any) : Promise<ReportEntity>{
        const newReport  =  this.reportRepository.create({
            make,model ,mileage,latitude,longtitude ,price , year
        });
        newReport.user = user;
        return await this.reportRepository.save(newReport);
    }

    async getOneReport(id : number) : Promise<ReportEntity>{
        const report = await this.reportRepository.findOne({
            where: {id }
        });
        if(!report){
            throw new HttpException("no report found with this id !",HttpStatus.NOT_FOUND);
        }

        return report;
    }

    async getAllReports() : Promise<ReportEntity[]> {
        const reports = await this.reportRepository.find();
        if(!reports || reports.length === 0){
            throw new HttpException("no reports found !", HttpStatus.NOT_FOUND);
        }
        return reports;
    }

    async deleteReport(id : number): Promise<DeleteResult> {
        return await this.reportRepository.delete({id});
    }

    async updateReport(updateData:UpdateReportDto , id: number) : Promise<ReportEntity> {
        const ifExist = await this.getOneReport(id);
        Object.assign(ifExist,updateData);
        return await this.reportRepository.save(ifExist);
    }

    async changeApproval(id: number , approved : boolean){
        const report = await this.getOneReport(id);
        console.log(report);
        report.approved = approved;
        return await this.reportRepository.save(report);
    }
}