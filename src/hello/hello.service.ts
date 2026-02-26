import { Injectable } from '@nestjs/common';

//buisness logic...
@Injectable()
export class HelloService {

  getHello(): string {
    return 'Hello first-route!';
  }

  getHelloWithName(name:string) : string  {
    return `Hello ${name}!`;
  }
  
}
