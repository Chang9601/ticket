import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { FileService } from './file.service';
import { UploadFileDto } from './dto/upload-file.dto';

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @MessagePattern('upload')
  public async uploadFiles(
    @Payload() payload: UploadFileDto,
  ): Promise<number[]> {
    return this.fileService.upload(payload);
  }

  // @MessagePattern('download')
  // public async downloadFiles(@Payload() payload) {
  //   this.fileService.downalod();
  // }
}
