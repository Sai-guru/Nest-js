import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OAuthUser } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class OAuthUsersService {
  constructor(
    @InjectRepository(OAuthUser)
    private readonly usersRepository: Repository<OAuthUser>,
  ) {}

  async findAll(): Promise<OAuthUser[]> {
    return this.usersRepository.find();
  }

  async findById(id: number): Promise<OAuthUser> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async findByEmail(email: string): Promise<OAuthUser | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<OAuthUser> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<OAuthUser> {
    const current = await this.usersRepository.findOne({ where: { id } });

    if (!current) {
      throw new NotFoundException("User not found");
    }

    const updated = this.usersRepository.merge(current, updateUserDto, {
      updatedAt: new Date(),
    });

    return this.usersRepository.save(updated);
  }

  async remove(id: number): Promise<{ message: string }> {
    const current = await this.usersRepository.findOne({ where: { id } });

    if (!current) {
      throw new NotFoundException("User not found");
    }

    await this.usersRepository.remove(current);

    return { message: "User removed successfully" };
  }

  async findOrCreateFromGoogle(payload: {
    email: string;
    displayName: string;
    provider: string;
    providerId: string;
  }): Promise<OAuthUser> {
    const existing = await this.findByEmail(payload.email);
    if (existing) {
      return existing;
    }

    return this.create({
      email: payload.email,
      displayName: payload.displayName,
      provider: payload.provider,
      providerId: payload.providerId,
    });
  }
}
