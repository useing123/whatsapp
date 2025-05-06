import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { Response } from 'express';
import * as fs from 'fs';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post('send')
  async sendMessage(@Body() body: { number: string; message: string }) {
    await this.whatsappService.sendMessage(body.number, body.message);
    return { status: 'ok' };
  }

  @Get('qr')
  async getQrCode(@Res() res: Response) {
    const qrPath = 'qr.png';
    if (fs.existsSync(qrPath)) {
      res.sendFile(qrPath, { root: '.' });
    } else {
      res.status(404).send('QR не сгенерирован');
    }
  }
}
