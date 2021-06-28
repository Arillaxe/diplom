import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateRequestDto {
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty()
  readonly hostel: string;

  @IsInt()
  @IsNotEmpty()
  readonly floor: number;

  @IsInt()
  @IsNotEmpty()
  readonly room: number;

  @IsInt()
  @IsNotEmpty()
  readonly place: number;

  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  readonly fullName: string;
}

export class UpdateRequestStatusDto {
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  readonly status: string;
}
