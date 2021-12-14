import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-twitter'

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor() {
    super({
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: 'http://localhost:3000/auth/twitter/callback',
      includeEmail: true,
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (...args) => {}
  ) {
    const { id, displayName, emails, photos } = profile
    const user = {
      email: emails[0].value,
      name: displayName,
      twitterId: id,
      imageUrl: photos[0].value,
      status: 'active',
    }
    done(null, user)
  }
}
