import { Body, Controller, Get, Param, Post, BadRequestException } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('api/attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  // ✅ No 3a — Create attendance
  @Post()
  create(@Body() body: any) {
    const { user_id, date, time, status } = body;

    if (!user_id || !date || !time || !status) {
      throw new BadRequestException('user_id, date, time, dan status wajib diisi');
    }

    const attendance = this.attendanceService.createAttendance({
      user_id: Number(user_id),
      date,
      time,
      status,
    });

    return {
      status: 'success',
      message: 'Presensi berhasil dicatat',
      data: {
        attendance_id: attendance.id,
        user_id: attendance.user_id,
        date: attendance.date,
        time: attendance.time,
        status: attendance.status,
      },
    };
  }

  // ✅ No 3b — Get history
  @Get('history/:user_id')
  getHistory(@Param('user_id') user_id: string) {
    const history = this.attendanceService.getHistoryByUserId(Number(user_id));

    if (history.length === 0) {
      return {
        status: 'error',
        message: `Belum ada riwayat presensi untuk user dengan ID ${user_id}`,
        data: [],
      };
    }

    return {
      status: 'success',
      message: 'Riwayat presensi berhasil diambil',
      data: history,
    };
  }

  // ✅ No 4a — Monthly summary
  @Get('summary/:userId')
  getMonthlySummary(@Param('userId') userId: string) {
    return this.attendanceService.getMonthlySummary(Number(userId));
  }

  // ✅ No 4b — Analisis kehadiran berdasarkan periode & kategori
  @Post('analysis')
  analyzeAttendance(@Body() body: any) {
    const { start_date, end_date, group_by } = body;

    if (!start_date || !end_date || !group_by) {
      throw new BadRequestException('start_date, end_date, dan group_by wajib diisi');
    }

    return this.attendanceService.analyzeAttendance(start_date, end_date, group_by);
  }
}
