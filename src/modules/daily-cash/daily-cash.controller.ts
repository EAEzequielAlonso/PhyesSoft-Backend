import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DailyCashService } from './daily-cash.service';
import { CreateDailyCashDto } from './dto/create-daily-cash.dto';
import { UpdateDailyCashDto } from './dto/update-daily-cash.dto';

@Controller('cashday')
export class DailyCashController {
  constructor(private readonly dailyCashService: DailyCashService) {}

  @Post()
  create(@Body() createDailyCashDto: CreateDailyCashDto) {
    return this.dailyCashService.create(createDailyCashDto);
  }

  @Get()
  findAll() {
    return this.dailyCashService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dailyCashService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDailyCashDto: UpdateDailyCashDto) {
    return this.dailyCashService.update(+id, updateDailyCashDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailyCashService.remove(+id);
  }
}
