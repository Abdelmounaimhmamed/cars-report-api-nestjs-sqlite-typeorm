import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateReportDto } from "./reportDto/createReport.dto";
import { UpdateReportDto } from "./reportDto/updateReport.dto";
import { ReportService } from "./report.service";
import { ReportEntity } from "./report.entity";
import { AuthGuard } from "src/guards/Auth.guard";
import { CurrentUser } from "src/decorators/CurrentUser.decorator";
import { Serialize } from "src/Interceptors/Custom.interceptor";
import { Report } from "./reportDto/report.dto";
import { GetEstimatedDto } from "./reportDto/GetEstimated.dto";
import { ApproveReportDto } from "./reportDto/ApproveReport.dto";
import { AdminGuard } from '../guards/Admin.guard';

@Controller("reports")
@Serialize(Report)
export class ReportController {
    
    constructor(private readonly reportService: ReportService){}
    
    @Get()
    async getEstimated(@Query() query: GetEstimatedDto) {
        return await this.reportService.createEstimate(query);
    }
    
    @Post("add")
    @UseGuards(AuthGuard)
    async createReport(@Body("report") reportBody : CreateReportDto ,@CurrentUser() user : any) : Promise<ReportEntity> {
        const report = await this.reportService.createReport(reportBody , user);
        return report;
    }   

    @Get("")
    async  getAllReport() : Promise<ReportEntity[]>{
        const reports = await this.reportService.getAllReports();
        return reports;
    }

    @Get(":id")
    async getOneReport(@Param("id") id: number) : Promise<ReportEntity> {
        const report = await this.reportService.getOneReport(id);
        return report;
    }

    // @Patch(":id")
    // async updateReport(@Param("id") id : number , @Body("report") reportData : UpdateReportDto){
    //     const report = await this.reportService.updateReport(reportData,id);
    //     return report;
    // }

    @Delete(":id")
    @UseGuards(AuthGuard)
    async deleteReport(@Param("id") id: number) {
        return await this.reportService.deleteReport(id);
    }

    @UseGuards(AdminGuard)
    @Patch("/:id")
    async approvedReport(@Param("id") id : number  , @Body() body: ApproveReportDto ) {
        console.log(body);
        return await this.reportService.changeApproval(id, body.approved);
    }

}