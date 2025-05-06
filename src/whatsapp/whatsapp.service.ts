// src/whatsapp/whatsapp.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, LocalAuth } from 'whatsapp-web.js';
import * as fs from 'fs';
import * as qrcode from 'qrcode';

@Injectable()
export class WhatsappService implements OnModuleInit {
  private client: Client;

  async onModuleInit() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        executablePath: '/usr/bin/chromium',
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    });

    this.client.on('qr', async (qr) => {
      console.log('QR получен. Сохраняем...');
      await qrcode.toFile('qr.png', qr);
    });

    this.client.on('ready', () => {
      console.log('✅ WhatsApp готов к отправке сообщений');
    });

    await this.client.initialize();
  }

  async sendMessage(number: string, message: string): Promise<void> {
    const chatId = number + '@c.us';
    await this.client.sendMessage(chatId, message);
  }
}
