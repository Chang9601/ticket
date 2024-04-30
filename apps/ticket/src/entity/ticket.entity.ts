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

  /*
   * 원시 배열 값을 단일 문자열 열에 저장할 수 있으며 모든 값은 쉼표로 구분된다.
   * 작성하는 값에는 쉼표가 없어야 한다.
   */
  @Column('simple-array')
  fileIds: number[];
}
