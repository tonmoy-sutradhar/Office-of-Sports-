import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants, jwtOTPConstants } from './store';

@Module({
  imports:[UserModule,JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '24h'}
}),JwtModule.register({
    secret: jwtOTPConstants.secret,
    signOptions: { expiresIn: '5m'}
  })],
  controllers:[AuthController],
  providers: [AuthService,],
  exports: [AuthService]
})
export class AuthModule {}