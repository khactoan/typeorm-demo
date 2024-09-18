import { PaginationDto } from './pagination.dto';

export class PaginationMetaDto {
  readonly page: number;
  readonly total: number;
  readonly limit: number;
  readonly totalItem: number;
  readonly totalPage: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;

  constructor({
    paginationDto,
    totalItem,
  }: {
    paginationDto: PaginationDto;
    totalItem: number;
  }) {
    this.page = paginationDto.page;
    this.limit = paginationDto.limit;
    this.totalItem = totalItem;
    this.totalPage = Math.ceil(this.totalItem / this.limit);
    this.hasNextPage = this.page < this.totalPage;
    this.hasPreviousPage = this.page > 1;
  }
}
