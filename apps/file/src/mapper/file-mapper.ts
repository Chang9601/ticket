import { FileDto } from '../dto/file.dto';
import { FileEntity } from '../entity/file.entity';

export class FileMapper {
  public static toEntity(fileDto: FileDto): FileEntity {
    return new FileEntity({ ...fileDto });
  }

  public static toDto({
    id,
    name,
    path,
    size,
    ext,
    mimetype,
  }: FileEntity): FileDto {
    return new FileDto(id, name, path, size, ext, mimetype);
  }
}
