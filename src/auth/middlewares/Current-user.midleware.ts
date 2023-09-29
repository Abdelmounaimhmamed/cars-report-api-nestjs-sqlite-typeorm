import { Injectable, NestMiddleware } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { NextFunction, Request, Response } from "express";
import { ExpressRequest } from "../types&interfaces/ExpressRequest.interface";
import { UserEntity } from "../auth.entity";


declare global {
    namespace Express {
        interface Request {
            user?: UserEntity
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {

    constructor(private readonly authService :AuthService){}

    async use(req: Request, res: Response, next: NextFunction) {
        const {id} = req.session || {};
        console.log(id);
        if(id ) {
            const user = await this.authService.findOne(id);
            req.user  = user;
        }
        next();
    }
}

