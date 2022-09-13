import { Observable } from "rxjs";
import { Empty } from "./google/protobuf/empty";
export declare const protobufPackage = "hello";
export interface Hello {
    message: string;
}
export declare const HELLO_PACKAGE_NAME = "hello";
export interface HelloServiceClient {
    getHello(request: Empty): Observable<Hello>;
}
export interface HelloServiceController {
    getHello(request: Empty): Promise<Hello> | Observable<Hello> | Hello;
}
export declare function HelloServiceControllerMethods(): (constructor: Function) => void;
export declare const HELLO_SERVICE_NAME = "HelloService";
