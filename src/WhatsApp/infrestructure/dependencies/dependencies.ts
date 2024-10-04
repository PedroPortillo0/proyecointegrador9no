import { WhatsAppAdapter } from '../adapters/WhatsAppAdapter';
import { SendWhatsAppMessageUseCase } from '../../application/SendWhatsAppMessageUseCase';
import { SendWhatsAppMessageController } from '../controllers/SendWhatsAppMessageController';


const whatsappAdapter = new WhatsAppAdapter();

export const sendWhatsAppMessageUseCase = new SendWhatsAppMessageUseCase(whatsappAdapter);
export const sendWhatsAppMessageController= new SendWhatsAppMessageController(sendWhatsAppMessageUseCase);
