import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SaleProducts } from "./entities/saleProducts.entity";

@Injectable() 
export class SaleProductsRepository {

    constructor (@InjectRepository(SaleProducts) private saleProductsRepository: Repository<SaleProducts>) {}

    async getSaleProducts (): Promise<SaleProducts[]> {
        return await this.saleProductsRepository.find({relations: {sale:true, product:true}});
    }

    async getSaleProductsBySale (saleId:string): Promise<SaleProducts[]> {
        return await this.saleProductsRepository.find({where: {saleId}, relations: {product:true}})
    }

    async createSaleProducts (saleProducts:Partial<SaleProducts>): Promise<SaleProducts> {
        return await this.saleProductsRepository.save(saleProducts);
    }

}