📘 4a. Rekap Kehadiran Bulanan

Endpoint: GET /api/attendance/summary/{user_id}
Deskripsi:
Menampilkan rekap jumlah kehadiran per bulan berdasarkan ID pengguna.

Fungsi & Cara Kerja:
-Sistem menghitung total hadir, izin, sakit, dan alpa untuk pengguna tersebut.
-Rekap disusun berdasarkan bulan aktif.
-Data dikembalikan dalam format JSON.

Contoh Response:

{
  "status": "success",
  "data": {
    "user_id": 1,
    "month": "11-2025",
    "attendance_summary": {
      "hadir": 10,
      "izin": 1,
      "sakit": 0,
      "alpa": 0
    }
  }
}

**SS an result:**  
![Hasil No 4a](../latihan-ukl/no_4-a.png)


📘 4b. Analisis Kehadiran Berdasarkan Parameter

Endpoint: POST /api/attendance/analysis
Deskripsi:
Menganalisis tingkat kehadiran pengguna berdasarkan periode waktu dan kategori (kelas atau jabatan).

Fungsi & Cara Kerja:
-Client mengirimkan start_date, end_date, dan group_by (kelas/jabatan).
-Sistem memfilter data presensi sesuai rentang waktu.
-Data dikelompokkan sesuai parameter dan dihitung persentase kehadirannya.

Contoh Request Body:

{
  "start_date": "2025-11-01",
  "end_date": "2025-11-30",
  "group_by": "kelas"
}


Contoh Response:

{
  "status": "success",
  "data": {
    "analysis_period": {
      "start_date": "2025-11-01",
      "end_date": "2025-11-30"
    },
    "grouped_analysis": [
      {
        "group": "Kelas XI RPL 1",
        "total_users": 2,
        "attendance_rate": {
          "hadir_percentage": 90,
          "izin_percentage": 5,
          "sakit_percentage": 5,
          "alpa_percentage": 0
        }
      }
    ]
  }
}

**SS an result:**  

![Hasil No 4b](../latihan-ukl/no_4-b.png)
