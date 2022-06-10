import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private _tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this._tasksRepository.save(createTaskDto);
  }

  async findAll(): Promise<Task[]> {
    return this._tasksRepository.find({ where: { isActive: true } });
  }

  async findOne(id: number): Promise<Task> {
    const taskFound: Task = await this._tasksRepository.findOne({
      where: {
        id,
        isActive: true,
      },
    });

    if (!taskFound) throw new NotFoundException('The task has not been found.');

    return taskFound;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const taskFound: Task = await this._tasksRepository.findOne({
      where: {
        id,
        isActive: true,
      },
    });

    if (!taskFound) throw new NotFoundException('The task has not been found.');

    const updatedTask = Object.assign(taskFound, updateTaskDto);

    return await this._tasksRepository.save(updatedTask);
  }

  async delete(id: number): Promise<void> {
    const taskFound: Task = await this._tasksRepository.findOne({
      where: {
        id,
        isActive: true,
      },
    });

    if (!taskFound) throw new NotFoundException('The task has not been found.');

    await this._tasksRepository.update(id, { isActive: false });
  }
}
