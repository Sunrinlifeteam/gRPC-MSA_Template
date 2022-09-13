"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grpcClientOptions = exports.servicePort = exports.serviceHost = void 0;
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
exports.serviceHost = 'localhost';
exports.servicePort = 60001;
exports.grpcClientOptions = {
    transport: microservices_1.Transport.GRPC,
    options: {
        url: `${exports.serviceHost}:${exports.servicePort}`,
        package: 'hello',
        protoPath: (0, path_1.join)(__dirname, '..', 'protocols', 'hello.proto'),
    },
};
//# sourceMappingURL=hello.grpc.js.map