import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { json, urlencoded } from 'body-parser'
import * as cookieParser from 'cookie-parser'
// import * as csurf from 'csurf'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3001',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, X-CSRF-Token',
  })
  app.use(cookieParser())
  // app.use(csurf({ cookie: true }))
  app.use(json({ limit: '10mb' }))
  app.use(urlencoded({ limit: '10mb', extended: true }))

  await app.listen(3000)
}
bootstrap()
