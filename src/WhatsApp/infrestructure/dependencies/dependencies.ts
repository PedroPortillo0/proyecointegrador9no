import { WhatsAppAdapter } from '../adapters/WhatsAppAdapter';
import { SendWhatsAppMessageUseCase } from '../../application/SendWhatsAppMessageUseCase';
import { SendWhatsAppMessageController } from '../controllers/SendWhatsAppMessageController';


// Instancia del adaptador de WhatsApp
const whatsappAdapter = new WhatsAppAdapter();

// Caso de uso para enviar mensajes de WhatsApp
export const sendWhatsAppMessageUseCase = new SendWhatsAppMessageUseCase(whatsappAdapter);
export const sendWhatsAppMessageController= new SendWhatsAppMessageController(sendWhatsAppMessageUseCase);
