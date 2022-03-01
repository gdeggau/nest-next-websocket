import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateStreamerDto } from './dto/create-streamer.dto';
import { UpdateStreamerDto } from './dto/update-streamer.dto';
import { Streamer } from './entities/streamer.entity';
import { StreamerService } from './streamer.service';

@Controller('streamer')
export class StreamerController {
  constructor(private readonly streamerService: StreamerService) {}

  @Get()
  index(): Promise<Streamer[]> {
    return this.streamerService.findAll();
  }

  @Post()
  create(@Body() data: CreateStreamerDto): Promise<Streamer> {
    return this.streamerService.create(data);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() data: UpdateStreamerDto,
  ): Promise<Streamer> {
    return this.streamerService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<any> {
    return this.streamerService.delete(id);
  }
}
