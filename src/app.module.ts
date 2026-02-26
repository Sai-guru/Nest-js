import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [HelloModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



//Note : 
// service must be exported from the curr module to be used in other module.
// while module must be imported to be used in other module.