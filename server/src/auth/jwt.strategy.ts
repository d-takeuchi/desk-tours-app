import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies['jwt'];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: 'sjgaohgakhahhayja@ha@jkajja@fa',
    });
  }

  public async validate(payload: JwtPayload) {
    return payload;
  }
}
