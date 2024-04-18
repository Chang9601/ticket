import { Logger } from '@nestjs/common';
import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { AbstractEntity } from '../entity/abstract.entity';
import { EntityNotFoundException } from '../exception/entity-not-found.exception';

export abstract class AbstractRepository<T extends AbstractEntity<T>> {
  protected abstract readonly logger: Logger;

  // protected 접근 제한자로 지정되어 있으므로 하위 레포지토리는 추상 레포지토리가 제공하지 않는 기능을 구현할 수 있다.
  constructor(protected readonly entityRepository: Repository<T>) {}

  public async create(entity: T): Promise<T> {
    return await this.entityRepository.save(entity);
  }

  public async exist(where: FindOptionsWhere<T>): Promise<boolean> {
    return await this.entityRepository.existsBy(where);
  }

  public async findOne(
    where: FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T>,
  ): Promise<T> {
    const entity = await this.entityRepository.findOne({ where, relations });

    if (!entity) {
      this.logger.warn('', where);

      throw new EntityNotFoundException();
    }

    return entity;
  }

  public async findAll(where: FindOptionsWhere<T>): Promise<T[]> {
    return await this.entityRepository.findBy(where);
  }

  public async update(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<T> {
    const result = await this.entityRepository.update(where, partialEntity);

    if (!result.affected) {
      this.logger.warn('', where);

      throw new EntityNotFoundException();
    }

    return this.findOne(where);
  }

  public async delete(where: FindOptionsWhere<T>): Promise<void> {
    const result = await this.entityRepository.delete(where);

    if (!result.affected) {
      this.logger.warn('', where);

      throw new EntityNotFoundException();
    }
  }
}
