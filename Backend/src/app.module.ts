import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { BookingsController } from './bookings/bookings.controller';
import { BookingsModule } from './bookings/bookings.module';
import { FeedbacksController } from './feedbacks/feedbacks.controller';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { NotificationsController } from './notifications/notifications.controller';
import { NotificationsModule } from './notifications/notifications.module';
import { PaymentController } from './payment/payment.controller';
import { PaymentModule } from './payment/payment.module';
import { ProfileController } from './profile/profile.controller';
import { ProfileModule } from './profile/profile.module';
import { SearchController } from './search/search.controller';
import { SearchModule } from './search/search.module';
import { SlotsController } from './Slots/slots.controller';
import { SlotsModule } from './Slots/slots.module';
import { SportsController } from './sports/sports.controller';
import { SportsModule } from './sports/sports.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'emamul',
    database:'office_of_sports_online',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
    AdminModule, AuthModule, BookingsModule, FeedbacksModule, NotificationsModule, PaymentModule, ProfileModule, SearchModule, SlotsModule, SportsModule],
  controllers: [AppController, AdminController, AuthController, BookingsController, FeedbacksController, NotificationsController, PaymentController, ProfileController, SearchController, SlotsController, SportsController],
  providers: [AppService],
})
export class AppModule {}
