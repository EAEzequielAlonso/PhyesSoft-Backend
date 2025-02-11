// Importacion de los preloads en formato JSON
import preloadSex from './preloadFiles/sex.json';
import preloadUserRole from './preloadFiles/roles.json';
import preloadUser from './preloadFiles/users.json';
import preloadBrand from './preloadFiles/brand.json';
import preloadModel from './preloadFiles/model.json';
import preloadCategory from './preloadFiles/category.json';
import preloadSubcategory from './preloadFiles/subcategory.json';
import preloadColor from './preloadFiles/color.json';
import preloadSize from './preloadFiles/size.json';
import preloadProduct from './preloadFiles/product.json';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from '../user/entities/role.entity';
import { Repository } from 'typeorm';
import { Sex } from '../user/entities/sex.entity';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Category } from '../category/entities/category.entity';
import { Subcategory } from '../subcategory/entities/subcategory.entity';
import { Brand } from '../brand/entities/brand.entity';
import { Model } from '../model/entities/model.entity';
import { Color } from '../color/entities/color.entity';
import { Size } from '../size/entities/size.entity';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class PreloadsService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    @InjectRepository(Sex) private sexRepository: Repository<Sex>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
    @InjectRepository(Model) private modelRepository: Repository<Model>,
    @InjectRepository(Color) private colorRepository: Repository<Color>,
    @InjectRepository(Size) private sizeRepository: Repository<Size>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async preloadRole(): Promise<void> {
    let count: number = 0;
    for (const role of preloadUserRole) {
      const roleFind = await this.userRoleRepository.findOne({
        where: { role: role.role },
      });
      if (!roleFind) {
        await this.userRoleRepository.save(role);
        count++;
      }
    }
    console.log(`Se agregaron ${count} roles de usuario`);
  }

  async preloadCategory(): Promise<void> {
    let count: number = 0;
    for (const category of preloadCategory) {
      const catFind = await this.categoryRepository.findOne({
        where: { category: category.category },
      });
      if (!catFind) {
        await this.categoryRepository.save(category);
        count++;
      }
    }
    console.log(`Se agregaron ${count} categorias de Productos`);
  }

  async preloadSubcategory(): Promise<void> {
    let count: number = 0;
    for (const subcategory of preloadSubcategory) {
      const subcatFind = await this.subcategoryRepository.findOne({
        where: { subcategory: subcategory.subcategory },
      });
      if (!subcatFind) {
        const catFind = await this.categoryRepository.findOne({
          where: { category: subcategory.category },
        });
        await this.subcategoryRepository.save({
          subcategory: subcategory.subcategory,
          categoryId: catFind.id,
        });
        count++;
      }
    }
    console.log(`Se agregaron ${count} Subcategorias`);
  }

  async preloadBrand(): Promise<void> {
    let count: number = 0;
    for (const brand of preloadBrand) {
      const brandFind = await this.brandRepository.findOne({
        where: { brand: brand.brand },
      });
      if (!brandFind) {
        await this.brandRepository.save(brand);
        count++;
      }
    }
    console.log(`Se agregaron ${count} Marcas`);
  }

  async preloadColor(): Promise<void> {
    let count: number = 0;
    for (const color of preloadColor) {
      const colorFind = await this.colorRepository.findOne({
        where: { color: color.color },
      });
      if (!colorFind) {
        await this.colorRepository.save(color);
        count++;
      }
    }
    console.log(`Se agregaron ${count} Colores`);
  }

  async preloadSize(): Promise<void> {
    let count: number = 0;
    for (const size of preloadSize) {
      const sizeFind = await this.sizeRepository.findOne({
        where: { size: size.size },
      });
      if (!sizeFind) {
        await this.sizeRepository.save(size);
        count++;
      }
    }
    console.log(`Se agregaron ${count} Talles`);
  }

  async preloadModel(): Promise<void> {
    let count: number = 0;
    for (const model of preloadModel) {
      const modelFind = await this.modelRepository.findOne({
        where: { model: model.model },
      });
      if (!modelFind) {
        const brandFind = await this.brandRepository.findOne({
          where: { brand: model.brand },
        });
        await this.modelRepository.save({
          model: model.model,
          brandId: brandFind.id,
        });
        count++;
      }
    }
    console.log(`Se agregaron ${count} Modelos de marcas`);
  }

  async preloadSexes(): Promise<void> {
    let count: number = 0;
    for (const dataSex of preloadSex) {
      const sexFind = await this.sexRepository.findOne({
        where: { sex: dataSex.sex },
      });
      if (!sexFind) {
        await this.sexRepository.save(dataSex);
        count++;
      }
    }
    console.log(`Se agregaron ${count} sexos`);
  }

  async preloadUsers(): Promise<void> {
    let count: number = 0;
    for (const user of preloadUser) {
      const userFind = await this.userRepository.findOne({
        where: { email: user.email },
      });
      if (!userFind) {
        const roleFind = await this.userRoleRepository.findOneBy({
          role: user.role,
        });
        const sexFind = await this.sexRepository.findOneBy({ sex: user.sex });
        if (sexFind && roleFind) {
          const { sex, role, ...userCreate } = user;
          const passwordHash = await bcrypt.hash(user.password, 10);
          await this.userRepository.save({
            ...userCreate,
            roleId: roleFind.id,
            sexId: sexFind.id,
            password: passwordHash,
            birthdate: new Date(user.birthdate),
            startDate: new Date(user.startDate),
          });
          count++;
        }
      }
    }
    console.log(`Se agregaron ${count} usuarios`);
  }

  async preloadProduct(): Promise<void> {
    let count: number = 0;
    for (const product of preloadProduct) {
      const productFind = await this.productRepository.findOne({
        where: { description: product.description },
      });
      if (!productFind) {
        const subcatFind = await this.subcategoryRepository.findOne({
          where: { subcategory: product.subcategory },
        });
        const modelFind = await this.modelRepository.findOne({
          where: { model: product.model },
        });
        await this.subcategoryRepository.save({
          ...product,
          subcategoryId: subcatFind.id,
          model: modelFind.id,
        });
        count++;
      }
    }
    console.log(`Se agregaron ${count} Productos`);
  }

  async onModuleInit() {
    await this.preloadColor();
    await this.preloadSize();
    await this.preloadBrand();
    await this.preloadModel();
    await this.preloadCategory();
    await this.preloadSubcategory();
    await this.preloadSexes();
    await this.preloadRole();
    await this.preloadUsers();
    await this.preloadProduct();
  }
}
