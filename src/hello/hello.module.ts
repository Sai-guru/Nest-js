import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

// erger

@Module({
  controllers: [HelloController],
  providers: [HelloService],
  imports: [], //empty as of now - modules that we wanna import into this module
  exports: [HelloService], //empty as of now - services, modules, etc that we want to export to other modules
})
export class HelloModule {}
 