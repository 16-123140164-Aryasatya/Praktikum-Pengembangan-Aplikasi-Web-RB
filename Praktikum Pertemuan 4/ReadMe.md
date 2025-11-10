# Program Pengelolaan Data Nilai Mahasiswa Menggunakan Python

Program Python sederhana untuk mengelola data nilai mahasiswa dengan fitur lengkap seperti perhitungan nilai akhir, penentuan grade, pencarian nilai tertinggi/terendah, dan statistik kelas.

## Deskripsi
Program ini dibuat untuk memenuhi tugas praktikum dengan fitur-fitur pengelolaan data mahasiswa yang mencakup:
- Penyimpanan data mahasiswa (nama, NIM, nilai UTS, UAS, dan Tugas)
- Perhitungan nilai akhir otomatis
- Penentuan grade berdasarkan nilai
- Pencarian mahasiswa dengan nilai tertinggi dan terendah
- Filter mahasiswa berdasarkan grade
- Perhitungan rata-rata nilai kelas

## Fitur dan Penggunaan

### Menu Utama
Program memiliki 6 menu pilihan:

#### 1. Tampilkan Semua Data
![Dashboard Utama](screenshots/tampilkan_semua_data.png)
Menampilkan tabel lengkap semua mahasiswa dengan:
- Nama
- NIM
- Nilai UTS
- Nilai UAS
- Nilai Tugas
- Nilai Akhir (otomatis dihitung)
- Grade (otomatis ditentukan)

#### 2. Cari Nilai Tertinggi & Terendah
![Dashboard Utama](screenshots/tinggi_rendah.png)
Menampilkan mahasiswa dengan nilai akhir tertinggi dan terendah beserta nilainya.

#### 3. Input Mahasiswa Baru
![Dashboard Utama](screenshots/input_mahasiswa.png)
Menambahkan data mahasiswa baru ke dalam sistem.

**Input yang diminta:**
- Nama lengkap
- NIM
- Nilai UTS (0-100)
- Nilai UAS (0-100)
- Nilai Tugas (0-100)

#### 4. Filter Berdasarkan Grade
![Dashboard Utama](screenshots/filter.png)
Menampilkan daftar mahasiswa yang memiliki grade tertentu (A/B/C/D/E).

#### 5. Hitung Rata-rata Kelas
![Dashboard Utama](screenshots/rata_rata.png)
Menghitung dan menampilkan rata-rata nilai akhir seluruh mahasiswa.

#### 6. Keluar
![Dashboard Utama](screenshots/keluar.png)
Mengakhiri program.

## Rumus dan Ketentuan

### Perhitungan Nilai Akhir
```
Nilai Akhir = (30% × UTS) + (40% × UAS) + (30% × Tugas)
```

### Ketentuan Grade
```
| Nilai Akhir | Grade |
|-------------|-------|
| ≥ 80        | A     |
| ≥ 70        | B     |
| ≥ 60        | C     |
| ≥ 50        | D     |
| < 50        | E     |
```

## Catatan Penting

- Program menggunakan struktur data list dan dictionary
- Data tersimpan sementara selama program berjalan (tidak persistent)
- Input nilai harus berupa angka (0-100)
- Program case-sensitive untuk input grade (gunakan huruf kapital)
- Semua perhitungan dilakukan secara otomatis

