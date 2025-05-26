// Importacion de los preloads en formato JSON
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
import preloadSizeType from './preloadFiles/sizeType.json';
import preloadFiscalData from './preloadFiles/fiscalData.json';
import preloadBranch from './preloadFiles/branch.json';
import preloadSalePoint from './preloadFiles/salePoint.json';
import preloadPayment from './preloadFiles/methodPayment.json';
import preloadMovementType from './preloadFiles/movementType.json';
import preloadBoxCash from './preloadFiles/boxCash.json';
import preloadTaxType from "./preloadFiles/tax-type.json"
import preloadIva from "./preloadFiles/iva.json"
import preloadVariant from "./preloadFiles/variant.json"
import preloadValueVariant from "./preloadFiles/valueVariant.json"
import preloadProductType from "./preloadFiles/productType.json"
import preloadProvider from "./preloadFiles/provider.json"

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from '../user/entities/role.entity';
import { Repository } from 'typeorm';
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
import { FiscalData } from '../fiscal-data/entities/fiscal-data.entity';
import {
  ConditionIVA,
  EmissionType,
  TicketType,
} from '../fiscal-data/Enums/enumsFiscal';
import { Branch } from '../branch/entities/branch.entity';
import { SalePoint } from '../sale-point/entities/sales-point.entity';
import { PaymentMethod } from '../payment-method/entities/payment-method.entity';
import { MovementType } from '../movement-type/entities/movement-type.entity';
import { BoxCash } from '../box-cash/entities/box-cash.entity';
import { TaxType } from '../tax/entities/tax-type.entity';
import { Iva } from '../iva/entities/iva.entity';
import { Variant } from '../variant/entities/variant.entity';
import { ValueVariant } from '../value-variant/entities/value-variant.entity';
import { ProductType } from '../product/entities/product-type.entity';
import { Provider } from '../provider/entities/provider.entity';

