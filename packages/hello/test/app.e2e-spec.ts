import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, INestMicroservice } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { grpcClientOptions } from 'shared/lib/options/hello.grpc';
import * as ProtoLoader from '@grpc/proto-loader';
import * as GRPC from '@grpc/grpc-js';
import { Hello } from 'shared/lib/generated/hello';
import { ServiceClient } from '@grpc/grpc-js/build/src/make-client';

describe('AppController (e2e)', () => {
  let server;
  let app: INestMicroservice;
  let client: ServiceClient;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestMicroservice(grpcClientOptions);

    await app.init();

    const proto = ProtoLoader.loadSync(grpcClientOptions.options.protoPath);
    const protoGRPC = GRPC.loadPackageDefinition(proto);
    const packageGRPC = protoGRPC.hello as GRPC.GrpcObject;
    const serviceGRPC =
      packageGRPC.HelloService as GRPC.ServiceClientConstructor;
    client = new serviceGRPC(
      grpcClientOptions.options.url,
      GRPC.credentials.createInsecure(),
    );
  });

  it('getHello (gRPC)', async () => {
    return new Promise<void>((resolve, reject) => {
      client.getHello({}, function (err, res) {
        if (err) return resolve(err);
        expect(res).toEqual({ message: 'Hello World!' });
        resolve();
      });
      setTimeout(() => resolve(), 1000);
    });
  });

  afterAll(async () => {
    client.close();
    await app.close();
  });
});
