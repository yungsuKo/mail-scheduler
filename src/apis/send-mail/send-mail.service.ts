import { Injectable } from '@nestjs/common';
import { CreateSendMailDto } from './dto/create-send-mail.dto';
import { UpdateSendMailDto } from './dto/update-send-mail.dto';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SendMailService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  create(createSendMailDto: CreateSendMailDto) {
    console.log(process.env.EMAIL_USER);
    const { email, contents, min, sec } = createSendMailDto;
    const job = new CronJob(`${sec} ${min} * * * *`, (e) => {
      console.log('예약한 job이 실행됩니다');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      const message = {
        from: process.env.EMAIL_SENDER,
        to: process.env.EMAIL_SENDER,
        subject: contents,
        text: contents,
      };
      transporter.sendMail(message);
    });
    this.schedulerRegistry.addCronJob(email, job);
    job.start();
    console.log(email, contents, min, sec);
    return 'This action adds a new sendMail';
  }

  findAll() {
    const jobList = this.schedulerRegistry.getCronJobs();
    console.log(jobList);
    return jobList;
  }

  findOne(id: number) {
    return `This action returns a #${id} sendMail`;
  }

  update(id: number, updateSendMailDto: UpdateSendMailDto) {
    return `This action updates a #${id} sendMail`;
  }

  remove(id: number) {
    return `This action removes a #${id} sendMail`;
  }
}
