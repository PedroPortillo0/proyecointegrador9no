import express from 'express';
import { sendWhatsAppMessageController } from '../dependencies/dependencies';


export const whatsappRouter = express.Router();

whatsappRouter.post('/mensaje', (req, res) => sendWhatsAppMessageController.run(req, res));
