import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private users = [
    // contoh user, nanti bisa diganti pakai database
    {
      id: 1,
      username: 'tuan',
      password: '$2b$10$f5iw79axoqTWRfx3kPXwwuw9XbimXdl4vNM3QX1p.OsvhSXb/l2Zy', // hash dari "12345"
    },
  ];

  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    const user = this.users.find((u) => u.username === username);
    if (!user) throw new UnauthorizedException('Username tidak ditemukan');

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) throw new UnauthorizedException('Password salah');

    return user;
  }

async login(username: string, password: string) {
  const user = this.users.find(u => u.username === username);
  if (!user) {
    throw new UnauthorizedException('User tidak ditemukan');
  }

  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    throw new UnauthorizedException('Password salah');
  }

  const payload = { username: user.username, sub: user.id };
  const token = await this.jwtService.signAsync(payload);

  return {
    status: 'success',
    message: 'Login berhasil',
    token: token,
  };
}

}
