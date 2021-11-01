import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getLove(): string {
    return 'I Love you! <3';
  }
  getBye(): string {
    return 'Goodbye my Friend!';
  }
  getHello(): string {
    return 'Hello World!';
  }
}
