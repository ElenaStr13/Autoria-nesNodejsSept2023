import { IsIn, ValidationOptions } from 'class-validator';

import { ERole } from '../enum/role.enum';

export function IsAllowedRole(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) =>
    IsIn([ERole.BUYER, ERole.SELLER, ERole.DEALER], validationOptions)(
      object,
      propertyName,
    );
}

export function IsAllowedRoleAdmin(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) =>
    IsIn([ERole.MANAGER, ERole.ADMIN, ERole.DEALER], validationOptions)(
      object,
      propertyName,
    );
}