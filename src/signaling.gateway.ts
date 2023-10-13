// signaling.gateway.ts
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SignalingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Implement the handleConnection method
  handleConnection(client: Socket, ...args: any[]) {
    // Handle connection logic if needed
  }

  // Implement the handleDisconnect method
  handleDisconnect(client: Socket) {
    // Handle disconnection logic if needed
  }

  @SubscribeMessage('offer')
  handleOffer(client: Socket, data: any): void {
    // Handle the offer message, e.g., forward it to the intended recipient
    this.server.to(data.recipientId).emit('offer', data.offer);
  }

  @SubscribeMessage('answer')
  handleAnswer(client: Socket, data: any): void {
    // Handle the answer message, e.g., forward it to the intended recipient
    this.server.to(data.recipientId).emit('answer', data.answer);
  }

  @SubscribeMessage('ice-candidate')
  handleIceCandidate(client: Socket, data: any): void {
    // Handle the ICE candidate message, e.g., forward it to the intended recipient
    this.server.to(data.recipientId).emit('ice-candidate', data.candidate);
  }
}
