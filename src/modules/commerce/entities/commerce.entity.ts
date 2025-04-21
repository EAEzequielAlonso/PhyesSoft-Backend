import { Brand } from "src/modules/brand/entities/brand.entity";
import { Category } from "src/modules/category/entities/category.entity";
import { Product } from "src/modules/product/entities/product.entity";
import { Branch } from 'src/modules/branch/entities/branch.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Size } from "src/modules/size/entities/size.entity";
import { Color } from "src/modules/color/entities/color.entity";
import { SizeType } from "src/modules/size-type/entities/size-type.entity";
import { PaymentMethod } from "src/modules/payment-method/entities/payment-method.entity";
import { User } from "src/modules/user/entities/user.entity";
import { MovementType } from "src/modules/movement-type/entities/movement-type.entity";

@Entity({
  name: 'commerces',
})
export class Commerce {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'varchar', length: 50 })
  nameFantacy: string;

  @Index()
  @Column({ type: 'varchar', length: 50 })
  nameCompany: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  slogan: string;

  @Column({
    type: 'varchar',
    default:
      'https://w7.pngwing.com/pngs/440/426/png-transparent-computer-icons-logo-commerce-logo-commerce-computer-icons.png',
  })
  imgLogo: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  emailCompany: string;

  @Column({ type: 'date', nullable: true })
  InitDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @OneToOne(() => User, (user) => user.commerce)
  @JoinColumn({ name: "userId" }) // Clave foránea en la tabla Comercio
  user: User;
  @Column({type: "uuid", nullable:false})
  userId: string;

  @OneToMany (() => Branch, (branch) => branch.commerce)
  branches: Branch[];

  @OneToMany (() => PaymentMethod, (paymentMethod) => paymentMethod.commerce)
  paymentMethods: PaymentMethod[];

  @OneToMany (() => Product, (product) => product.commerce)
  products: Product[];

  @OneToMany (() => Category, (category) => category.commerce)
  categories: Category[];

  @OneToMany (() => Brand, (brand) => brand.commerce)
  brands: Brand[];

  @OneToMany (() => Size, (size) => size.commerce)
  sizes: Size[];

  @OneToMany (() => Color, (color) => color.commerce)
  colors: Color[];

  @OneToMany (() => SizeType, (size) => size.commerce)
  sizetypes: SizeType[];

  @OneToMany (() => MovementType, (movementType) => movementType.commerce)
  movementTypes: SizeType[];
}
