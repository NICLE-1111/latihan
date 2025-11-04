
📘 2a. Menambah Pengguna

Endpoint: POST /api/users
Deskripsi:
Digunakan untuk menambahkan data pengguna baru ke dalam sistem.

Fungsi & Cara Kerja:
-Client mengirimkan data pengguna (name, kelas, jabatan, password) melalui body request.
-Sistem menambahkan data tersebut ke dalam penyimpanan.
-Password terenkripsi dan tidak ditampilkan dalam response.

Contoh Response:

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

**SS an result:**  
![Hasil No 2a](../latihan-ukl/no_2-a.png)

📘 2b. Mengubah Data Pengguna

Endpoint: PUT /api/users/{id}
Deskripsi:
Digunakan untuk memperbarui data pengguna berdasarkan ID.

Fungsi & Cara Kerja:
-Client mengirimkan ID pengguna di URL dan data baru di body.
-Sistem mencari data pengguna sesuai ID.
-Jika ditemukan, datanya diperbarui dengan informasi terbaru.

Contoh Response:

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

**SS an result:**  
![Hasil No 2b](../latihan-ukl/no_2-b.png)

📘 2c. Mengambil Data Pengguna

Endpoint: GET /api/users/{id}
Deskripsi:
Digunakan untuk menampilkan data pengguna berdasarkan ID.

Fungsi & Cara Kerja:
-Client mengirimkan ID pengguna melalui URL.
-Sistem mencari pengguna dengan ID yang sesuai.
-Jika ditemukan, data pengguna dikembalikan tanpa menampilkan password.

Contoh Response:

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

**SS an result:**  
![Hasil No 2c](../latihan-ukl/no_2-c.png)

