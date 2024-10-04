import { Request, Response } from 'express';
import { SendWhatsAppMessageUseCase } from '../../application/SendWhatsAppMessageUseCase';

export class SendWhatsAppMessageController {
    constructor(private readonly sendWhatsAppMessageUseCase: SendWhatsAppMessageUseCase) {}

    async run(req: Request, res: Response): Promise<void> {
        const { to, message } = req.body;

        try {
            await this.sendWhatsAppMessageUseCase.run(to, message);
            res.status(200).send({ status: 'success', message: 'Mensaje enviado correctamente' });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: error instanceof Error ? error.message : 'Error desconocido',
            });
        }
    }
}
