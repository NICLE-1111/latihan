# 🧾 Aplikasi Presensi Online (Restful API)

Proyek ini dibuat sebagai bagian dari **Uji Kenaikan Level (UKL) Kelas XI RPL**, dengan studi kasus **Aplikasi Presensi Online**.  
Dibangun menggunakan **NestJS**, aplikasi ini menyediakan API untuk proses autentikasi, manajemen pengguna, dan pencatatan kehadiran.

---

## ⚙️ Teknologi yang Digunakan
- **Framework:** NestJS  
- **Bahasa:** TypeScript  
- **Autentikasi:** JWT (JSON Web Token)  
- **Enkripsi Password:** bcrypt  
- **Arsitektur:** Modular (Auth, Users, Attendance)

---

## 🧩 Struktur Modul
- `AuthModule` → Modul untuk login dan token JWT  
- `UsersModule` → Modul CRUD data pengguna  
- `AttendanceModule` → Modul pencatatan dan analisis kehadiran  

---

## 📘 1. Autentikasi dan Otorisasi

**Endpoint:** `POST /api/auth/login`  
**Deskripsi:**  
Digunakan untuk melakukan login pengguna dan menghasilkan **token JWT** yang digunakan pada endpoint lainnya.

### Fungsi & Cara Kerja:
- Pengguna mengirimkan `username` dan `password` ke endpoint.
- Sistem akan memvalidasi kecocokan username dan password (dalam kode contoh: username `tuan`, password `12345`).
- Jika valid, server mengembalikan token JWT yang berlaku selama 1 hari.

**Contoh Response:**
```json
{
  "status": "success",
  "message": "Login berhasil",
  "token": "<JWT_TOKEN>"
}

**SS an result:**  
![Hasil No 1](../latihan-ukl/no_1.png)


![Hasil No 4b](../latihan-ukl/no_4-b.png)
