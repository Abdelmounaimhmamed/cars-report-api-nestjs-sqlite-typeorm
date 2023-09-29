import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";


export class AdminGuard  implements CanActivate{

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const user = context.switchToHttp().getRequest().user;
        if(!user) {
            return false;
        }

        return user.isAdmin;
    }
}


