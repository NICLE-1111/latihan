import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users') // ubah di sini
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    const users = this.usersService.findAll();
    return {
      status: 'success',
      message: 'Data pengguna berhasil diambil',
      data: users,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.usersService.findOne(id);
    if (!user) {
      return {
        status: 'error',
        message: `Pengguna dengan ID ${id} tidak ditemukan`,
      };
    }
    return {
      status: 'success',
      message: 'Data pengguna berhasil diambil',
      data: user,
    };
  }

  @Post()
  create(@Body() createUserDto: any) {
    const newUser = this.usersService.create(createUserDto);
    return {
      status: 'success',
      message: 'Pengguna berhasil ditambahkan',
      data: newUser,
    };
  }

  
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    const updatedUser = this.usersService.update(id, updateUserDto);

    if (!updatedUser) {
      return {
        status: 'error',
        message: `Pengguna dengan ID ${id} tidak ditemukan`,
      };
    }

    return {
      status: 'success',
      message: 'Data pengguna berhasil diperbarui',
      data: updatedUser,
    };
  }
}
