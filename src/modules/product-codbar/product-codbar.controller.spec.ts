import { Test, TestingModule } from '@nestjs/testing';
import { ProductCodbarController } from './product-codbar.controller';
import { ProductCodbarService } from './product-codbar.service';

describe('ProductCodbarController', () => {
  let controller: ProductCodbarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductCodbarController],
      providers: [ProductCodbarService],
    }).compile();

    controller = module.get<ProductCodbarController>(ProductCodbarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
