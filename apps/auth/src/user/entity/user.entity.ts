import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '@app/common';

@Entity({ name: 'user' })
export class UserEntity extends AbstractEntity<UserEntity> {
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;
}
