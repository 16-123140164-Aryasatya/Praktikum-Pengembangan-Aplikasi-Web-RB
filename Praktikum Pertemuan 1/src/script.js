// Variabel 
let daftarTugas = [];
let idTugasDiedit = null;

// Muat tugas dari localStorage 
function muatTugas() {
    const tugasTersimpan = localStorage.getItem('daftarTugas');
    if (tugasTersimpan) {
        daftarTugas = JSON.parse(tugasTersimpan);
    }
    tampilkanTugas();
    perbaruiStatistik();
    perbaruiFilterMataKuliah();
}

// Simpan tugas ke localStorage
function simpanKeStorage() {
    localStorage.setItem('daftarTugas', JSON.stringify(daftarTugas));
}

// Tampilkan form tambah
function tampilkanFormTambah() {
    idTugasDiedit = null;
    document.getElementById('judulForm').textContent = 'Tambah Tugas Baru';
    document.getElementById('namaTugas').value = '';
    document.getElementById('mataKuliahTugas').value = '';
    document.getElementById('deadlineTugas').value = '';
    hapusError();
    document.getElementById('modalForm').classList.remove('hidden');
}

// Tampilkan form edit
function editTugas(id) {
    const tugas = daftarTugas.find(t => t.id === id);
    if (tugas) {
        idTugasDiedit = id;
        document.getElementById('judulForm').textContent = 'Edit Tugas';
        document.getElementById('namaTugas').value = tugas.nama;
        document.getElementById('mataKuliahTugas').value = tugas.mataKuliah;
        document.getElementById('deadlineTugas').value = tugas.deadline;
        hapusError();
        document.getElementById('modalForm').classList.remove('hidden');
    }
}

// Tutup form
function tutupForm() {
    document.getElementById('modalForm').classList.add('hidden');
    idTugasDiedit = null;
    hapusError();
}

// Hapus pesan error
function hapusError() {
    document.getElementById('errorNama').classList.add('hidden');
    document.getElementById('errorMataKuliah').classList.add('hidden');
    document.getElementById('errorDeadline').classList.add('hidden');
    document.getElementById('namaTugas').classList.remove('border-red-500');
    document.getElementById('mataKuliahTugas').classList.remove('border-red-500');
    document.getElementById('deadlineTugas').classList.remove('border-red-500');
}

// Validasi form
function validasiForm() {
    hapusError();
    let valid = true;

    const nama = document.getElementById('namaTugas').value.trim();
    const mataKuliah = document.getElementById('mataKuliahTugas').value;
    const deadline = document.getElementById('deadlineTugas').value;

    if (!nama) {
        document.getElementById('errorNama').classList.remove('hidden');
        document.getElementById('namaTugas').classList.add('border-red-500');
        valid = false;
    }

    if (!mataKuliah) {
        document.getElementById('errorMataKuliah').classList.remove('hidden');
        document.getElementById('mataKuliahTugas').classList.add('border-red-500');
        valid = false;
    }

    if (!deadline) {
        document.getElementById('errorDeadline').classList.remove('hidden');
        document.getElementById('deadlineTugas').classList.add('border-red-500');
        valid = false;
    } else {
        const tanggalDipilih = new Date(deadline);
        const hariIni = new Date();
        hariIni.setHours(0, 0, 0, 0);
        
        if (tanggalDipilih < hariIni) {
            document.getElementById('errorDeadline').classList.remove('hidden');
            document.getElementById('deadlineTugas').classList.add('border-red-500');
            valid = false;
        }
    }

    return valid;
}

// Simpan tugas
function simpanTugas() {
    if (!validasiForm()) {
        return;
    }

    const nama = document.getElementById('namaTugas').value.trim();
    const mataKuliah = document.getElementById('mataKuliahTugas').value;
    const deadline = document.getElementById('deadlineTugas').value;

    if (idTugasDiedit) {
        // Perbarui tugas yang ada
        const indeks = daftarTugas.findIndex(t => t.id === idTugasDiedit);
        if (indeks !== -1) {
            daftarTugas[indeks] = {
                ...daftarTugas[indeks],
                nama,
                mataKuliah,
                deadline
            };
        }
    } else {
        // Tambah tugas baru
        const tugasBaru = {
            id: Date.now(),
            nama,
            mataKuliah,
            deadline,
            selesai: false,
            dibuatPada: new Date().toISOString()
        };
        daftarTugas.push(tugasBaru);
    }

    simpanKeStorage();
    tampilkanTugas();
    perbaruiStatistik();
    perbaruiFilterMataKuliah();
    tutupForm();
}

// Tombol status selesai tugas
function toggleSelesai(id) {
    const tugas = daftarTugas.find(t => t.id === id);
    if (tugas) {
        tugas.selesai = !tugas.selesai;
        simpanKeStorage();
        tampilkanTugas();
        perbaruiStatistik();
    }
}

// Hapus tugas
function hapusTugas(id) {
    if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
        daftarTugas = daftarTugas.filter(t => t.id !== id);
        simpanKeStorage();
        tampilkanTugas();
        perbaruiStatistik();
        perbaruiFilterMataKuliah();
    }
}

// Format tanggal
function formatTanggal(stringTanggal) {
    const tanggal = new Date(stringTanggal);
    return tanggal.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
}

