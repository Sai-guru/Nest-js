import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([User])],  // this will make the User entity
    // available for dependency injection in the AuthService,
    //  allowing us to use the repository pattern
    
    //  to interact with the database.
})
export class AuthModule {}
