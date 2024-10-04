import { WhatsAppRepository } from '../domain/WhatsAppRepository';

export class SendWhatsAppMessageUseCase {
    constructor(private readonly whatsappRepository: WhatsAppRepository) {}

    async run(to: string, message: string): Promise<void> {
        if (!to || !message) {
            throw new Error('El número de destino y el mensaje son requeridos');
        }
        await this.whatsappRepository.sendMessage(to, message);
    }
}
