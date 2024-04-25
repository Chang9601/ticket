import { Injectable } from '@nestjs/common';

import { FileRepository } from './file.repository';

@Injectable()
export class FileService {
  constructor(private readonly fileRepository: FileRepository) {}

  public async create();
}
