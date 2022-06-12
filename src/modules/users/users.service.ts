import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly _usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userFound: User = await this._usersRepository.findOne({
      where: {
        status: true,
        email: createUserDto.email,
      },
    });

    if (userFound) throw new ConflictException('The user already exists.');

    return await this._usersRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this._usersRepository.find({
      // relations: { tweets: true },
      where: { status: true },
    });
  }

  async findOne(id: string): Promise<User> {
    const userFound: User = await this._usersRepository.findOne({
      relations: { tweets: true },
      where: {
        id,
        status: true,
      },
    });

    if (!userFound) throw new ConflictException('The user already exists.');

    return userFound;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userFound: User = await this._usersRepository.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!userFound) throw new NotFoundException('The user has not been found.');

    const updatedUser = Object.assign(userFound, updateUserDto);

    return await this._usersRepository.save(updatedUser);
  }

  async remove(id: string): Promise<void> {
    const userFound: User = await this._usersRepository.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!userFound) throw new NotFoundException('The user has not been found.');

    await this._usersRepository.update(id, { status: false });
  }
}
