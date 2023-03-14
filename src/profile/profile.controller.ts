import { Body, Controller, Get, Inject, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { Observer, timeout } from 'rxjs';
import { JwtRemoteGuard } from 'src/jwt/jwt.guard';
import { CreateProfileDto } from './profile.dto';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';


@Controller('profile')
export class ProfileController {
  @Inject(ProfileService)
  private readonly service: ProfileService;

  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

  @Get('test')
  @UseGuards(JwtRemoteGuard)
  public async test(@Request() req) {
    return req.user
  }
}