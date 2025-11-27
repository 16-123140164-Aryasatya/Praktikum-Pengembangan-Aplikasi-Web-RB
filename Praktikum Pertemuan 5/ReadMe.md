1. DESKRIPSI PROGRAM
------------------------------------------------------------------------
Program ini adalah aplikasi berbasis Command Line Interface (CLI) untuk 
mengelola sistem perpustakaan sederhana. Program ini dibangun menggunakan 
bahasa pemrograman Python dengan penerapan paradigma Object-Oriented 
Programming (OOP) secara menyeluruh.

Sistem ini memungkinkan pustakawan untuk mengelola berbagai jenis item 
koleksi (Buku, Majalah, dan DVD), melakukan transaksi peminjaman/
pengembalian, serta melacak status ketersediaan item secara real-time.

2. FITUR UTAMA
![Catatan](screenshots/Tambah_item.png)
1. Menambah Item Baru: Mendukung penambahan Buku, Majalah, dan DVD dengan
   atribut unik masing-masing.
![Catatan](screenshots/Tampilkan_item.png)
2. Menampilkan Koleksi: Melihat daftar seluruh item beserta statusnya 
   (Tersedia/Dipinjam).
![Catatan](screenshots/Pinjem_item.png)
![Catatan](screenshots/Kembalikan_item.png)
3. Transaksi:
   - Peminjaman: Mengubah status item menjadi dipinjam dan mencatat nama
     peminjam serta tanggal pinjam.
   - Pengembalian: Mengembalikan status item menjadi tersedia.
![Catatan](screenshots/Cari_item.png)
4. Pencarian: Mencari item berdasarkan Judul atau ID unik.
![Catatan](screenshots/Tampilkan_statistik.png)
5. Statistik: Melihat jumlah total item, item tersedia, dan item dipinjam.
6. Validasi Input: Memastikan data seperti judul tidak kosong menggunakan
   property decorator.

3. IMPLEMENTASI KONSEP OOP

A. Abstract Class (Kelas Abstrak)
   - Class `LibraryItem` bertindak sebagai blueprint.
   - Menggunakan modul `abc` (ABC, abstractmethod).
   - Method abstrak: `get_item_type()`, `get_details()`, `calculate_late_fee()`.

B. Inheritance (Pewarisan)
   - Class `Book`, `Magazine`, dan `DVD` mewarisi sifat dari `LibraryItem`.
   - Subclass memiliki atribut spesifik (contoh: ISBN untuk Buku, Sutradara
     untuk DVD).

C. Encapsulation (Enkapsulasi)
   - Access Modifiers:
     * Private (`__item_id`, `__isbn`): Hanya bisa diakses dalam class sendiri.
     * Protected (`_title`, `_year`): Bisa diakses oleh class turunan.
   - Property Decorator: Digunakan pada `title` untuk validasi input (setter)
     dan akses data (getter).

D. Polymorphism (Polimorfisme)
   - Method Overriding: Setiap subclass (`Book`, `Magazine`, `DVD`) memiliki
     implementasi berbeda untuk method `get_details()`, `__str__()`, dan
     perhitungan denda `calculate_late_fee()`.


4. CARA MENJALANKAN PROGRAM
1. Pastikan Python 3.x sudah terinstal di komputer.
2. Simpan kode program dalam file bernama `library_system.py`.
3. Buka terminal atau CMD.
4. Jalankan perintah: python library_system.py
5. Ikuti menu interaktif yang muncul di layar.

6. HASIL RUNNING PROGRAM (SCREENSHOT)
1. Tampilan Menu Utama.
2. Proses penambahan Buku dan DVD.
3. Proses peminjaman item yang berhasil.
4. Tampilan "Tampilkan Semua Item" yang menunjukkan status "Dipinjam".

========================================================================
Dibuat oleh: Aryasatya Widyatna Akbar
NIM: 123140164
========================================================================