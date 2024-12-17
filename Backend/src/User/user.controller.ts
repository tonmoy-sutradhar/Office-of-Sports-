import { Body, Controller, Get, Query, Patch, Post, Req, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { userAuthGuard } from './auth/userAuth.guard';
import { changePassDTO } from './studentDTO/studentdto.dto';
import { JwtService } from '@nestjs/jwt';
import { SearchSlotDto } from './studentDTO/studentdto.dto';


@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService,
                private readonly jwtService:JwtService
    ){}

    @Get('profile')
   @UseGuards(userAuthGuard)
    async profileInfo(@Req()res):Promise<any>{
        const token = res.cookies['access_token']; // Or extract it from the Authorization header
        const decodedPayload = await this.jwtService.verifyAsync(token);
        return await this.userService.userProfile(decodedPayload.university_id);
    }

    @Patch('changePass')
    @UseGuards(userAuthGuard)
    async chngPass (@Body()data:changePassDTO,@Req()res){
        const token = res.cookies['access_token'];
        const decodedPayload = await this.jwtService.verifyAsync(token);
        return await this.userService.changePass(data,decodedPayload.userId);
    }

    @Post('sports/outdoor')
    @UseGuards(userAuthGuard)
     async getSports(){
        return await this.userService.getOutdooSports();
    }

    @Post('sports/indoor')
    @UseGuards(userAuthGuard)
    async getSportsIndo(){
        return await this.userService.getIndoor();
    }

    @Post('sports/bookings')
    @UseGuards(userAuthGuard)
    async getBook(@Req()res){
        const token = res.cookies['access_token'];
        const decodedPayload = await this.jwtService.verifyAsync(token);
        return await this.userService.getBooking(decodedPayload.userId);  
    }

    @Post('search-by-time')
    @UseGuards(userAuthGuard)
    async searchSlot(@Query() query: SearchSlotDto) {
      return this.userService.searchSlotByTime(query.time);
    }


}
