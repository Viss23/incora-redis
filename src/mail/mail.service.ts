import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendImageToEmail(
    file: Express.Multer.File,
    email = 'wissper777@gmail.com',
  ) {
    this.mailerService.sendMail({
      to: email,
      subject: 'image',
      attachments: [
        {
          filename: file.filename,
          content: file.buffer.toString('base64'),
          encoding: 'base64',
          contentType: file.mimetype,
        },
      ],
    });
  }
}
