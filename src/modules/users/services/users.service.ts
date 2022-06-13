import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { from, Observable, of, tap, switchMap, map } from 'rxjs';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly _usersRepository: Repository<User>,
  ) {}

  doesUserExist(email: string): Observable<boolean> {
    return from(this._usersRepository.findOne({ where: { email } })).pipe(
      switchMap((user: User) => {
        return of(!!user);
      }),
    );
  }

  registerAccount(createUserDto: CreateUserDto): Observable<User> {
    return this.doesUserExist(createUserDto.email).pipe(
      tap((doesUserExist: boolean) => {
        if (doesUserExist)
          throw new ConflictException('The user already exists.');
      }),
      switchMap(() => {
        return from(this._usersRepository.save(createUserDto)).pipe(
          map((user: User) => user),
        );
      }),
    );
  }

  findUsers(): Observable<User[]> {
    return from(
      this._usersRepository.find({
        where: { status: true },
      }),
    );
  }

  findUserById(id: string): Observable<User> {
    return from(this._usersRepository.findOne({ where: { id } })).pipe(
      map((user: User) => {
        if (!user) throw new NotFoundException('The user has not been found.');
        return user;
      }),
    );
  }

  updateUserById(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Observable<UpdateResult> {
    return from(this._usersRepository.findOne({ where: { id } })).pipe(
      tap((user: User) => {
        if (!user) throw new NotFoundException('The user has not been found.');
      }),
      switchMap(() => {
        return this._usersRepository.update(id, updateUserDto);
      }),
    );
  }

  deleteUserById(id: string): Observable<UpdateResult> {
    return from(this._usersRepository.findOne({ where: { id } })).pipe(
      tap((user: User) => {
        if (!user) throw new NotFoundException('The user has not been found.');
      }),
      switchMap(() => {
        return this._usersRepository.update(id, { status: false });
      }),
    );
  }
}
