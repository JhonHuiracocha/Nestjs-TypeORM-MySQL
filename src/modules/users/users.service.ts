import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateTaskDto } from '../tasks/dto/update-task.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private _usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userFound: User = await this._usersRepository.findOne({
      where: {
        isActive: true,
        email: createUserDto.email,
      },
    });

    if (userFound) throw new ConflictException('The user already exists.');

    return await this._usersRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this._usersRepository.find({ where: { isActive: true } });
  }

  async findOne(id: number): Promise<User> {
    const userFound: User = await this._usersRepository.findOne({
      where: {
        id,
        isActive: true,
      },
    });

    if (!userFound) throw new NotFoundException('The user has not been found.');

    return userFound;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<User> {
    const userFound: User = await this._usersRepository.findOne({
      where: {
        id,
        isActive: true,
      },
    });

    if (!userFound) throw new NotFoundException('The user has not been found.');

    const updatedUser = Object.assign(userFound, updateTaskDto);

    return await this._usersRepository.save(updatedUser);
  }

  async delete(id: number): Promise<void> {
    const userFound: User = await this._usersRepository.findOne({
      where: {
        id,
        isActive: true,
      },
    });

    if (!userFound) throw new NotFoundException('The user has not been found.');

    await this._usersRepository.update(id, { isActive: false });
  }
}
