import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity<T> {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  /*
   * TypeORM에서 엔티티를 데이터베이스에 저장하려면 엔티티 클래스의 새 인스턴스를 생성해야 한다.
   * 엔티티의 속성을 사용하여 새 엔티티를 만들고자 할 때 사용할 수 있는 공통 생성자이다.
   * 부분 엔티티를 Partial 타입으로 받고 생성자에서는 Object.assign() 메서드를 호출하여 this와 엔티티를 참조한다.
   * 생성자에 제공된 부분 엔티티의 모든 속성을 추상 엔티티에 할당하여 생성자에 전달된 모든 속성이 클래스의 새로운 인스턴스로 복사된다.
   */
  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