@Injectable()
export class PreloadsService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
    @InjectRepository(Commerce)
    private commerceRepository: Repository<Commerce>,
    @InjectRepository(Model) private modelRepository: Repository<Model>,
    @InjectRepository(Color) private colorRepository: Repository<Color>,
    @InjectRepository(Size) private sizeRepository: Repository<Size>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(SizeType)
    private sizeTypeRepository: Repository<SizeType>,
    @InjectRepository(FiscalData)
    private fiscalDataRepository: Repository<FiscalData>,
    @InjectRepository(Branch) private branchRepository: Repository<Branch>,
    @InjectRepository(SalePoint)
    private salePointRepository: Repository<SalePoint>,
    @InjectRepository(PaymentMethod)
    private paymentRepository: Repository<PaymentMethod>,
    @InjectRepository(MovementType)
    private movementTypeRepository: Repository<MovementType>,
    @InjectRepository(BoxCash) 
    private boxCashRepository: Repository<BoxCash>,
    @InjectRepository(TaxType) 
    private taxTypeRepository: Repository<TaxType>,
    @InjectRepository(Iva) 
    private ivaRepository: Repository<Iva>,
    @InjectRepository(Variant) 
    private variantRepository: Repository<Variant>,
    @InjectRepository(ValueVariant) 
    private valueVariantRepository: Repository<ValueVariant>,
    @InjectRepository(ProductType) 
    private productTypeRepository: Repository<ProductType>,
    @InjectRepository(Provider) 
    private providerRepository: Repository<Provider>,
    
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
        const commerceFind: Commerce = await this.commerceRepository.findOneBy({
          emailCompany: category.emailCompany,
        });
        if (commerceFind) {
          await this.categoryRepository.save({
            name: category.name,
            commerceId: commerceFind.id,
          });
          count++;
        }
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
        const commerceFind: Commerce = await this.commerceRepository.findOneBy({
          emailCompany: brand.emailCompany,
        });
        if (commerceFind) {
          await this.brandRepository.save({
            name: brand.name,
            commerceId: commerceFind.id,
          });
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
        const commerceFind: Commerce = await this.commerceRepository.findOneBy({
          emailCompany: color.emailCompany,
        });
        if (commerceFind) {
          await this.colorRepository.save({
            name: color.name,
            commerceId: commerceFind.id,
          });
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
        where: { name: size.name },
      });
      if (!sizeFind) {
        const sizeTypeFind = await this.sizeTypeRepository.findOne({
          where: { name: size.sizetype },
        });
        if (sizeTypeFind) {
          await this.sizeRepository.save({
            name: size.name,
            sizetypeId: sizeTypeFind.id,
          });
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
        const commerceFind: Commerce = await this.commerceRepository.findOneBy({
          emailCompany: sizeType.emailCompany,
        });
        if (commerceFind) {
          await this.sizeTypeRepository.save({
            name: sizeType.name,
            commerceId: commerceFind.id,
          });
          count++;
        }
      }
    }
    console.log(`Se agregaron ${count} Grupos de Talles`);
  }

  async preloadVariant(): Promise<void> {
    let count: number = 0;
    for (const variant of preloadVariant) {
      const variantFind = await this.variantRepository.findOne({
        where: { name: variant.name },
      });
      if (!variantFind) {
        const commerceFind: Commerce = await this.commerceRepository.findOneBy({
          emailCompany: variant.emailCompany,
        });
        if (commerceFind) {
          await this.variantRepository.save({
            name: variant.name,
            commerceId: commerceFind.id,
          });
          count++;
        }
      }
    }
    console.log(`Se agregaron ${count} Variantes de Productos`);
  }

  async preloadValueVariant(): Promise<void> {
    let count: number = 0;
    for (const value of preloadValueVariant) {
      const valueFind = await this.valueVariantRepository.findOne({
        where: { name: value.name },
      });
      if (!valueFind) {
        const variantFind = await this.variantRepository.findOne({
          where: { name: value.variant },
        });
        if (variantFind) {
          await this.valueVariantRepository.save({
            name: value.name,
            variantId: variantFind.id,
          });
          count++;
        }
      }
    }
    console.log(`Se agregaron ${count} Valores de Variantes`);
  }

  async preloadFiscalData(): Promise<void> {
    let count: number = 0;
    for (const fiscalData of preloadFiscalData) {
      const find = await this.fiscalDataRepository.findOne({
        where: { name: fiscalData.name },
      });
      if (!find) {
        const commerceFind: Commerce = await this.commerceRepository.findOneBy({
          emailCompany: fiscalData.emailCompany,
        });
        if (commerceFind) {
          const { emailCompany, ...save } = fiscalData;
          await this.fiscalDataRepository.save({
            ...save,
            conditionIva: save.conditionIva as ConditionIVA,
            ticketType: save.ticketType as TicketType,
            commerceId: commerceFind.id,
          });
          count++;
        }
      }
    }
    console.log(`Se agregaron ${count} Datos Fiscales`);
  }

  async preloadPayment(): Promise<void> {
    let count: number = 0;
    for (const payment of preloadPayment) {
      const find = await this.paymentRepository.findOne({
        where: { name: payment.name },
      });
      if (!find) {
        const commerceFind: Commerce = await this.commerceRepository.findOneBy({
          emailCompany: payment.email,
        });
        if (commerceFind) {
          const { email, ...save } = payment;
          await this.paymentRepository.save({
            ...save,
            commerceId: commerceFind.id,
          });
          count++;
        }
      }
    }
    console.log(`Se agregaron ${count} Metodos de Pago`);
  }

  async preloadMovementType(): Promise<void> {
    let count: number = 0;
    for (const mov of preloadMovementType) {
      const find = await this.movementTypeRepository.findOne({
        where: { name: mov.name },
      });
      if (!find) {
        const commerceFind: Commerce = await this.commerceRepository.findOneBy({
          emailCompany: mov.email,
        });
        if (commerceFind) {
          const { email, ...save } = mov;
          await this.movementTypeRepository.save({
            ...save,
            commerceId: commerceFind.id,
          });
          count++;
        }
      }
    }
    console.log(`Se agregaron ${count} Tipos de Movimientos`);
  }

  async preloadSalePoint(): Promise<void> {
    let count: number = 0;
    for (const salePoint of preloadSalePoint) {
      const find = await this.salePointRepository.findOne({
        where: { name: salePoint.name },
      });
      if (!find) {
        const fiscalFind: FiscalData =
          await this.fiscalDataRepository.findOneBy({ name: salePoint.fiscal });
        if (fiscalFind) {
          const { fiscal, ...save } = salePoint;
          const res = await this.salePointRepository.save({
            ...save,
            emissionType: save.emissionType as EmissionType,
            fiscalDataId: fiscalFind.id,
          });
          count++;
        }
      }
    }
    console.log(`Se agregaron ${count} Puntos de Venta`);
  }

  async preloadBoxCash(): Promise<void> {
    let count: number = 0;
    for (const box of preloadBoxCash) {
      const find = await this.boxCashRepository.findOne({
        where: { name: box.name },
      });
      if (!find) {
        const branchFind: Branch = await this.branchRepository.findOneBy({
          name: box.branch,
        });
        const pointFind: SalePoint = await this.salePointRepository.findOneBy({
          name: box.salePoint,
        });

        if (branchFind && pointFind) {
          const { branch, salePoint, ...save } = box;
          await this.boxCashRepository.save({
            ...save,
            branchId: branchFind.id,
            salePointId: pointFind.id,
          });
          count++;
        }
      }
    }
    console.log(`Se agregaron ${count} Cajas `);
  }

  async preloadBranch(): Promise<void> {
    let count: number = 0;
    for (const branch of preloadBranch) {
      const find = await this.branchRepository.findOne({
        where: { name: branch.name },
      });
      if (!find) {
        const commerceFind: Commerce = await this.commerceRepository.findOneBy({
          emailCompany: branch.emailCompany,
        });
        const fiscalFind: FiscalData =
          await this.fiscalDataRepository.findOneBy({
            name: branch.nameFiscal,
          });

        if (commerceFind && fiscalFind) {
          const { emailCompany, nameFiscal, ...save } = branch;
          await this.branchRepository.save({
            ...save,
            commerceId: commerceFind.id,
            fiscalDataId: fiscalFind.id,
          });
          count++;
        }
      }
    }
    console.log(`Se agregaron ${count} Branch`);
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
        if (roleFind) {
          const { role, ...userCreate } = user;
          const passwordHash = await bcrypt.hash(user.password, 10);
          await this.userRepository.save({
            ...userCreate,
            roleId: roleFind.id,
            password: passwordHash,
            birthdate: new Date(user.birthdate),
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

        const { subcategory, model, sizeType, email, ...productSave } = product;
        await this.productRepository.save({
          ...productSave,
          categoryId: subcatFind.categoryId,
          subcategoryId: subcatFind.id,
          brandId: modelFind.brandId,
          modelId: modelFind.id,
          sizeTypeId: siseTypeFind.id,
          commerceId: commerceFind.id,
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
            userId: userFind.id,
          });
        }
        count++;
      }
    }
    console.log(`Se agregaron ${count} comercios de usuarios`);
  }

  async preloadTaxType(): Promise<void> {
    let count: number = 0;
    for (const tax of preloadTaxType) {
      const taxFind = await this.taxTypeRepository.findOne({
        where: { name: tax.name },
      });
      if (!taxFind) {
        await this.taxTypeRepository.save(tax);
        count++;
      }
    }
    console.log(`Se agregaron ${count} tipos de impuestos`);
  }

  async preloadProductType(): Promise<void> {
    let count: number = 0;
    for (const type of preloadProductType) {
      const typeFind = await this.productTypeRepository.findOne({
        where: { name: type.name },
      });
      if (!typeFind) {
        await this.productTypeRepository.save(type);
        count++;
      }
    }
    console.log(`Se agregaron ${count} tipos de productos`);
  }

  async preloadIva(): Promise<void> {
    let count: number = 0;
    for (const iva of preloadIva) {
      const ivaFind = await this.ivaRepository.findOne({
        where: { name: iva.name },
      });
      if (!ivaFind) {
        await this.ivaRepository.save(iva);
        count++;
      }
    }
    console.log(`Se agregaron ${count} iva`);
  }

    async preloadProvider(): Promise<void> {
    let count: number = 0;
    for (const provider of preloadProvider) {
      const providerFind = await this.providerRepository.findOne({
        where: { name: provider.name },
      });
      if (!providerFind) {
        const commerceFind: Commerce = await this.commerceRepository.findOneBy({
          emailCompany: provider.emailCompany,
        });
        if (commerceFind) {
          await this.providerRepository.save({
            name: provider.name,
            commerceId: commerceFind.id,
          });
          count++;
        }
      }
    }
    console.log(`Se agregaron ${count} Proveedores de Productos`);
  }

  async onModuleInit() {
    await this.preloadRole();
    await this.preloadUsers();
    await this.preloadCommerce();
    await this.preloadFiscalData();
    await this.preloadBranch();
    await this.preloadPayment();
    await this.preloadMovementType();
    await this.preloadSalePoint();
    await this.preloadBoxCash();
    await this.preloadSizeType();
    await this.preloadSize();
    await this.preloadBrand();
    await this.preloadModel();
    await this.preloadColor();
    await this.preloadCategory();
    await this.preloadSubcategory();
    await this.preloadProduct();
    await this.preloadTaxType();
    await this.preloadIva();
    await this.preloadVariant();
    await this.preloadValueVariant();
    await this.preloadProductType();
    await this.preloadProvider();
  }
}
