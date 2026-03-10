import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import { OAuthUsersService } from "./users.service";
import { OAuthUser } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class OAuthUsersController {
  constructor(private readonly usersService: OAuthUsersService) {}

  @Get("")
  async findAll(): Promise<OAuthUser[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number): Promise<OAuthUser> {
    return this.usersService.findById(id);
  }

  @Post("create")
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<OAuthUser> {
    return this.usersService.create(createUserDto);
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<OAuthUser> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.usersService.remove(id);
  }
}
