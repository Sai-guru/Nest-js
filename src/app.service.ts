import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {


//inject that config service in the constructor of the app service

constructor(private configService: ConfigService) {}
// reference see here ok : https://docs.nestjs.com/techniques/configuration





  getHello(): string {
    const appName = this.configService.get<string>('appName'); // get the value of APP_NAME from the .env file
    console.log(`App Name: ${appName}`); 
    
    return `U r in root / route! App Name: ${appName}`;
  }
}
