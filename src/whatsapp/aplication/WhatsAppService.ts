import { IWhatsAppService } from '../domain/IWhatsAppService';

export class WhatsAppService {
    private whatsappService: IWhatsAppService;

    constructor(whatsappService: IWhatsAppService) {
        this.whatsappService = whatsappService;
    }

    async sendWelcomeMessage(phoneNumber: string): Promise<void> {
        try {
            await this.whatsappService.sendWelcomeMessage(phoneNumber);
            console.log('Mensaje de bienvenida enviado con éxito.');
        } catch (error) {
            console.error('Error al enviar el mensaje de bienvenida:', error);
        }
    }
}
