---

# 🧾 Aplikasi Presensi Online (Restful API)

Proyek ini dibuat sebagai bagian dari **Uji Kenaikan Level (UKL) Kelas XI RPL**, dengan studi kasus **Aplikasi Presensi Online**.
Dibangun menggunakan **NestJS**, aplikasi ini menyediakan API untuk proses autentikasi, manajemen pengguna, dan pencatatan kehadiran.

---

## ⚙️ Teknologi yang Digunakan

* **Framework:** NestJS
* **Bahasa:** TypeScript
* **Autentikasi:** JWT (JSON Web Token)
* **Enkripsi Password:** bcrypt
* **Arsitektur:** Modular (Auth, Users, Attendance)

---

## 🧩 Struktur Modul

* **AuthModule** → Modul untuk login dan token JWT
* **UsersModule** → Modul CRUD data pengguna
* **AttendanceModule** → Modul pencatatan dan analisis kehadiran

---

## 📘 1. Autentikasi dan Otorisasi

**Endpoint:** `POST /api/auth/login`
**Deskripsi:**
Melakukan login pengguna dan menghasilkan **token JWT** yang digunakan pada endpoint lainnya.

**Cara Kerja:**

* Pengguna mengirimkan `username` dan `password` ke endpoint.
* Sistem memvalidasi kecocokan username dan password (contoh: username `tuan`, password `12345`).
* Jika valid, server mengembalikan token JWT yang berlaku selama 1 hari.

**Contoh Response:**

```json
{
  "status": "success",
  "message": "Login berhasil",
  "token": "<JWT_TOKEN>"
}
```

**SS hasil:**
![Hasil No 1](../latihan-ukl/no_1.png)

---

## 📘 2a. Menambah Pengguna

**Endpoint:** `POST /api/users`
**Deskripsi:**
Menambahkan data pengguna baru ke dalam sistem.

**Cara Kerja:**

* Client mengirimkan data pengguna (`name`, `kelas`, `jabatan`, `password`) melalui body request.
* Sistem menyimpan data tersebut, dengan password terenkripsi.
* Password tidak ditampilkan dalam response.

**Contoh Response:**

```json
{
  "status": "success",
  "message": "Pengguna berhasil ditambahkan",
  "data": {
    "id": 1,
    "name": "Budi",
    "kelas": "XI RPL",
    "jabatan": "Siswa"
  }
}
```

**SS hasil:**
![Hasil No 2a](../latihan-ukl/no_2-a.png)

---

## 📘 2b. Mengubah Data Pengguna

**Endpoint:** `PUT /api/users/{id}`
**Deskripsi:**
Memperbarui data pengguna berdasarkan ID.

**Cara Kerja:**

* Client mengirimkan ID pengguna di URL dan data baru di body request.
* Sistem mencari data pengguna sesuai ID.
* Jika ditemukan, data diperbarui.

**Contoh Response:**

```json
{
  "status": "success",
  "message": "Data pengguna berhasil diperbarui",
  "data": {
    "id": 1,
    "name": "Budi Santoso",
    "kelas": "XI RPL",
    "jabatan": "Ketua Kelas"
  }
}
```

**SS hasil:**
![Hasil No 2b](../latihan-ukl/no_2-b.png)

---

## 📘 2c. Mengambil Data Pengguna

**Endpoint:** `GET /api/users/{id}`
**Deskripsi:**
Menampilkan data pengguna berdasarkan ID.

**Cara Kerja:**

* Client mengirimkan ID pengguna melalui URL.
* Sistem mencari pengguna dengan ID tersebut.
* Jika ditemukan, data dikembalikan tanpa menampilkan password.

**Contoh Response:**

```json
{
  "status": "success",
  "message": "Data pengguna berhasil diambil",
  "data": {
    "id": 1,
    "name": "Budi Santoso",
    "kelas": "XI RPL",
    "jabatan": "Ketua Kelas"
  }
}
```

**SS hasil:**
![Hasil No 2c](../latihan-ukl/no_2-c.png)

---

## 📘 3a. Melakukan Presensi

**Endpoint:** `POST /api/attendance`
**Deskripsi:**
Mencatat kehadiran pengguna pada hari tertentu.

**Cara Kerja:**

* Client mengirimkan `user_id`, `date`, `time`, dan `status` (hadir/izin/sakit/alpa).
* Sistem menyimpan data ke daftar kehadiran.
* Data dikembalikan sebagai bukti presensi berhasil dicatat.

**Contoh Response:**

```json
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
```

**SS hasil:**
![Hasil No 3a](../latihan-ukl/no_3-a.png)

---

## 📘 3b. Melihat Riwayat Presensi

**Endpoint:** `GET /api/attendance/history/{user_id}`
**Deskripsi:**
Melihat seluruh riwayat presensi berdasarkan ID pengguna.

**Cara Kerja:**

* Client mengirimkan `user_id` melalui URL.
* Sistem memfilter data presensi sesuai ID.
* Data dikembalikan dalam bentuk array riwayat kehadiran.

**Contoh Response:**

```json
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
```

**SS hasil:**
![Hasil No 3b](../latihan-ukl/no_3-b.png)

---

## 📘 4a. Rekap Kehadiran Bulanan

**Endpoint:** `GET /api/attendance/summary/{user_id}`
**Deskripsi:**
Menampilkan rekap jumlah kehadiran per bulan berdasarkan ID pengguna.

**Cara Kerja:**

* Sistem menghitung total `hadir`, `izin`, `sakit`, dan `alpa` untuk pengguna.
* Rekap disusun berdasarkan bulan aktif.
* Data dikembalikan dalam format JSON.

**Contoh Response:**

```json
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
```

**SS hasil:**
![Hasil No 4a](../latihan-ukl/no_4-a.png)

---

## 📘 4b. Analisis Kehadiran Berdasarkan Parameter

**Endpoint:** `POST /api/attendance/analysis`
**Deskripsi:**
Menganalisis tingkat kehadiran pengguna berdasarkan periode waktu dan kategori (kelas atau jabatan).

**Cara Kerja:**

* Client mengirimkan `start_date`, `end_date`, dan `group_by` (kelas/jabatan).
* Sistem memfilter data presensi sesuai rentang waktu.
* Data dikelompokkan berdasarkan parameter, lalu dihitung persentase kehadiran.

**Contoh Request Body:**

```json
{
  "start_date": "2025-11-01",
  "end_date": "2025-11-30",
  "group_by": "kelas"
}
```

**Contoh Response:**

```json
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
```

**SS hasil:**
![Hasil No 4b](../latihan-ukl/no_4-b.png)

---


