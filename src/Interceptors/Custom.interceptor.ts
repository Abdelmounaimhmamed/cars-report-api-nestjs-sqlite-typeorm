

import {NestInterceptor , ExecutionContext , CallHandler, UseInterceptors} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {plainToClass} from "class-transformer"
export const Serialize = (dto : any) => {
    return UseInterceptors(new CustomInterceptor(dto ))
}

export class CustomInterceptor implements NestInterceptor {

    constructor(private readonly dto :any){}
    
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data :any) => {
                return plainToClass(this.dto , data , {
                    excludeExtraneousValues: true
                });
            })
        )
    }
}