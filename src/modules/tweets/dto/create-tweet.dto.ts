import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';

export class CreateTweetDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  imgUlr: string;

  @IsObject()
  @IsNotEmpty()
  user: User;
}
