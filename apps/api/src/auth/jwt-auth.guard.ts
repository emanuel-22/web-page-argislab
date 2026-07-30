import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

export const SESSION_COOKIE_NAME = 'argislab_admin_session';

export type AdminTokenPayload = {
  sub: number;
  email: string;
};

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request & { admin?: AdminTokenPayload }>();
    const token = request.cookies?.[SESSION_COOKIE_NAME];

    if (!token) throw new UnauthorizedException('No autenticado');

    try {
      request.admin = this.jwtService.verify<AdminTokenPayload>(token);
      return true;
    } catch {
      throw new UnauthorizedException('Sesión inválida o expirada');
    }
  }
}
