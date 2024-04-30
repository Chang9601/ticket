import { Injectable } from '@nestjs/common';

import { FileExt } from '@app/common/util/file-ext';

import { FileRepository } from './file.repository';
import { FileEntity } from './entity/file.entity';
import { UploadFileDto } from './dto/upload-file.dto';
import { FileDto } from './dto/file.dto';
import { FileMapper } from './mapper/file-mapper';

@Injectable()
export class FileService {
  constructor(private readonly fileRepository: FileRepository) {}

  public async upload({ files }: UploadFileDto): Promise<number[]> {
    const fileDtos: FileDto[] = [];

    for (const file of files) {
      const { originalname: name, path, size, mimetype } = file;
      const ext = await FileExt.getFileExt(name);

      const fileEntity = new FileEntity({
        name,
        path,
        size,
        ext,
        mimetype,
      });

      await this.fileRepository.create(fileEntity);
      fileDtos.push(FileMapper.toDto(fileEntity));
    }

    return fileDtos.map((fileDto) => fileDto.id);
  }

  public async downalod(): Promise<void> {
    return;
  }
}
