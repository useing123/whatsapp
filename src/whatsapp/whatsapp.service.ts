import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, LocalAuth } from 'whatsapp-web.js';
import * as fs from 'fs';
import * as qrcode from 'qrcode';
import * as qrcodeTerminal from 'qrcode-terminal';

@Injectable()
export class WhatsappService implements OnModuleInit {
  private client: Client;

  async onModuleInit() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    });

    this.client.on('qr', async (qr) => {
      qrcodeTerminal.generate(qr, { small: true }); // QR-код в консоли
      await qrcode.toFile('qr.png', qr);            // (опционально) сохраняет в файл
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
