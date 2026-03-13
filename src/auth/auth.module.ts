import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './guard/roles-guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [AuthService,JwtStrategy,RolesGuard],
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([User]),
  PassportModule,// this will allow us to use the Passport library for authentication, which provides a wide range of strategies for handling authentication, such as JWT, local, OAuth, etc.
  JwtModule.register({})
],  


// this will make the User entity
    // available for dependency injection in the AuthService,
    //  allowing us to use the repository pattern
    exports: [AuthService,RolesGuard], // this will allow us to use the AuthService in other modules, such as the PostsModule, to check user roles and permissions when creating or updating posts, and also to interact with the database through the User repository.
    
    //  to interact with the database.
})
export class AuthModule {}
