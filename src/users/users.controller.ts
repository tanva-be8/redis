import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    // get data from cache
    const cachedCats = await this.cacheManager.get('all-users1');

    if (cachedCats) {
      console.log(
        '--------------------- get from Caches --------------------------',
        cachedCats,
      );

      return cachedCats;
    }

    console.log('--------------------- get from DB --------------------------');

    const users = await this.usersService.findAll();

    // set data to cache
    await this.cacheManager.set('all-users1', users);
    await this.cacheManager.set('all-users2', users, {
      ttl: 2000,
    });
    await this.cacheManager.set('all-users3', ' Beryl8 ', {
      ttl: 3000,
    });

    return users;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
