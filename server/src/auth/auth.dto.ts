import { IsAlphanumeric, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class SignInUserDto {
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty()
  readonly login: string;

  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty()
  readonly fullName: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  readonly password: string;
}
