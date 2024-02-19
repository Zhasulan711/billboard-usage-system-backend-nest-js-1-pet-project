import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
} from "class-validator";
import { Transform } from "class-transformer";

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  roleId: number;
}
