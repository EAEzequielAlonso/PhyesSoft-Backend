import { Controller} from '@nestjs/common';
import { PreloadsService } from './preloads.service';

@Controller('preloads')
export class PreloadsController {
  constructor(private readonly preloadsService: PreloadsService) {}

}
