export interface IWhatsAppService {
    sendWelcomeMessage(phoneNumber: string): Promise<void>;
}
