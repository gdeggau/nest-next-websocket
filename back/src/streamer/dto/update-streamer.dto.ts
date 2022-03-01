import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';
import { CreateStreamerDto } from './create-streamer.dto';

export class UpdateStreamerDto extends PartialType(CreateStreamerDto) {
  id: number;

  @IsString()
  key: string;

  @IsString()
  name: string;

  @IsBoolean()
  @Transform(({ value }) => {
    return [true, 'enabled', 'true', 1].indexOf(value) > -1;
  })
  status: boolean;
}
