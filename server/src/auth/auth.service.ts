import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    const matchPassword = await bcrypt.compare(password, user?.password);

    console.log('matchPassword', matchPassword);

    if (user && matchPassword) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {id: user._id, email: user.email }
    return {
      id: user._id,
      email: user.email,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
