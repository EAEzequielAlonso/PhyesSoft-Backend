// import {
//     CanActivate,
//     ExecutionContext,
//     ForbiddenException,
//     Injectable,
//   } from '@nestjs/common';
// import { CommerceRepository } from 'src/modules/commerce/commerce.repository';

//   @Injectable()
//   export class CommerceGuard implements CanActivate {
//     constructor(private readonly commerceRepository: CommerceRepository, ) {}

//     async canActivate(
//       context: ExecutionContext,
//     ): Promise<boolean> {
//       const request = context.switchToHttp().getRequest();
//       const exist: Boolean = await this.commerceRepository.exist(request.Param.id, request.user?.id);

//       if (!exist)
//         throw new ForbiddenException('El comercio no existe o Usted no esta autorizado para acceder al mismo');
//       return true;
//     }
//   }
