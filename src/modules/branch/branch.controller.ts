import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BranchService } from './branch.service';
import { Branch } from './entities/branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Request } from 'express';
import { AuthGuard } from '../auth/guards/Auth.guard';

@ApiTags('Branches')
@Controller('branch')
@UseGuards(AuthGuard)
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

   @Get()
    @ApiBearerAuth()
    async getBranchs(
        @Req() req: Request, 
        @Query('page') page = '1',
        @Query('limit') limit = '10',
        @Query('search') search = ''): Promise<[Branch[], number]> {
      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);
      return await this.branchService.getBranchs(
        req.user.commerce.id,
        pageNumber,
        limitNumber,
        search);
    }
  
    @Get('commerce')
    async findCommerce(@Req() req: Request): Promise<Branch[]> {
      return await this.branchService.findCommerce(req.user.commerce.id);
    }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getBranchById(@Param('id', ParseUUIDPipe) id: string): Promise<Branch> {
    return await this.branchService.getBranchById(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async createBranch(@Body() branch: CreateBranchDto, @Req() req: Request, ): Promise<Branch> {
    const commerceId = req.user.commerce.id
    return await this.branchService.createBranch({...branch, commerceId});
  }

  @Put('unsubscribe/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async unsubscribeBranch(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<string> {
    return await this.branchService.unsubscribeBranch(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async updateBranch(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateBranchDto,
  ): Promise<string> {
    return await this.branchService.updateBranch(id, user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async deleteBranch(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return await this.branchService.deleteBranch(id);
  }
}
