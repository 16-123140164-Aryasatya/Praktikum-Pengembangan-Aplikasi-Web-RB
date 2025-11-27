"""
Sistem Manajemen Perpustakaan Sederhana
Implementasi konsep OOP: Abstract Class, Inheritance, Encapsulation, Polymorphism
"""

from abc import ABC, abstractmethod
from datetime import datetime
from typing import List, Optional


# ==================== ABSTRACT BASE CLASS ====================
class LibraryItem(ABC):
    """
    Abstract base class untuk semua item di perpustakaan.
    Menerapkan konsep abstraction dan encapsulation.
    """
    
    def __init__(self, item_id: str, title: str, year: int):
        self.__item_id = item_id  # Private
        self._title = title       # Protected
        self._year = year
        self._is_available = True
        self._borrowed_by = None
        self._borrow_date = None
    
    @property
    def item_id(self) -> str:
        return self.__item_id
    
    @property
    def title(self) -> str:
        return self._title
    
    @title.setter
    def title(self, value: str):
        if not value or not value.strip():
            raise ValueError("Judul tidak boleh kosong")
        self._title = value.strip()
    
    @property
    def year(self) -> int:
        return self._year
    
    @property
    def is_available(self) -> bool:
        return self._is_available

    @abstractmethod
    def get_item_type(self) -> str:
        pass
    
    @abstractmethod
    def get_details(self) -> str:
        pass
    
    @abstractmethod
    def calculate_late_fee(self, days_late: int) -> float:
        pass
    
    def borrow(self, borrower_name: str) -> bool:
        if not self._is_available:
            return False
        self._is_available = False
        self._borrowed_by = borrower_name
        self._borrow_date = datetime.now()
        return True
    
    def return_item(self) -> bool:
        if self._is_available:
            return False
        self._is_available = True
        self._borrowed_by = None
        self._borrow_date = None
        return True
    
    def get_status(self) -> str:
        if self._is_available:
            return "Tersedia"
        else:
            days = (datetime.now() - self._borrow_date).days
            return f"Dipinjam oleh {self._borrowed_by} ({days} hari)"
    
    def __str__(self) -> str:
        return f"[{self.item_id}] {self.title} ({self.year}) - {self.get_status()}"


# ==================== BOOK ====================
class Book(LibraryItem):
    def __init__(self, item_id: str, title: str, year: int, author: str, isbn: str, pages: int):
        super().__init__(item_id, title, year)
        self._author = author
        self.__isbn = isbn
        self._pages = pages
    
    @property
    def author(self) -> str:
        return self._author
    
    @property
    def isbn(self) -> str:
        return self.__isbn
    
    @property
    def pages(self) -> int:
        return self._pages
    
    def get_item_type(self) -> str:
        return "Buku"
    
    def get_details(self) -> str:
        return (f"Tipe: Buku\n"
                f"ID: {self.item_id}\n"
                f"Judul: {self.title}\n"
                f"Penulis: {self.author}\n"
                f"ISBN: {self.isbn}\n"
                f"Tahun: {self.year}\n"
                f"Halaman: {self.pages}\n"
                f"Status: {self.get_status()}")
    
    def calculate_late_fee(self, days_late: int) -> float:
        return days_late * 2000
    
    def __str__(self) -> str:
        return f"[Buku] {super().__str__()} | Penulis: {self.author}"


# ==================== MAGAZINE ====================
class Magazine(LibraryItem):
    def __init__(self, item_id: str, title: str, year: int, publisher: str, edition: str, month: str):
        super().__init__(item_id, title, year)
        self._publisher = publisher
        self.__edition = edition
        self._month = month
    
    def get_item_type(self) -> str:
        return "Majalah"
    
    def get_details(self) -> str:
        return (f"Tipe: Majalah\n"
                f"ID: {self.item_id}\n"
                f"Judul: {self.title}\n"
                f"Penerbit: {self._publisher}\n"
                f"Edisi: {self.__edition}\n"
                f"Bulan: {self._month}\n"
                f"Tahun: {self.year}\n"
                f"Status: {self.get_status()}")
    
    def calculate_late_fee(self, days_late: int) -> float:
        return days_late * 1000
    
    def __str__(self) -> str:
        return f"[Majalah] {super().__str__()} | Edisi: {self.__edition} ({self._month} {self.year})"


# ==================== DVD ====================
class DVD(LibraryItem):
    def __init__(self, item_id: str, title: str, year: int, director: str, duration: int, genre: str):
        super().__init__(item_id, title, year)
        self._director = director
        self.__duration = duration
        self._genre = genre
    
    def get_item_type(self) -> str:
        return "DVD"
    
    def get_details(self) -> str:
        return (f"Tipe: DVD\n"
                f"ID: {self.item_id}\n"
                f"Judul: {self.title}\n"
                f"Sutradara: {self._director}\n"
                f"Genre: {self._genre}\n"
                f"Durasi: {self.__duration} menit\n"
                f"Tahun: {self.year}\n"
                f"Status: {self.get_status()}")
    
    def calculate_late_fee(self, days_late: int) -> float:
        return days_late * 3000
    
    def __str__(self) -> str:
        return f"[DVD] {super().__str__()} | Sutradara: {self._director} | {self.__duration} menit"


