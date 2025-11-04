

📘 3a. Melakukan Presensi

Endpoint: POST /api/attendance
Deskripsi:
Digunakan untuk mencatat kehadiran pengguna pada hari tertentu.

Fungsi & Cara Kerja:
-Client mengirimkan user_id, date, time, dan status (hadir/izin/sakit/alpa).
-Sistem menyimpan data tersebut ke daftar kehadiran.
-Data dikembalikan sebagai bukti presensi berhasil dicatat.

Contoh Response:

{
  "status": "success",
  "message": "Presensi berhasil dicatat",
  "data": {
    "attendance_id": 1,
    "user_id": 1,
    "date": "2025-11-01",
    "time": "08:00",
    "status": "hadir"
  }
}

**SS an result:**  
![Hasil No 3a](../latihan-ukl/no_3-a.png)

📘 3b. Melihat Riwayat Presensi

Endpoint: GET /api/attendance/history/{user_id}
Deskripsi:
Digunakan untuk melihat seluruh riwayat presensi berdasarkan ID pengguna.

Fungsi & Cara Kerja:
-Client mengirimkan user_id melalui URL.
-Sistem memfilter data presensi berdasarkan ID pengguna.
-Data dikembalikan dalam bentuk array riwayat kehadiran.

Contoh Response:

{
  "status": "success",
  "message": "Riwayat presensi berhasil diambil",
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "date": "2025-11-01",
      "time": "08:00",
      "status": "hadir"
    },
    {
      "id": 2,
      "user_id": 1,
      "date": "2025-11-02",
      "time": "08:00",
      "status": "hadir"
    }
  ]
}


![Hasil No 3b](../latihan-ukl/no_3-b.png)

