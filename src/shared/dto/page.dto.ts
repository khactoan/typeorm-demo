import { PaginationMetaDto } from './pagination-meta.dto';

export class PageDto {
  readonly data: Array<any>;
  readonly metadata: PaginationMetaDto;

  constructor(data: Array<any>, metadata: PaginationMetaDto) {
    this.data = data;
    this.metadata = metadata;
  }
}
