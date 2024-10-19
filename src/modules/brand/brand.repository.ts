import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Brand } from "./entities/brand.entity";

@Injectable()
export class BrandRepository {
    constructor (@InjectRepository(Brand) private brandRepository: Repository<Brand>) {}

    async getBrands () {
        return this.brandRepository.find();
    }

    async getBrandsByCommerce () {
        return this.brandRepository.find();
    }


}