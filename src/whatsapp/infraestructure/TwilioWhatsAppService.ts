import { IWhatsAppService } from '../domain/IWhatsAppService';
import twilio from 'twilio';

export class TwilioWhatsAppService implements IWhatsAppService {
    private client: twilio.Twilio;

    constructor() {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        this.client = twilio(accountSid, authToken);
    }

    async sendWelcomeMessage(phoneNumber: string): Promise<void> {
        try {
            await this.client.messages.create({
                from: 'whatsapp:+13524412805', // Reemplaza con tu número de WhatsApp configurado
                to: `whatsapp:${phoneNumber}`,
                contentSid: 'HX661de31132d60b5bca6e223e30d0ff74', // Reemplaza con el SID de tu plantilla aprobada
                contentVariables: JSON.stringify({}) // Agrega variables si tu plantilla las requiere
            });
        } catch (error: any) {
            const errorMessage = error?.message || 'Error desconocido';
            throw new Error(`Error al enviar el mensaje de WhatsApp: ${errorMessage}`);
        }
    }
}
