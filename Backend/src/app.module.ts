import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from 'src/User/auth/auth.module';
import { BookingsModule } from 'src/bookings/bookings.module';
import { FeedbacksModule } from 'src/feedbacks/feedbacks.module';
import { NotificationsModule } from 'src/Notifications/notifications.module';
import { PaymentModule } from 'src/Payment/payment.module';
import { SearchModule } from 'src/Search/search.module';
import { SlotsModule } from 'src/Slots/slots.module';
import { SportsModule } from 'src/sports/sports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './User/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }), 
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: 'localhost',
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'office_of_sports_online',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AdminModule,
    AuthModule,
    BookingsModule,
    FeedbacksModule,
    NotificationsModule,
    PaymentModule,
    SearchModule,
    SlotsModule,
    SportsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
