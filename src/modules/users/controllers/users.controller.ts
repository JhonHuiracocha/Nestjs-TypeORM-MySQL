import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Observable<User> {
    return this._usersService.registerAccount(createUserDto);
  }

  @Get()
  findAll(): Observable<User[]> {
    return this._usersService.findUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<User> {
    return this._usersService.findUserById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Observable<UpdateResult> {
    return this._usersService.updateUserById(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<UpdateResult> {
    return this._usersService.deleteUserById(id);
  }
}
