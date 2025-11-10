# Program Pengelolaan Data Nilai Mahasiswa

# Data awal mahasiswa
data_mahasiswa = [
    {"nama": "Budi Santoso", "nim": "2301001", "nilai_uts": 85, "nilai_uas": 88, "nilai_tugas": 90},
    {"nama": "Siti Rahayu", "nim": "2301002", "nilai_uts": 78, "nilai_uas": 82, "nilai_tugas": 85},
    {"nama": "Ahmad Fauzi", "nim": "2301003", "nilai_uts": 65, "nilai_uas": 70, "nilai_tugas": 68},
    {"nama": "Dewi Kartika", "nim": "2301004", "nilai_uts": 92, "nilai_uas": 95, "nilai_tugas": 88},
    {"nama": "Eko Prasetyo", "nim": "2301005", "nilai_uts": 55, "nilai_uas": 60, "nilai_tugas": 58}
]

def hitung_nilai_akhir(mhs):
    """Menghitung nilai akhir: 30% UTS + 40% UAS + 30% Tugas"""
    return (mhs["nilai_uts"] * 0.3) + (mhs["nilai_uas"] * 0.4) + (mhs["nilai_tugas"] * 0.3)

def tentukan_grade(nilai):
    """Menentukan grade berdasarkan nilai akhir"""
    if nilai >= 80: return "A"
    elif nilai >= 70: return "B"
    elif nilai >= 60: return "C"
    elif nilai >= 50: return "D"
    else: return "E"

def tampilkan_tabel():
    """Menampilkan data mahasiswa dalam format tabel"""
    print("\n" + "="*95)
    print(f"{'Nama':<20} {'NIM':<10} {'UTS':<5} {'UAS':<5} {'Tugas':<6} {'Akhir':<6} {'Grade':<5}")
    print("="*95)
    for mhs in data_mahasiswa:
        nilai_akhir = hitung_nilai_akhir(mhs)
        grade = tentukan_grade(nilai_akhir)
        print(f"{mhs['nama']:<20} {mhs['nim']:<10} {mhs['nilai_uts']:<5} {mhs['nilai_uas']:<5} "
              f"{mhs['nilai_tugas']:<6} {nilai_akhir:<6.2f} {grade:<5}")
    print("="*95)

def cari_nilai_tertinggi():
    """Mencari mahasiswa dengan nilai tertinggi"""
    mhs_terbaik = max(data_mahasiswa, key=hitung_nilai_akhir)
    nilai = hitung_nilai_akhir(mhs_terbaik)
    print(f"\nNilai Tertinggi: {mhs_terbaik['nama']} ({nilai:.2f})")

def cari_nilai_terendah():
    """Mencari mahasiswa dengan nilai terendah"""
    mhs_terendah = min(data_mahasiswa, key=hitung_nilai_akhir)
    nilai = hitung_nilai_akhir(mhs_terendah)
    print(f"Nilai Terendah: {mhs_terendah['nama']} ({nilai:.2f})")

def input_mahasiswa_baru():
    """Input data mahasiswa baru"""
    print("\n=== Input Data Mahasiswa Baru ===")
    nama = input("Nama: ")
    nim = input("NIM: ")
    nilai_uts = int(input("Nilai UTS: "))
    nilai_uas = int(input("Nilai UAS: "))
    nilai_tugas = int(input("Nilai Tugas: "))
    
    data_mahasiswa.append({
        "nama": nama, "nim": nim, "nilai_uts": nilai_uts,
        "nilai_uas": nilai_uas, "nilai_tugas": nilai_tugas
    })
    print("Data berhasil ditambahkan!")

def filter_berdasarkan_grade():
    """Filter mahasiswa berdasarkan grade"""
    grade_cari = input("\nMasukkan grade yang dicari (A/B/C/D/E): ").upper()
    print(f"\nMahasiswa dengan Grade {grade_cari}:")
    print("-" * 40)
    found = False
    for mhs in data_mahasiswa:
        nilai_akhir = hitung_nilai_akhir(mhs)
        grade = tentukan_grade(nilai_akhir)
        if grade == grade_cari:
            print(f"- {mhs['nama']} ({mhs['nim']}) - Nilai: {nilai_akhir:.2f}")
            found = True
    if not found:
        print(f"Tidak ada mahasiswa dengan grade {grade_cari}")

def hitung_rata_rata_kelas():
    """Menghitung rata-rata nilai kelas"""
    total = sum(hitung_nilai_akhir(mhs) for mhs in data_mahasiswa)
    rata_rata = total / len(data_mahasiswa)
    print(f"\nRata-rata Nilai Kelas: {rata_rata:.2f}")

def menu_utama():
    """Menu utama program"""
    while True:
        print("\n" + "="*50)
        print("PROGRAM PENGELOLAAN DATA NILAI MAHASISWA")
        print("="*50)
        print("1. Tampilkan Semua Data")
        print("2. Cari Nilai Tertinggi & Terendah")
        print("3. Input Mahasiswa Baru")
        print("4. Filter Berdasarkan Grade")
        print("5. Hitung Rata-rata Kelas")
        print("6. Keluar")
        print("="*50)
        
        pilihan = input("Pilih menu (1-6): ")
        
        if pilihan == "1":
            tampilkan_tabel()
        elif pilihan == "2":
            cari_nilai_tertinggi()
            cari_nilai_terendah()
        elif pilihan == "3":
            input_mahasiswa_baru()
        elif pilihan == "4":
            filter_berdasarkan_grade()
        elif pilihan == "5":
            hitung_rata_rata_kelas()
        elif pilihan == "6":
            print("\nTerima kasih! Program selesai.")
            break
        else:
            print("\nPilihan tidak valid!")

# Jalankan program
if __name__ == "__main__":
    menu_utama()