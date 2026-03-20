//  /posts/page=1&limit=10

import { IsInt, IsOptional, Max, Min } from "class-validator";
import { Type } from "class-transformer";

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "page must be an integer" })
  @Min(1, { message: "page must be atleast 1" })
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "limit must be an integer" })
  @Min(1, { message: "limit must be atleast 1" })
  @Max(100, { message: "limit can't exceed 100 pages" })
  limit?: number = 10;
}


// alert : Stopped the cache & pagination implementation...