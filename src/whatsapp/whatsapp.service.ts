// src/whatsapp/whatsapp.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, LocalAuth } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';

@Injectable()
export class WhatsappService implements OnModuleInit {
  private client: Client;

  async onModuleInit() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
    });

    this.client.on('qr', (qr) => {
      console.log('Сканируй QR-код:');
      qrcode.generate(qr, { small: true });
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
