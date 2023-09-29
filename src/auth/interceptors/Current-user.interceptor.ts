import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { AuthService } from "../auth.service";


@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {

    constructor(private readonly userService : AuthService){}

    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        const request = context.switchToHttp().getRequest();
        const id  = request.session.user.id;

        if(id){
            const user = await this.userService.findOne(id);
            request.user = user;
        }
        return next.handle();
    }

}

