import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  MANAGER = 'MANAGER',
  STORE_KEEPER = 'STORE_KEEPER',
}

registerEnumType(Role, { name: 'Role' });