// Cek deadline yang sudah dekat (dalam 3 hari)
function deadlineDekat(stringTanggal) {
    const deadline = new Date(stringTanggal);
    const hariIni = new Date();
    const selisihWaktu = deadline - hariIni;
    const selisihHari = Math.ceil(selisihWaktu / (1000 * 60 * 60 * 24));
    return selisihHari <= 3 && selisihHari >= 0;
}

// Filter tugas
function dapatkanTugasTerfilter() {
    const kataKunci = document.getElementById('inputPencarian').value.toLowerCase();
    const filterStatus = document.getElementById('filterStatus').value;
    const filterMataKuliah = document.getElementById('filterMataKuliah').value;

    return daftarTugas.filter(tugas => {
        const cocokPencarian = tugas.nama.toLowerCase().includes(kataKunci) ||
                              tugas.mataKuliah.toLowerCase().includes(kataKunci);
        const cocokStatus = filterStatus === 'semua' || 
                           (filterStatus === 'selesai' && tugas.selesai) ||
                           (filterStatus === 'belumSelesai' && !tugas.selesai);
        const cocokMataKuliah = filterMataKuliah === 'semua' || tugas.mataKuliah === filterMataKuliah;
        
        return cocokPencarian && cocokStatus && cocokMataKuliah;
    });
}

// Tampilkan tugas
function tampilkanTugas() {
    const tugasTerfilter = dapatkanTugasTerfilter();
    const elemenDaftarTugas = document.getElementById('daftarTugas');
    document.getElementById('jumlahTugas').textContent = `(${tugasTerfilter.length})`;

    if (tugasTerfilter.length === 0) {
        elemenDaftarTugas.innerHTML = `
            <div class="text-center py-12">
                <p class="text-gray-500 text-lg">
                    ${daftarTugas.length === 0 
                        ? 'Belum ada tugas. Tambahkan tugas pertama Anda!' 
                        : 'Tidak ada tugas yang sesuai dengan filter.'}
                </p>
            </div>
        `;
        return;
    }

    elemenDaftarTugas.innerHTML = tugasTerfilter.map(tugas => `
        <div class="item-tugas border rounded-xl p-4 transition-all hover:shadow-md mb-3 ${
            tugas.selesai ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
        }">
            <div class="flex items-start gap-3">
                <button onclick="toggleSelesai(${tugas.id})" class="mt-1 flex-shrink-0 text-2xl">
                    ${tugas.selesai ? '✅' : '⭕'}
                </button>

                <div class="flex-1">
                    <h3 class="font-semibold text-lg ${
                        tugas.selesai ? 'line-through text-gray-500' : 'text-gray-800'
                    }">
                        ${tugas.nama}
                    </h3>
                    
                    <div class="flex flex-wrap gap-2 mt-2">
                        <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                            ${tugas.mataKuliah}
                        </span>
                        <span class="px-3 py-1 rounded-full text-sm font-medium ${
                            deadlineDekat(tugas.deadline) && !tugas.selesai
                                ? 'bg-red-100 text-red-700'
                                : 'bg-gray-100 text-gray-700'
                        }">
                            Deadline ${formatTanggal(tugas.deadline)}
                        </span>
                    </div>
                </div>

                <div class="flex gap-2">
                    <button onclick="editTugas(${tugas.id})" 
                            class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit tugas">
                        Edit
                    </button>
                    <button onclick="hapusTugas(${tugas.id})" 
                            class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus tugas">
                        Hapus
                    </button>
                </div>
            </div>

            ${deadlineDekat(tugas.deadline) && !tugas.selesai ? `
                <div class="mt-2 ml-9 text-sm text-red-600 flex items-center gap-1">
                    Deadline segera! Selesaikan tugas ini
                </div>
            ` : ''}
        </div>
    `).join('');
}

// Perbarui statistik
function perbaruiStatistik() {
    const total = daftarTugas.length;
    const selesai = daftarTugas.filter(t => t.selesai).length;
    const belumSelesai = total - selesai;

    document.getElementById('totalTugas').textContent = total;
    document.getElementById('tugasSelesai').textContent = selesai;
    document.getElementById('tugasBelumSelesai').textContent = belumSelesai;
}

// Perbarui pilihan filter mata kuliah
function perbaruiFilterMataKuliah() {
    const semuaMataKuliah = [
        'Pemrograman Aplikasi Web',
        'Prak. Pemroraman Aplikasi Web',
        'Jaringan Komputer',
        'Prak. Jaringan Komputer',
        'Sistem Informasi',
        'Metopen',
        'Inteligensi Buatan',
        'Desain Interaksi',
        'MPTI',
        'Kapita Selekta',
        'Studuim General'
    ];
    
    const filterMataKuliah = document.getElementById('filterMataKuliah');
    const nilaiSekarang = filterMataKuliah.value;
    
    filterMataKuliah.innerHTML = '<option value="semua">Semua Mata Kuliah</option>' +
        semuaMataKuliah.map(mataKuliah => 
            `<option value="${mataKuliah}">${mataKuliah}</option>`
        ).join('');
    
    filterMataKuliah.value = nilaiSekarang;
}

// Event listener
document.getElementById('inputPencarian').addEventListener('input', tampilkanTugas);
document.getElementById('filterStatus').addEventListener('change', tampilkanTugas);
document.getElementById('filterMataKuliah').addEventListener('change', tampilkanTugas);

// Inisialisasi aplikasi
muatTugas();