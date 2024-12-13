import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './User/auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PaymentModule } from './payment/payment.module';
import { ProfileModule } from './profile/profile.module';
import { SearchModule } from './search/search.module';
import { SlotsModule } from './Slots/slots.module';
import { SportsModule } from './sports/sports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserModule } from './user/user.module';
import { join } from 'path';
import { AdminController } from './admin/admin.controller';
import { BookingsController } from './bookings/bookings.controller';
import { FeedbacksController } from './feedbacks/feedbacks.controller';
import { NotificationsController } from './Notifications/notifications.controller';
import { PaymentController } from './Payment/payment.controller';
import { ProfileController } from './Profile/profile.controller';
import { SearchController } from './Search/search.controller';
import { SlotsController } from './Slots/slots.controller';
import { SportsController } from './sports/sports.controller';
import { AuthController } from './User/auth/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'tiger',
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
    ProfileModule,
    SearchModule,
    SlotsModule,
    SportsModule,
  ],
  controllers: [
    AppController,
    AdminController,
    AuthController,
    BookingsController,
    FeedbacksController,
    NotificationsController,
    PaymentController,
    ProfileController,
    SearchController,
    SlotsController,
    SportsController,
  ],
  providers: [AppService],
})
export class AppModule {}