# ==================== LIBRARY ====================
class Library:
    def __init__(self, name: str):
        self.__name = name
        self.__items: List[LibraryItem] = []
    
    @property
    def name(self) -> str:
        return self.__name
    
    def add_item(self, item: LibraryItem):
        self.__items.append(item)
        print(f"✓ Item '{item.title}' berhasil ditambahkan!")
    
    def remove_item(self, item_id: str) -> bool:
        for item in self.__items:
            if item.item_id == item_id:
                self.__items.remove(item)
                print("✓ Item berhasil dihapus!")
                return True
        print("✗ Item tidak ditemukan.")
        return False
    
    def display_all_items(self):
        if not self.__items:
            print("Tidak ada item dalam perpustakaan.")
            return
        print("\n=== DAFTAR ITEM ===")
        for item in self.__items:
            print(item)
    
    def search_by_title(self, title: str):
        title = title.lower()
        for item in self.__items:
            if title in item.title.lower():
                return item
        return None
    
    def search_by_id(self, item_id: str):
        for item in self.__items:
            if item.item_id == item_id:
                return item
        return None
    
    def display_statistics(self):
        print("\n=== STATISTIK PERPUSTAKAAN ===")
        print(f"Total Item: {len(self.__items)}")
        available = len([i for i in self.__items if i.is_available])
        borrowed = len(self.__items) - available
        print(f"Tersedia: {available}")
        print(f"Dipinjam: {borrowed}")


# ==================== MAIN (INTERAKTIF) ====================
def main():
    library = Library("Perpustakaan Institut Teknologi Sumatera")

    while True:
        print("\n" + "="*70)
        print(" SISTEM MANAJEMEN PERPUSTAKAAN (INTERAKTIF) ")
        print("="*70)
        print("1. Tambah Item")
        print("2. Tampilkan Semua Item")
        print("3. Pinjam Item")
        print("4. Kembalikan Item")
        print("5. Cari Item")
        print("6. Tampilkan Statistik")
        print("7. Hapus Item")
        print("0. Keluar")
        print("="*70)

        choice = input("Pilih menu: ").strip()

        # Tambah Item
        if choice == "1":
            print("\nTambah Item Baru:")
            print("1. Buku\n2. Majalah\n3. DVD")
            tipe = input("Pilih tipe: ")

            item_id = input("ID item: ")
            title = input("Judul: ")
            year = int(input("Tahun: "))

            if tipe == "1":
                author = input("Penulis: ")
                isbn = input("ISBN: ")
                pages = int(input("Jumlah halaman: "))
                item = Book(item_id, title, year, author, isbn, pages)

            elif tipe == "2":
                publisher = input("Penerbit: ")
                edition = input("Edisi: ")
                month = input("Bulan: ")
                item = Magazine(item_id, title, year, publisher, edition, month)

            elif tipe == "3":
                director = input("Sutradara: ")
                duration = int(input("Durasi: "))
                genre = input("Genre: ")
                item = DVD(item_id, title, year, director, duration, genre)

            else:
                print("✗ Tipe tidak valid.")
                continue

            library.add_item(item)

        # Tampilkan semua item
        elif choice == "2":
            library.display_all_items()

        # Pinjam item
        elif choice == "3":
            item_id = input("Masukkan ID item: ")
            borrower = input("Nama peminjam: ")
            item = library.search_by_id(item_id)
            if item:
                if item.borrow(borrower):
                    print(f"✓ '{item.title}' berhasil dipinjam.")
                else:
                    print("✗ Item sedang tidak tersedia.")
            else:
                print("✗ Item tidak ditemukan.")

        # Kembalikan item
        elif choice == "4":
            item_id = input("Masukkan ID item: ")
            item = library.search_by_id(item_id)
            if item:
                if item.return_item():
                    print(f"✓ '{item.title}' berhasil dikembalikan.")
                else:
                    print("✗ Item belum dipinjam.")
            else:
                print("✗ Item tidak ditemukan.")

        # Cari item
        elif choice == "5":
            keyword = input("Masukkan judul atau ID: ")
            item = library.search_by_id(keyword)
            if not item:
                item = library.search_by_title(keyword)
            if item:
                print("\n=== Hasil Pencarian ===")
                print(item.get_details())
            else:
                print("✗ Tidak ditemukan.")

        # Statistik
        elif choice == "6":
            library.display_statistics()

        # Hapus Item
        elif choice == "7":
            item_id = input("Masukkan ID item yang ingin dihapus: ")
            library.remove_item(item_id)

        # Keluar
        elif choice == "0":
            print("\nProgram selesai. Terima kasih!\n")
            break

        else:
            print("Pilihan tidak valid!")


if __name__ == "__main__":
    main()
