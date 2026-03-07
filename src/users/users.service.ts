import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
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
  }): Promise<User> {
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
