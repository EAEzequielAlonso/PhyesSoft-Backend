import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class CategoryRepository {

    constructor (@InjectRepository(Category) private categoryRepository: Repository<Category> ) {}

    async getCategories (): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async getCategoryById (id:string): Promise<Category> {
        return this.categoryRepository.findOne({where: {id}, relations: {subcategories:true}});
    }

    async createCategory (category: Partial<Category>): Promise<Category> {
        return await this.categoryRepository.save(category);
    }

    async updateCategory (id:string, category: Partial<Category>): Promise<UpdateResult> {
        return await this.categoryRepository.update(id, category);
    }

    async deleteCategory (id:string): Promise<DeleteResult> {
        try {
            return await this.categoryRepository.delete(id);
        } catch (e) {
            throw new ConflictException ("Actualmente la categoria esta siendo usada. No se puede eliminar ya que dejaría información incompleta. Puede probar modificando la categoria si lo cree necesario");
        }
    }   

}