export class FileDto {
  public id: number;

  public name: string;

  public path: string;

  public size: number;

  public ext: string;

  public mimeType: string;

  constructor(
    id?: number,
    name?: string,
    path?: string,
    size?: number,
    ext?: string,
    mimeType?: string,
  ) {
    this.id = id || -1;
    this.name = name || '';
    this.path = path || '';
    this.size = size || -1;
    this.ext = ext || '';
    this.mimeType = mimeType || '';
  }
}
