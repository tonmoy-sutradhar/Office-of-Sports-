import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './store';
import { Request } from 'express';

@Injectable()
export class userAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const bearerToken = this.extractTokenFromHeader(request);
        const cookieToken = request.cookies['access_token'];

        if (!bearerToken || !cookieToken) {
            throw new UnauthorizedException('Unauthorized Access');
        }

        try {
            // Verify the Bearer token
            await this.jwtService.verifyAsync(bearerToken, {
                secret: jwtConstants.secret,
            });

            // Ensure the cookie value matches or exists
            if (bearerToken !== cookieToken) {
                throw new UnauthorizedException('Invalid Access Token');
            }
        } catch (error) {
            throw new UnauthorizedException('Unauthorized');
        }

        return true;
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}