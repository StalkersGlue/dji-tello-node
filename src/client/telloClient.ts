export interface TelloClient {
    send(command: string): Promise<void>
    getStatus(): Promise<string>
    stop(): void
}