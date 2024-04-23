import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '@app/common';

@Entity({ name: 'ticket' })
export class TicketEntity extends AbstractEntity<TicketEntity> {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'decimal', precision: 65, scale: 3, nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  userId: number;
}
