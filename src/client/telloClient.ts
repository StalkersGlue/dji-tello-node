export interface TelloClient {
    send(command: string): Promise<void>
    stop(): void
}