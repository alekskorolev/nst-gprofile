import { IsEmail, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  public nickname: string;

  @IsNumber()
  public age: number;

  @IsUUID()
  @IsNotEmpty()
  public uid: string;
}

export class UpdateProfileDto extends CreateProfileDto {
  @IsUUID()
  @IsNotEmpty()
  public id: string;
}