import * as path from 'path';

export class FileExt {
  public static async getExtFromFile(filename: string) {
    return path.extname(filename);
  }
}
