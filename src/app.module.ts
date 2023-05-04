import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SendMailModule } from './apis/send-mail/send-mail.module';
import { ScheduleModule } from './apis/schedule/schedule.module';

@Module({
  imports: [SendMailModule, ScheduleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
