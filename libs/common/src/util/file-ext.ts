import * as path from 'path';

export class FileExt {
  public static async getFileExt(filename: string) {
    return path.extname(filename);
  }
}
