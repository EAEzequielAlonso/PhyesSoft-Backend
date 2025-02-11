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
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Get()
  async getBranches(): Promise<Branch[]> {
    return await this.branchService.getBranches();
  }

  // @Get("commerce/:commerceId")
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // async getBranchByCommerceId (@Param("commerceId", ParseUUIDPipe) commerceId: string): Promise<Branch[]> {
  //   return await this.branchService.getBranchByCommerceId(commerceId)
  // }

  // @Get("user")
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // async getBranchByUser (@Req() request: Request): Promise<Branch[]> {
  //   return await this.branchService.getBranchByUserId(request.user?.id)
  // }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getBranchById(@Param('id', ParseUUIDPipe) id: string): Promise<Branch> {
    return await this.branchService.getBranchById(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async createBranch(@Body() branch: CreateBranchDto): Promise<Branch> {
    return await this.branchService.createBranch(branch);
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
