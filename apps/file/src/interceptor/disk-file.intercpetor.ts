import { Injectable, NestInterceptor, Type, mixin } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { Observable } from 'rxjs';

import { ServerConfig } from '../config/server-config';

export type DiskFilesOptions = {
  fieldName: string;
  maxCount?: number;
  dirPath?: string;
};

export function DiskFilesInterceptor(
  options: DiskFilesOptions,
): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    diskFilesInterceptor: NestInterceptor;

    constructor() {
      const storage = ServerConfig.UPLOAD_PATH;
      const destination = `${storage}${options.dirPath}`;

      const multerOptions: MulterOptions = {
        storage: diskStorage({
          destination,
        }),
      };

      this.diskFilesInterceptor = new (FilesInterceptor(
        options.fieldName,
        options.maxCount,
        multerOptions,
      ))();
    }

    intercept(
      ...args: Parameters<NestInterceptor['intercept']>
    ): Observable<any> | Promise<Observable<any>> {
      return this.diskFilesInterceptor.intercept(...args);
    }
  }

  return mixin(Interceptor);
}
