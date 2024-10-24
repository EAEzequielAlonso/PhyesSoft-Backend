// import {
//     CanActivate,
//     ExecutionContext,
//     ForbiddenException,
//     Injectable,
//   } from '@nestjs/common';
// import { BranchRepository } from 'src/modules/branch/branch.repository';
  
//   @Injectable()
//   export class BranchGuard implements CanActivate {
//     constructor(private readonly branchRepository: BranchRepository) {}
  
//     async canActivate(
//       context: ExecutionContext,
//     ): Promise<boolean> {
//       const request = context.switchToHttp().getRequest();
//       const existBranch: Boolean = await this.branchRepository.exist(request.Param.id, request.user?.id);
      
//       if (!existBranch)
//         throw new ForbiddenException('La Sucursal no existe o usted no esta autorizado para acceder a la misma');
//       return true;
//     }
//   }
  