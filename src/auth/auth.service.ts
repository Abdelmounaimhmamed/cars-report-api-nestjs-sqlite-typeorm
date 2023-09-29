import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from './auth.entity';
import { Repository } from "typeorm";
import { SignInUserDto } from "./authDto/SignInUser.dto";
import {hash , compare} from "bcrypt";

@Injectable()
export class AuthService{

    constructor(@InjectRepository(UserEntity) private readonly authRepository : Repository<UserEntity>){}


    async Signin(userData : SignInUserDto) : Promise<UserEntity> {
        const userifExist = await this.authRepository.findOne({
            where : { email: userData.email}
        });
        if(!userData){
            throw new HttpException("wrong crendentials !" , HttpStatus.UNAUTHORIZED);
        }
        const isPassword = await compare(userData.password , userifExist.password);
        if(!isPassword){
            throw new HttpException("wrong credentials !" , HttpStatus.UNAUTHORIZED);
        }
        return userifExist;
    }

    async SignUp(userData : SignInUserDto) : Promise<UserEntity> {
        const user = await this.authRepository.findOne({
            where: {email : userData.email}
        });
        if(user){
            throw new HttpException("this user exist with email , try to signin ", HttpStatus.BAD_REQUEST);
        }
        const salt : number = 10;
        const hashpassword = await hash(userData.password , salt);
        const newUser = this.authRepository.create({email : userData.email , password :hashpassword});
        return await this.authRepository.save(newUser);
    }

    async  findOne(id: number) : Promise<UserEntity>{
        const user = await this.authRepository.findOne({where : {id}});
        console.log(user);
        if(!user){
            throw new HttpException("not found ! ", HttpStatus.NOT_FOUND);
        }
        return user;
    }

}
