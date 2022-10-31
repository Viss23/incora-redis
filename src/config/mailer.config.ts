import { MailerOptions } from '@nestjs-modules/mailer';

export const getMailerConfig = (): MailerOptions => {
  return {
    transport: {
      host: process.env.MAILER_HOST,
      secure: false,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    },
    defaults: {
      from: '"Oleh Nosal" <wissper777@gmail.com>',
    },
  };
};
