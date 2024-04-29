import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '@app/common';

@Entity({ name: 'file' })
export class FileEntity extends AbstractEntity<FileEntity> {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  path: string;

  @Column({ type: 'int', nullable: false })
  size: number;

  @Column({ type: 'varchar', nullable: false })
  ext: string;

  @Column({ type: 'varchar', nullable: false })
  mimetype: string;
}
