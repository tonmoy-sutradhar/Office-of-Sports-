import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './store';
import { Request } from 'express';

@Injectable()
export class OTPAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const bearerToken = this.extractTokenFromHeader(request);

        if (!bearerToken) {
            throw new UnauthorizedException('Unauthorized Access');
        }

        try {
            // Verify the Bearer token
            await this.jwtService.verifyAsync(bearerToken, {
                secret: jwtConstants.secret,
            });

        } catch (error) {
            throw new UnauthorizedException('Unauthorized Access');
        }

        return true;
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}