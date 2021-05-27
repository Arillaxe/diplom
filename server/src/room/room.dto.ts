import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateRoomDto {
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

  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  readonly userId?: number;
}

export class UpdateRoomDto {
  @IsInt()
  @IsNotEmpty()
  readonly id: number;

  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty()
  @IsOptional()
  readonly hostel?: string;

  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  readonly floor?: number;

  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  readonly room?: number;

  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  readonly place?: number;

  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  readonly userId?: number;
}
