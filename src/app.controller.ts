import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { AppService } from './app.service';

import { Cache } from 'cache-manager';

import { getCats } from './utils';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('cats')
  create(@Body() createCate: any) {
    return ' Post Cate';
  }

  @Get('cats')
  async getCats() {
    const cachedCats = await this.cacheManager.get('all-cats');

    console.log(
      '--------------------- get cachedCats --------------------------',
      cachedCats,
    );
    if (cachedCats) {
      return cachedCats;
    }

    const cats = await getCats();
    const ttl = 10;
    this.cacheManager.set('all-cats', cats, ttl);

    return cats;
  }
}
