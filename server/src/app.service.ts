import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getPing(): object {
    return { result: 'pong' };
  }
}
