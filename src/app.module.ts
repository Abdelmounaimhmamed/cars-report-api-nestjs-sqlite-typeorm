import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportModule } from './reports/report.module';
import { AutthModule } from './auth/auth.module';
import { UserEntity } from './auth/auth.entity';
import { ReportEntity } from './reports/report.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
const CookieSession = require("cookie-session");

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath:  `.env.${process.env.NODE_ENV}` 
  }) ,ReportModule, AutthModule ,
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService : ConfigService) => {
      return {
        type: "sqlite",
        database: configService.get("DB_NAME"),
        synchronize: true,
        entities: [UserEntity , ReportEntity]
      }
    }
  })
  // TypeOrmModule.forRoot({
  //   type: "sqlite",
  //   database: "db.sqlite",
  //   entities: [UserEntity,ReportEntity],
  //   synchronize: true,
  // })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer : MiddlewareConsumer){
    consumer.apply(
      CookieSession({
        keys: ["asdf"]
      })
    ).forRoutes("*")
  }

}
