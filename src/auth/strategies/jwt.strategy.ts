import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: process.env.JWT_SECRET || 'secretKey', // Asegúrate de que este secreto coincida con el utilizado al firmar el JWT
    });
  }

  async validate(payload: any) {
    // Este objeto estará disponible en `req.user`
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
