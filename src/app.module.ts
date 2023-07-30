import { Module } from '@nestjs/common';
import { AppController } from './languages/infrastructure/ui/api/v1/controllers/app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
