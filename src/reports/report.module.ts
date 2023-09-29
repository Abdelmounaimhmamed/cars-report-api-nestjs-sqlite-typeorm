import { Module } from "@nestjs/common";
import { ReportController } from "./report.controller";
import { ReportService } from "./report.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportEntity } from "./report.entity";
import { AuthGuard } from "src/guards/Auth.guard";


@Module({
    imports: [TypeOrmModule.forFeature([ReportEntity])],
    controllers: [ReportController],
    providers: [ReportService,AuthGuard ]
})
export class ReportModule {

}