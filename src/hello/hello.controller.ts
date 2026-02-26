import { Controller, Get, Param, Query } from '@nestjs/common';
import { HelloService } from './hello.service';

//take care of the incoming req and return the res
// get,post,put,delete,patch, ....
//controllers use  DI

// ety route for this module /hello
@Controller('hello')
export class HelloController {
  //DI
  constructor(private readonly helloService: HelloService) {}

  @Get()
  getHello(): string {
    return this.helloService.getHello();
  }
    //  http://localhost:3000/hello/user/saiguru
    @Get('user/:name')
    getHelloWithName(@Param('name')name :  string): string {
        return this.helloService.getHelloWithName(name);
    }

    // http://localhost:3000/hello/query?name=guru
    @Get('query')
    getHelloWithQuery(@Query('name')name : string) : string {
        return this.helloService.getHelloWithName(name || 'World');
    }

}
