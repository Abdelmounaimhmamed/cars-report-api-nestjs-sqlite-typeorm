import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Session } from "inspector";



export const CurrentUser = createParamDecorator( (data: any , ctx : ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const currentUser = request.user ;
    console.log(currentUser);
    return currentUser;
})

