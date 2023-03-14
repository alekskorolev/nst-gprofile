import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  public nickname: string;

  @IsNumber()
  @IsNotEmpty()
  public age: string;
}
