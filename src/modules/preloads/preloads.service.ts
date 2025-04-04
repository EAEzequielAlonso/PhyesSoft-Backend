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
import preloadCommerce from './preloadFiles/commerce.json';
import preloadSizeType from './preloadFiles/sizeType.json'

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
import { Commerce } from '../commerce/entities/commerce.entity';
import { SizeType } from '../size-type/entities/size-type.entity';

@Injectable()
export class PreloadsService {
  constructor(
    @InjectRepository(UserRole) private userRoleRepository: Repository<UserRole>,
    @InjectRepository(Sex) private sexRepository: Repository<Sex>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory) private subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(Brand) private brandRepository: Repository<Brand>, 
    @InjectRepository(Commerce) private commerceRepository: Repository<Commerce>,
    @InjectRepository(Model) private modelRepository: Repository<Model>,
    @InjectRepository(Color) private colorRepository: Repository<Color>,
    @InjectRepository(Size) private sizeRepository: Repository<Size>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(SizeType) private sizeTypeRepository: Repository<SizeType>,
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
        where: { name: category.name },
      });
      if (!catFind) {
        const commerceFind:Commerce = await this.commerceRepository.findOneBy({emailCompany:category.emailCompany})
        if (commerceFind){
          await this.categoryRepository.save({name: category.name, commerceId: commerceFind.id});
          count++;}
      }
    }
    console.log(`Se agregaron ${count} categorias de Productos`);
  }

  async preloadSubcategory(): Promise<void> {
    let count: number = 0;
    for (const subcategory of preloadSubcategory) {
      const subcatFind = await this.subcategoryRepository.findOne({
        where: { name: subcategory.name }, 
      });
      if (!subcatFind) {
        const catFind = await this.categoryRepository.findOne({
          where: { name: subcategory.category },
        });
        if (catFind) {
          await this.subcategoryRepository.save({
            name: subcategory.name,
            categoryId: catFind.id,
          });
          count++;
        }
      }
    }
    console.log(`Se agregaron ${count} Subcategorias`);
  }

  async preloadBrand(): Promise<void> {
    let count: number = 0;
    for (const brand of preloadBrand) {
      const brandFind = await this.brandRepository.findOne({
        where: { name: brand.name },
      });
      if (!brandFind) {
        const commerceFind:Commerce = await this.commerceRepository.findOneBy({emailCompany:brand.emailCompany})
        if (commerceFind){
          await this.brandRepository.save({name: brand.name, commerceId: commerceFind.id});
          count++;
        }
      }
    }
    console.log(`Se agregaron ${count} Marcas`);
  }

  async preloadColor(): Promise<void> {
    let count: number = 0;
    for (const color of preloadColor) {
      const colorFind = await this.colorRepository.findOne({
        where: { name: color.name },
      });
      if (!colorFind) {
        const commerceFind:Commerce = await this.commerceRepository.findOneBy({emailCompany:color.emailCompany})
        if (commerceFind){
          await this.colorRepository.save({name: color.name, commerceId: commerceFind.id});
          count++;
        }
      }
    }
    console.log(`Se agregaron ${count} Colores`);
  }

  async preloadSize(): Promise<void> {
    let count: number = 0;
    for (const size of preloadSize) {
      const sizeFind = await this.sizeRepository.findOne({
        where: { name: size.name }
      });
      if (!sizeFind) {
        const sizeTypeFind = await this.sizeTypeRepository.findOne({
          where: { name: size.sizetype },
        });
        if (sizeTypeFind) {
            await this.sizeRepository.save({name: size.name, sizetypeId: sizeTypeFind.id});
            count++;
        }
      }
    }
    console.log(`Se agregaron ${count} Talles`);
  }

  async preloadSizeType(): Promise<void> {
    let count: number = 0;
    for (const sizeType of preloadSizeType) {
      const sizeTypeFind = await this.sizeTypeRepository.findOne({
        where: { name: sizeType.name },
      });
      if (!sizeTypeFind) {
        const commerceFind:Commerce = await this.commerceRepository.findOneBy({emailCompany:sizeType.emailCompany})
        if (commerceFind){
          await this.sizeTypeRepository.save({name: sizeType.name, commerceId: commerceFind.id});
          count++;
        }
      }
    }
    console.log(`Se agregaron ${count} Grupos de Talles`);
  }

  async preloadModel(): Promise<void> {
    let count: number = 0;
    for (const model of preloadModel) {
      const modelFind = await this.modelRepository.findOne({
        where: { name: model.name },
      });
      if (!modelFind) {
        const brandFind = await this.brandRepository.findOne({
          where: { name: model.brand },
        });
        await this.modelRepository.save({
          name: model.name,
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
          where: { name: product.subcategory },
        });
        const modelFind = await this.modelRepository.findOne({
          where: { name: product.model },
        });
        const siseTypeFind = await this.sizeTypeRepository.findOne({
          where: { name: product.sizeType },
        });
        const commerceFind = await this.commerceRepository.findOne({
          where: { emailCompany: product.email },
        });


        const {subcategory, model, sizeType, email, ...productSave} = product;
        await this.productRepository.save({
          ...productSave,
          categoryId: subcatFind.categoryId,
          subcategoryId: subcatFind.id,
          brandId: modelFind.brandId,
          modelId: modelFind.id,
          sizeTypeId: siseTypeFind.id,
          commerceId: commerceFind.id
        });
        count++;
      }
    }
    console.log(`Se agregaron ${count} Productos`);
  }

  async preloadCommerce(): Promise<void> {
    let count: number = 0;
    for (const commerce of preloadCommerce) {
      const commerceFind = await this.commerceRepository.findOne({
        where: { emailCompany: commerce.emailCompany },
      });
      if (!commerceFind) {
        const userFind = await this.userRepository.findOne({
          where: { email: commerce.emailCompany },
        });
        if (userFind) {
          await this.commerceRepository.save({
            ...commerce,
            userId: userFind.id
          });
        }
        count++;
      }
    }
    console.log(`Se agregaron ${count} comercios de usuarios`);
  }


  async onModuleInit() {
    await this.preloadSexes();
    await this.preloadRole();
    await this.preloadUsers();
    await this.preloadCommerce();
    await this.preloadSizeType(); 
    await this.preloadSize();
    await this.preloadBrand();
    await this.preloadModel();
    await this.preloadColor();
    await this.preloadCategory();
    await this.preloadSubcategory();
    await this.preloadProduct();
  } 
}
