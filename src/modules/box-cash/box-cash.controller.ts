import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoxCashService } from './box-cash.service';
import { CreateBoxCashDto } from './dto/create-box-cash.dto';
import { UpdateBoxCashDto } from './dto/update-box-cash.dto';

@Controller('box-cash')
export class BoxCashController {
  constructor(private readonly boxCashService: BoxCashService) {}

  @Post()
  create(@Body() createBoxCashDto: CreateBoxCashDto) {
    return this.boxCashService.create(createBoxCashDto);
  }

  @Get()
  findAll() {
    return this.boxCashService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boxCashService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoxCashDto: UpdateBoxCashDto) {
    return this.boxCashService.update(+id, updateBoxCashDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boxCashService.remove(+id);
  }
}
