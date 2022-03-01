import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'ws';

@WebSocketGateway({ cors: true, namespace: '/streamer' })
export class StreamerGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  // constructor(private readonly streamerService: StreamerService) {}
  private logger: Logger = new Logger(StreamerGateway.name);
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    return this.logger.log('Init');
  }

  handleConnection(client: Socket) {
    return this.logger.log(`Client con: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    return this.logger.log(`Client dis: ${client.id}`);
  }

  handleStatus(payload: any): Promise<WsResponse<any>> {
    this.logger.log(`Change status: ${payload.room}, ${payload.status}`);
    return this.server.to(payload.room).emit('statusToClient', payload);
  }

  @SubscribeMessage('joinStatus')
  joinStatus(client: Socket, room: string) {
    this.logger.log(`joinStatus: ${room}`);
    client.join(room);
  }

  @SubscribeMessage('leaveStatus')
  leaverStatus(client: Socket, room: string) {
    this.logger.log(`leaveStatus: ${room}`);
    client.leave(room);
  }

  // @SubscribeMessage('createStreamer')
  // create(@MessageBody() createStreamerDto: CreateStreamerDto) {
  //   return this.streamerService.create(createStreamerDto);
  // }

  // @SubscribeMessage('findAllStreamer')
  // findAll() {
  //   return this.streamerService.findAll();
  // }

  // @SubscribeMessage('findOneStreamer')
  // findOne(@MessageBody() id: number) {
  //   return this.streamerService.findOne(id);
  // }

  // @SubscribeMessage('updateStreamer')
  // update(@MessageBody() updateStreamerDto: UpdateStreamerDto) {
  //   return this.streamerService.update(updateStreamerDto.id, updateStreamerDto);
  // }

  // @SubscribeMessage('removeStreamer')
  // remove(@MessageBody() id: number) {
  //   return this.streamerService.remove(id);
  // }
}
