import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  Query,
  UseGuards,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../auth/guards/Auth.guard';
import { ProviderService } from './provider.service';
import { Provider } from './entities/provider.entity';
import { promises } from 'dns';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Controller('provider')
@UseGuards(AuthGuard)
export class ProviderController {
  constructor(private readonly service: ProviderService) {}

  @Get()
  async findAll(
    @Req() req: Request,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search = '',
  ): Promise<[Provider[], number]> {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return await this.service.findAll(
      req.user.commerce.id,
      pageNumber,
      limitNumber,
      search,
    );
  }

  @Get('commerce')
  async findCommerce(@Req() req: Request): Promise<Provider[]> {
    return await this.service.findCommerce(req.user.commerce.id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Provider> {
    return await this.service.findOne(id);
  }

  @Post()
  async create(
    @Body() body: CreateProviderDto,
    @Req() req: Request,
  ): Promise<Provider> {
    return await this.service.create({
      ...body,
      commerceId: req.user.commerce.id,
    });
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateProviderDto,
  ) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.remove(id);
  }
}
