import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './modules/core/app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Payment Service - Guimarbot')
    .setDescription('Payment Service API Documentation')
    .setVersion('1.0')
    .addTag('payment')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )

  app.enableCors({
    origin: '*',
    credentials: true,
  })

  await app.listen(process.env.PORT)
}
bootstrap()
