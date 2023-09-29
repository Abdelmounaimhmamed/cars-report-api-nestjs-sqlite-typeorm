import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from './auth.service';
import { UserEntity } from "./auth.entity";
// import { CurrentUserInterceptor } from "./interceptors/Current-user.interceptor";
// import { APP_INTERCEPTOR } from "@nestjs/core";
import { CurrentUserMiddleware } from "./middlewares/Current-user.midleware";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [AuthController],
    // providers:  [AuthService, {
    //     provide: APP_INTERCEPTOR,
    //     useClass : CurrentUserInterceptor
    // }],
    providers: [AuthService ,CurrentUserMiddleware]
})
export class AutthModule {

    configure(consumer : MiddlewareConsumer) {
        consumer.apply(CurrentUserMiddleware).forRoutes("*");
    }
}