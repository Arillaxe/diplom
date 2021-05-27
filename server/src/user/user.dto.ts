import { IsAlphanumeric, IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { Role } from 'src/roles/role.enum';

export class CreateUserDto {
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty()
  readonly surname: string;

  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty()
  readonly contractNumber: string;

  @IsPhoneNumber()
  readonly phone: string;

  @IsEmail()
  readonly email: string;
  
  @IsArray()
  @IsEnum(Role, { each: true })
  readonly roles: Role[];
}

export class UpdateUserDto {
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty()
  @IsOptional()
  readonly lastName?: string;

  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty()
  @IsOptional()
  readonly surname?: string;

  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty()
  @IsOptional()
  readonly contractNumber?: string;

  @IsPhoneNumber()
  @IsOptional()
  readonly phone?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;
  
  @IsArray()
  @IsEnum(Role, { each: true })
  @IsOptional()
  readonly roles?: Role[];
}

export class SignUpUserDto {
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty()
  readonly surname: string;

  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty()
  readonly contractNumber: string;

  @IsPhoneNumber()
  readonly phone: string;

  @IsEmail()
  readonly email: string;
  
  @IsArray()
  @IsEnum(Role, { each: true })
  readonly roles: Role[];

  @IsAlphanumeric()
  readonly password: string;
}
