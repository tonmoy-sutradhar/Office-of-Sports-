import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Office of Sports in --->>> American International University, Bangladesh';
  }
}
