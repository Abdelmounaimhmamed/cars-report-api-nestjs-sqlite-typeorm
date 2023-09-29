import { Request } from "express";
import { UserEntity } from "../auth.entity";



export interface ExpressRequest extends Request {

    user?: UserEntity;

}