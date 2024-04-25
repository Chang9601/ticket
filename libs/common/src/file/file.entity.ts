import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../entity';

@Entity({ name: 'file' })
export class FileEntity extends AbstractEntity<FileEntity> {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  path: string;

  @Column({ type: 'varchar', nullable: false })
  ext: string;

  @Column({ type: 'varchar', name: 'mime_type', nullable: false })
  mimeType: string;

  @Column({ type: 'int', nullable: false })
  ticketId: number;
}
