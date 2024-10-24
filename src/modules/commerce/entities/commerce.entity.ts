// import { Branch } from "src/modules/branch/entities/branch.entity";
// import { Brand } from "src/modules/brand/entities/brand.entity";
// import { Category } from "src/modules/category/entities/category.entity";
// import { Color } from "src/modules/color/entities/color.entity";
// import { Model } from "src/modules/model/entities/model.entity";
// import { Product } from "src/modules/product/entities/product.entity";
// import { Size } from "src/modules/size/entities/size.entity";
// import { Subcategory } from "src/modules/subcategory/entities/subcategory.entity";
// import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
  
    @Column({ type: 'varchar',
        default: 'https://w7.pngwing.com/pngs/440/426/png-transparent-computer-icons-logo-commerce-logo-commerce-computer-icons.png',})
    imgLogo: string;
  
    @Column({ type: 'varchar',
      default: 'https://img.freepik.com/vector-premium/fondo-banner-azul-naranja-plantilla-fondo-patron-banner-diseno-grafico-abstracto-vector_181182-18805.jpg',})
    imgBanner: string;
  
    @Column({ type: 'varchar', length: 50, unique: true })
    emailCompany: string;
  
    @Column({ type: 'date', nullable: true })
    InitDate: Date;
  
    @Column({ type: 'date' })
    startDate: Date;
  
    @Column({ type: 'date', nullable: true })
    endDate: Date;

    // @ManyToOne(() => User, (user) => user.commerces)
    // @JoinColumn({name: "userId"})
    // userProp: User;
    // @Index()
    // @Column("uuid")
    // userPropId: string;

    // @OneToMany (() => Branch, (branch) => branch.commerce)
    // branches: Branch[];

    // @OneToMany (() => User, (user) => user.commerce)
    // userClients: User[];

    // @OneToMany (() => Product, (product) => product.commerce)
    // products: Product[];

    // @OneToMany (() => Category, (category) => category.commerce)
    // categories: Category[];

    // @OneToMany (() => Subcategory, (subcategory) => subcategory.commerce)
    // subcategories: Subcategory[];

    // @OneToMany (() => Brand, (brand) => brand.commerce)
    // brands: Brand[];

    // @OneToMany (() => Model, (model) => model.commerce)
    // models: Model[];

    // @OneToMany (() => Size, (size) => size.commerce)
    // sizes: Size[];

    // @OneToMany (() => Color, (color) => color.commerce)
    // colors: Color[];
  }