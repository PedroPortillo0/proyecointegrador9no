export interface WhatsAppRepository {
    sendMessage(
        to: string, 
        message: string
    ): Promise<void>;
}
