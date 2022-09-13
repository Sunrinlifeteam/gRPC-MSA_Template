import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const serviceHost = 'localhost';
export const servicePort = 60001;

export const grpcClientOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    url: `${serviceHost}:${servicePort}`,
    package: 'hello',
    protoPath: join(__dirname, '..', 'protocols', 'hello.proto'),
  },
};
