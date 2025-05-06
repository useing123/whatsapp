// src/whatsapp/whatsapp.controller.ts
import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post('send')
  async sendMessage(@Body() body: { number: string; message: string }) {
    const { number, message } = body;
    if (!number || !message) {
      throw new BadRequestException('Номер и сообщение обязательны');
    }

    await this.whatsappService.sendMessage(number, message);
    return { status: 'Сообщение отправлено' };
  }
}
