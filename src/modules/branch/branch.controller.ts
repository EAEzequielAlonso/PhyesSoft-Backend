import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BranchService } from './branch.service';
import { Branch } from './entities/branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@ApiTags("Branches")
@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Get()
  async getBranches (): Promise<Branch[]> {
    return await this.branchService.getBranches()
  }

  @Get("commerce/:commerceId")
  async getBranchByCommerceId (@Param("commerceId", ParseUUIDPipe) commerceId: string): Promise<Branch[]> {
    return await this.branchService.getBranchByCommerceId(commerceId)
  }

  @Get("user/:userId")
  async getBranchByUserId (@Param("userId", ParseUUIDPipe) userId: string): Promise<Branch[]> {
    return await this.branchService.getBranchByUserId(userId)
  }

  @Get(":id")
  async getBranchById (@Param("id", ParseUUIDPipe) id: string): Promise<Branch> {
    return await this.branchService.getBranchById(id)
  }

  @Post()
  async createBranch(@Body() user: CreateBranchDto): Promise<Branch> {
    return await this.branchService.createBranch(user);
  }

  @Put("unsubscribe/:id")
  async unsubscribeBranch(@Param("id", ParseUUIDPipe) id: string): Promise<string> {
    return await this.branchService.unsubscribeBranch(id);
  }

  @Put(":id")
  async updateBranch(@Param("id", ParseUUIDPipe) id: string, @Body() user: UpdateBranchDto): Promise<string> {
    return await this.branchService.updateBranch(id, user);
  }

  @Delete(":id")
  async deleteBranch(@Param("id", ParseUUIDPipe) id: string): Promise<string> {
    return await this.branchService.deleteBranch(id);
  }

}
