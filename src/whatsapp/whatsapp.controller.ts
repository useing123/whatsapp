import { Controller, Post, Body, Get, Res } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { Response } from 'express';
import * as fs from 'fs';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post('send')
  async sendMessage(@Body() body: { number: string; message: string }) {
    const { number, message } = body;
    if (!number || !message) return { status: 'error', message: 'Missing fields' };

    await this.whatsappService.sendMessage(number, message);
    return { status: 'sent' };
  }

  @Get('qr')
  async getQrCode(@Res() res: Response) {
    const path = 'qr.png';
    if (fs.existsSync(path)) {
      res.sendFile(path, { root: '.' });
    } else {
      res.status(404).send('QR not generated yet');
    }
  }
}
