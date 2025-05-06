// src/email/email.controller.ts
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@Controller('email')
@UseGuards(ApiKeyGuard)
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() body: { to: string; subject: string; text: string }) {
    await this.emailService.sendEmail(body.to, body.subject, body.text);
    return { status: 'Email отправлен' };
  }
}
