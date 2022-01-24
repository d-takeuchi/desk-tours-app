import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { JwtPayload } from './interfaces/jwt-payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies['access_token']
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: 'sjgaohgakhahhayja@ha@jkajja@fa',
    })
  }

  public async validate(payload: JwtPayload) {
    if (!payload) {
      throw new UnauthorizedException()
    }
    return payload
  }
}
