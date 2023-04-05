import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto, UpdateProfileDto } from './profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
  @InjectRepository(Profile)
  private readonly repository: Repository<Profile>;

  public async createProfile(data: CreateProfileDto): Promise<Profile> {
    const profile = new Profile();
    profile.uid = data.uid;
    profile.username = data.nickname;
    profile.age = data.age;
    profile.avatar = data.avatar
    return this.repository.save(profile);
  }

  public async getProfiles(uid: string): Promise<Profile[]> {
    return this.repository.findBy({ uid, isBanned: false })
  }

  public async updateProfile(uid: string, data: UpdateProfileDto): Promise<Profile> {
    const profile = await this.repository.findOneBy({ uid, id: data.id, isBanned: false })
    profile.age = data.age
    profile.username = data.nickname
    return this.repository.save(profile)
  }

  public async getProfile(uid: string, id: string): Promise<Profile> {
    return this.repository.findOneBy({ id, uid, isBanned: false });
  }
}