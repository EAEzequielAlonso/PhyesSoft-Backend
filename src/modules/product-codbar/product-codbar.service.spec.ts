import { Test, TestingModule } from '@nestjs/testing';
import { ProductCodbarService } from './product-codbar.service';

describe('ProductCodbarService', () => {
  let service: ProductCodbarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductCodbarService],
    }).compile();

    service = module.get<ProductCodbarService>(ProductCodbarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
