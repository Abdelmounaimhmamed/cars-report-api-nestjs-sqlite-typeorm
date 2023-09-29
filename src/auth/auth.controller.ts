import { Body, Controller, Get, Param, Post , Session, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInUserDto } from "./authDto/SignInUser.dto";
import { UseInterceptors  } from "@nestjs/common";
import { CustomInterceptor, Serialize } from "src/Interceptors/Custom.interceptor";
import { UserResponseDto } from "./authDto/userResponse.dto";
import { CurrentUser } from "src/decorators/CurrentUser.decorator";
import { CurrentUserInterceptor } from "./interceptors/Current-user.interceptor";
import { AuthGuard } from "src/guards/Auth.guard";


@Serialize(UserResponseDto)
@Controller("/auth")
export class AuthController {
    constructor(private readonly authService : AuthService){}
    
    // @UseInterceptors(new CustomInterceptor(UserResponseDto))
    @Post("signin")
    async SignIn(@Body('user') userData : SignInUserDto,  @Session() session: any ): Promise<any> {
        const user = await this.authService.Signin(userData);
        session.user = user;
        return user;
    }

    @Post('signup')
    async SignUp(@Body('user') userData : SignInUserDto , @Session() session : any): Promise<any> {
        const user = await this.authService.SignUp(userData);
        session.user = user;
        return user;
    }

    @UseGuards(AuthGuard)
    @Get("/me")
    @UseInterceptors(CurrentUserInterceptor)
    async getMe(@CurrentUser() user : any){
        return  user ;
    }
 

    @Get("/signout")
    async signOut(@Session() session: any){
        session.user = null;
        console.log("signed out")
        return ;
    }

}