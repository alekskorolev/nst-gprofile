import { Body, Controller, Get, Inject, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { Observer, timeout } from 'rxjs';
import { JwtRemoteGuard } from 'src/jwt/jwt.guard';
import { CreateProfileDto, UpdateProfileDto } from './profile.dto';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';


@Controller('profile')
export class ProfileController {
  @Inject(ProfileService)
  private readonly service: ProfileService;

  @Get('')
  @UseGuards(JwtRemoteGuard)
  public async getProfiles(@Request() req) {
    const { sub } = req.user;
    return this.service.getProfiles(sub)
  }

  @Post('')
  @UseGuards(JwtRemoteGuard)
  public async createProfiles(@Request() req, @Body() body: CreateProfileDto) {
    const { sub } = req.user;
    return this.service.createProfile(Object.assign({}, { uid: sub }, body))
  }

  @Patch('')
  @UseGuards(JwtRemoteGuard)
  public async updateProfiles(@Request() req, @Body() body: UpdateProfileDto) {
    const { sub } = req.user
    return this.service.updateProfile(sub, body)
  }

  @Get(':id')
  @UseGuards(JwtRemoteGuard)
  public async getProfile(@Request() req, @Param('id') id: string) {
    const { sub } = req.user
    return this.service.getProfile(sub, id)
  }
}