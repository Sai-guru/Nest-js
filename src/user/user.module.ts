import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HelloModule } from 'src/hello/hello.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [HelloModule], //empty as of now - modules that we wanna import into this module
  exports: [], //empty as of now - services, modules, etc that we want to export to other modules
})
export class UserModule {}
