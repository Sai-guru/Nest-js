import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { User as UserEntity, UserRole } from "./entities/user.entity";
import { Repository } from "typeorm/repository/Repository.js";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {

    //TO CREATE THE ADMIN 

    //option 1
    // bcrypt.hash('123456',10).then(console.log); --use this password for the first admin and restart the server, copy the password 

    // INSERT INTO "user" (email, name, password, role) VALUES ('admin@gmail.com', 'Admin', '$2b$10$syxzNpiBHWajfxIXuyngVOEBk6pseSK1sPg65vpxZwm7P/9BaNRva', 'admin'); 
    // to get the admin in the table of our db or we can add it by adding a data there itself ,
    //  mainly there in the password field make sure pasting the copied password which we got in terminal by using that console log op...
    // and we can create the admin in postman,ETC   
      

    //option 2   - easy and amazing with clearance
    //just create a user and then in the table of our db change the role to admin 
    // and then we can login with that credentials here in the postman etc , 
    // then we can create the admin with the endpoint which we have created for admin creation in our auth controller
  
  
  }


  async register(registerDto: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) throw new ConflictException("User already exists");

    const hashedPassword = await this.hashPassword(registerDto.password);
    const newUser = this.userRepository.create({
      email: registerDto.email,
      name: registerDto.name,
      password: hashedPassword,
      role: UserRole.USER,
    });

    const savedUser = await this.userRepository.save(newUser);
    return {
      message: "User registered successfully",
      name: savedUser.name,
      role: savedUser.role,
    };
  }

  async createAdmin(registerDto: RegisterDto) {
    const existingAdmin = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingAdmin) throw new ConflictException("Admin already exists");

    const hashedPassword = await this.hashPassword(registerDto.password);
    const newAdmin = this.userRepository.create({
      email: registerDto.email,
      name: registerDto.name,
      password: hashedPassword,
      role: UserRole.ADMIN,
    });

    const savedAdmin = await this.userRepository.save(newAdmin);
    return {
      message: "Admin registered successfully",
      name: savedAdmin.name,
      role: savedAdmin.role,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user || !(await this.verifyPass(loginDto.password, user.password))) {
      throw new UnauthorizedException("Invalid credentials or user not exists");
    }

    //generate token
    const tokens = this.generateTokens(user);
    const { password, ...result } = user;

    return {
      message: "Login successful",
      tokens,
      // name : user.name,
      // role : user.role,
      result, //return user details without password
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.getRequiredConfig("JWT_REFRESH_TOKEN"),
      });

      const foundUser = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!foundUser) throw new UnauthorizedException("User not found");
      const tokens = this.generateTokens(foundUser);

      return {
        message: "Token refreshed successfully",
        tokens,
      };
    } catch (e) {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  //TODO - to find the user by id
  // todo completed successfully.....
  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    const { password, ...result } = user;
    return result;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  private async verifyPass(
    currPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(currPassword, hashedPassword);
  }

  private generateTokens(user: UserEntity) {
    //generate access token and refresh token
    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
    };
  }

  private generateAccessToken(user: UserEntity) {
    //email,id, role ---> vvImportant -> RBAC
    const payload = { email: user.email, sub: user.id, role: user.role };
    //sign the payload with secret key and return the token
    //you can use any library like jsonwebtoken or @nestjs/jwt
    //for simplicity, we are returning a dummy token here
    return this.jwtService.sign(payload, {
      secret: this.getRequiredConfig("JWT_ACCESS_TOKEN_SECRET"),
      expiresIn: "15m",
    });
  }
  private generateRefreshToken(user: UserEntity) {
    //generate refresh token
    return this.jwtService.sign(
      { email: user.email, sub: user.id, role: user.role },
      {
        secret: this.getRequiredConfig("JWT_REFRESH_TOKEN"),
        expiresIn: "7d",
      },
    );
  }

  private getRequiredConfig(key: string): string {
    const value = this.configService.get<string>(key);

    if (!value) {
      throw new InternalServerErrorException(`${key} is not configured`);
    }

    return value;
  }
}
