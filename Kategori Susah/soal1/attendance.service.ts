import { Injectable } from '@nestjs/common';

export type AttendanceStatus = 'hadir' | 'izin' | 'sakit' | 'alpa';

export interface Attendance {
  id: number;
  user_id: number;
  date: string;
  time: string;
  status: AttendanceStatus;
}

export interface User {
  id: number;
  name: string;
  kelas: string;
  jabatan: string;
}

@Injectable()
export class AttendanceService {
  private attendanceRecords: Attendance[] = [
    // contoh data awal
    { id: 1, user_id: 1, date: '2025-11-01', time: '08:00', status: 'hadir' },
    { id: 2, user_id: 2, date: '2025-11-01', time: '08:05', status: 'izin' },
    { id: 3, user_id: 1, date: '2025-11-02', time: '08:00', status: 'hadir' },
  ];

  private userRecords: User[] = [
    { id: 1, name: 'Budi', kelas: 'kelas 11', jabatan: 'siswa' },
    { id: 2, name: 'Ani', kelas: 'kelas 11', jabatan: 'siswa' },
    { id: 3, name: 'Sari', kelas: 'kelas 12', jabatan: 'ketua kelas' },
  ];

  // ✅ No 3a
  createAttendance(data: { user_id: number; date: string; time: string; status: AttendanceStatus }): Attendance {
    const newAttendance: Attendance = {
      id: this.attendanceRecords.length + 1,
      ...data,
    };

    this.attendanceRecords.push(newAttendance);
    return newAttendance;
  }

  // ✅ No 3b
  getHistoryByUserId(user_id: number): Attendance[] {
    return this.attendanceRecords.filter(record => record.user_id === user_id);
  }

  // ✅ No 4a
  getMonthlySummary(user_id: number) {
    const records = this.attendanceRecords.filter(record => record.user_id === user_id);

    const summary = {
      hadir: records.filter(r => r.status === 'hadir').length,
      izin: records.filter(r => r.status === 'izin').length,
      sakit: records.filter(r => r.status === 'sakit').length,
      alpa: records.filter(r => r.status === 'alpa').length,
    };

    const currentMonth = new Date().toLocaleDateString('id-ID', { month: '2-digit', year: 'numeric' }).replace('/', '-');

    return {
      status: 'success',
      data: {
        user_id,
        month: currentMonth,
        attendance_summary: summary,
      },
    };
  }

  // ✅ No 4b
  analyzeAttendance(start_date: string, end_date: string, group_by: 'kelas' | 'jabatan') {
    // Filter attendance sesuai periode
    const filtered = this.attendanceRecords.filter(record => {
      const recordDate = new Date(record.date).getTime();
      return recordDate >= new Date(start_date).getTime() && recordDate <= new Date(end_date).getTime();
    });

    // Grouping data berdasarkan group_by
    const groups: {
      [key: string]: {
        users: Set<number>;
        attendance: { hadir: number; izin: number; sakit: number; alpa: number };
      };
    } = {};

    for (const record of filtered) {
      const user = this.userRecords.find(u => u.id === record.user_id);
      if (!user) continue;

      const groupValue = user[group_by] || 'unknown';

      if (!groups[groupValue]) {
        groups[groupValue] = {
          users: new Set(),
          attendance: { hadir: 0, izin: 0, sakit: 0, alpa: 0 },
        };
      }

      groups[groupValue].users.add(user.id);

      switch (record.status) {
        case 'hadir':
          groups[groupValue].attendance.hadir++;
          break;
        case 'izin':
          groups[groupValue].attendance.izin++;
          break;
        case 'sakit':
          groups[groupValue].attendance.sakit++;
          break;
        case 'alpa':
          groups[groupValue].attendance.alpa++;
          break;
      }
    }

    // Buat array hasil grouped_analysis dengan hitungan dan persentase
    const grouped_analysis = Object.entries(groups).map(([group, data]) => {
      const totalAttendanceCount =
        data.attendance.hadir +
        data.attendance.izin +
        data.attendance.sakit +
        data.attendance.alpa;

      const totalUsers = data.users.size;

      return {
        group,
        total_users: totalUsers,
        attendance_rate: {
          hadir_percentage: totalAttendanceCount ? Math.round((data.attendance.hadir / totalAttendanceCount) * 100 * 100) / 100 : 0,
          izin_percentage: totalAttendanceCount ? Math.round((data.attendance.izin / totalAttendanceCount) * 100 * 100) / 100 : 0,
          sakit_percentage: totalAttendanceCount ? Math.round((data.attendance.sakit / totalAttendanceCount) * 100 * 100) / 100 : 0,
          alpa_percentage: totalAttendanceCount ? Math.round((data.attendance.alpa / totalAttendanceCount) * 100 * 100) / 100 : 0,
        },

        total_attendance: data.attendance,
      };
    });

    return {
      status: 'success',
      data: {
        analysis_period: {
          start_date,
          end_date,
        },
        grouped_analysis,
      },
    };
  }
}
