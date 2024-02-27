import { BaseFilterDto } from "./base-filter.dto";

export class PaginationDto<T> {
    page: number;
    take: number;
    totalRecord: number;
    totalPage: number;
    nextPage?: number;
    prevPage?: number;
    data: T[];

    static from<T>(data: T[], filter: BaseFilterDto, totalRecord: number) {
        const dto = new PaginationDto<T>();
        dto.page = +filter.page;
        dto.take = +filter.take;
        dto.data = data;
        dto.totalRecord = totalRecord;
        dto.totalPage = Math.ceil(dto.totalRecord/dto.take);
        if (dto.page < dto.totalPage) {
            dto.nextPage = dto.page+1;
        }
        if (dto.page > 1) {
            dto.prevPage = dto.page-1;
        }
        return dto;
    }
}