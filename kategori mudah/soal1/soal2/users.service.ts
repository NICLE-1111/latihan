import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: any[] = [];
  private idCounter = 1;

  findAll() {
    // Hapus password sebelum dikirim ke client
    return this.users.map(({ password, ...user }) => user);
  }

  create(userData: any) {
    const newUser = {
      id: this.idCounter++,
      ...userData,
    };
    this.users.push(newUser);
    // Jangan kirim password dalam respons
    const { password, ...safeUser } = newUser;
    return safeUser;
  }

  findOne(id: string) {
    const user = this.users.find(user => user.id === Number(id));
    if (!user) return null;
    const { password, ...safeUser } = user;
    return safeUser; 
  }

  // Update pengguna berdasarkan ID
  update(id: string, updateData: any) {
    const userIndex = this.users.findIndex(user => user.id === Number(id));
    if (userIndex === -1) return null;

    // update user, jangan ubah ID
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateData,
    };

    const { password, ...safeUser } = this.users[userIndex];
    return safeUser;
  }
}
