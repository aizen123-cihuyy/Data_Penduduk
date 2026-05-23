$(document).ready(function() {
    // ==================== DATA DUMMY ====================
    let wargaData = [
        { id: 1, nik: "3273010101010001", nama: "Ahmad Supriyadi", jk: "Laki-laki", tempat: "Bandung", tgl: "1990-05-15", alamat: "Jl. Raya No.12", rt: "001", rw: "002", nokk: "3273010001010001", status: "Kawin", pekerjaan: "Petani", foto: "https://randomuser.me/api/portraits/men/32.jpg" },
        { id: 2, nik: "3273010101010002", nama: "Siti Fatimah", jk: "Perempuan", tempat: "Bandung", tgl: "1992-08-22", alamat: "Jl. Raya No.12", rt: "001", rw: "002", nokk: "3273010001010001", status: "Kawin", pekerjaan: "IRT", foto: "https://randomuser.me/api/portraits/women/68.jpg" },
        { id: 3, nik: "3273010101010003", nama: "Bambang Setiawan", jk: "Laki-laki", tempat: "Jakarta", tgl: "1985-03-10", alamat: "Dusun Krajan", rt: "002", rw: "001", nokk: "3273010001010002", status: "Kawin", pekerjaan: "Wiraswasta", foto: "https://randomuser.me/api/portraits/men/45.jpg" },
        { id: 4, nik: "3273010101010004", nama: "Dewi Lestari", jk: "Perempuan", tempat: "Surabaya", tgl: "1995-12-01", alamat: "Dusun Krajan", rt: "002", rw: "001", nokk: "3273010001010002", status: "Belum Kawin", pekerjaan: "Guru", foto: "https://randomuser.me/api/portraits/women/44.jpg" }
    ];

    let kkData = [
        { id: 1, nomor: "3273010001010001", kepala: "Ahmad Supriyadi", alamat: "Jl. Raya No.12", rt: "001", rw: "002" },
        { id: 2, nomor: "3273010001010002", kepala: "Bambang Setiawan", alamat: "Dusun Krajan", rt: "002", rw: "001" }
    ];

    let meninggalData = [
        { id: 1, wargaId: 99, nik: "3273010101010099", nama: "Eko Prasetyo", jk: "Laki-laki", tglMeninggal: "2025-01-15", sebab: "Sakit Tua" }
    ];

    let disabilitasData = [
        { id: 1, wargaId: 4, nik: "3273010101010004", nama: "Dewi Lestari", jenis: "Fisik", tingkat: "Sedang", pendamping: "Bambang Setiawan" }
    ];

    let nextIdWarga = 5;
    let nextIdKK = 3;
    let nextIdMeninggal = 2;
    let nextIdDisabilitas = 2;

    let dataTables = {};

    // ==================== MOBILE SIDEBAR TOGGLE ====================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const sidebarClose = document.getElementById('sidebarClose');
    const mainContent = document.getElementById('mainContent');

    function closeSidebar() {
        sidebar.classList.remove('open');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openSidebar() {
        sidebar.classList.add('open');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', openSidebar);
    }
    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeSidebar);
    }
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeSidebar);
    }

    // Close sidebar saat resize ke desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            closeSidebar();
        }
    });

    // ==================== HELPER FUNCTIONS ====================
    function updateDate() {
        const now = new Date();
        $("#current-date").text(now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
        $("#laporan-periode").text(now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }));
        $("#tanggal-cetak").text(now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }));
    }

    function updateStats() {
        $("#stat-total-warga").text(wargaData.length);
        $("#stat-total-kk").text(kkData.length);
        $("#stat-total-meninggal").text(meninggalData.length);
        $("#stat-total-disabilitas").text(disabilitasData.length);
        
        $("#laporan-total-warga").text(wargaData.length);
        $("#laporan-kk").text(kkData.length);
        $("#laporan-meninggal").text(meninggalData.length);
        $("#laporan-disabilitas").text(disabilitasData.length);
        $("#laporan-laki").text(wargaData.filter(w => w.jk === "Laki-laki").length);
        $("#laporan-perempuan").text(wargaData.filter(w => w.jk === "Perempuan").length);
    }

    function renderWargaTable() {
        let html = '';
        wargaData.forEach((item, idx) => {
            const foto = item.foto || "https://randomuser.me/api/portraits/lego/1.jpg";
            html += `<tr>
                <td>${idx+1}</td>
                <td><img src="${foto}" width="40" height="40" class="rounded-circle object-fit-cover border"></td>
                <td>${item.nik}</td>
                <td class="fw-semibold">${item.nama}</td>
                <td>${item.jk}</td>
                <td>${item.tempat}, ${new Date(item.tgl).toLocaleDateString('id-ID')}</td>
                <td>${item.alamat}</td>
                <td>${item.status === 'Kawin' ? '<span class="badge-status bg-success bg-opacity-10 text-success">Kawin</span>' : '<span class="badge-status bg-warning bg-opacity-10 text-warning">' + item.status + '</span>'}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary rounded-circle edit-warga me-1" data-id="${item.id}"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-outline-danger rounded-circle delete-warga" data-id="${item.id}"><i class="bi bi-trash"></i></button>
                </td>
            </tr>`;
        });
        $("#warga-table-body").html(html);
        if (dataTables.warga) dataTables.warga.destroy();
        dataTables.warga = $("#table-warga").DataTable({ language: { url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/id.json" }, responsive: true, scrollX: true });
    }

    function renderKKTable() {
        let html = '';
        kkData.forEach((item, idx) => {
            const anggota = wargaData.filter(w => w.nokk === item.nomor).length;
            html += `<tr>
                <td>${idx+1}</td>
                <td>${item.nomor}</td>
                <td class="fw-semibold">${item.kepala}</td>
                <td>${item.alamat}</td>
                <td>${item.rt}/${item.rw}</td>
                <td><span class="badge bg-primary bg-opacity-10 text-primary">${anggota} org</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary rounded-circle edit-kk me-1" data-id="${item.id}"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-outline-danger rounded-circle delete-kk" data-id="${item.id}"><i class="bi bi-trash"></i></button>
                </td>
            </tr>`;
        });
        $("#kk-table-body").html(html);
        if (dataTables.kk) dataTables.kk.destroy();
        dataTables.kk = $("#table-kk").DataTable({ language: { url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/id.json" }, responsive: true, scrollX: true });
    }

    function renderMeninggalTable() {
        let html = '';
        meninggalData.forEach((item, idx) => {
            html += `<tr>
                <td>${idx+1}</td>
                <td>${item.nik}</td>
                <td class="fw-semibold">${item.nama}</td>
                <td>${item.jk}</td>
                <td>${new Date(item.tglMeninggal).toLocaleDateString('id-ID')}</td>
                <td>${item.sebab || '-'}</td>
                <td>
                    <button class="btn btn-sm btn-outline-danger rounded-circle delete-meninggal" data-id="${item.id}"><i class="bi bi-trash"></i></button>
                </td>
            </tr>`;
        });
        $("#meninggal-table-body").html(html);
        if (dataTables.meninggal) dataTables.meninggal.destroy();
        dataTables.meninggal = $("#table-meninggal").DataTable({ language: { url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/id.json" }, responsive: true, scrollX: true });
    }

    function renderDisabilitasTable() {
        let html = '';
        disabilitasData.forEach((item, idx) => {
            html += `<tr>
                <td>${idx+1}</td>
                <td>${item.nik}</td>
                <td class="fw-semibold">${item.nama}</td>
                <td>${item.jenis}</td>
                <td>${item.tingkat}</td>
                <td>${item.pendamping || '-'}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary rounded-circle edit-disabilitas me-1" data-id="${item.id}"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-outline-danger rounded-circle delete-disabilitas" data-id="${item.id}"><i class="bi bi-trash"></i></button>
                </td>
            </tr>`;
        });
        $("#disabilitas-table-body").html(html);
        if (dataTables.disabilitas) dataTables.disabilitas.destroy();
        dataTables.disabilitas = $("#table-disabilitas").DataTable({ language: { url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/id.json" }, responsive: true, scrollX: true });
    }

    function refreshAllTables() {
        renderWargaTable();
        renderKKTable();
        renderMeninggalTable();
        renderDisabilitasTable();
        updateStats();
        updateCharts();
        populateDropdowns();
    }

    function populateDropdowns() {
        let wargaOptions = '<option value="">Pilih Warga</option>';
        wargaData.forEach(w => { wargaOptions += `<option value="${w.id}" data-nik="${w.nik}" data-nama="${w.nama}" data-jk="${w.jk}">${w.nik} - ${w.nama}</option>`; });
        $("#meninggal-warga, #disabilitas-warga").html(wargaOptions);
        
        let kkOptions = '<option value="">Pilih No KK</option>';
        kkData.forEach(k => { kkOptions += `<option value="${k.nomor}">${k.nomor} - ${k.kepala}</option>`; });
        $("#warga-nokk").html(kkOptions);
        
        let kepalaOptions = '<option value="">Pilih Kepala Keluarga</option>';
        wargaData.forEach(w => { kepalaOptions += `<option value="${w.nama}" data-alamat="${w.alamat}" data-rt="${w.rt}" data-rw="${w.rw}">${w.nik} - ${w.nama}</option>`; });
        $("#kk-kepala").html(kepalaOptions);
        
        // Auto-fill alamat KK saat pilih kepala keluarga
        $("#kk-kepala").off('change').on('change', function() {
            let selected = $(this).find('option:selected');
            let alamat = selected.data('alamat');
            let rt = selected.data('rt');
            let rw = selected.data('rw');
            if (alamat) $("#kk-alamat").val(alamat);
            if (rt) $("#kk-rt").val(rt);
            if (rw) $("#kk-rw").val(rw);
        });
    }

    // ==================== CHARTS ====================
    let genderChart, ageChart;
    function updateCharts() {
        const laki = wargaData.filter(w => w.jk === "Laki-laki").length;
        const perempuan = wargaData.filter(w => w.jk === "Perempuan").length;
        
        const genderCtx = document.getElementById('genderChart')?.getContext('2d');
        if (genderCtx) {
            if (genderChart) genderChart.destroy();
            genderChart = new Chart(genderCtx, {
                type: 'doughnut',
                data: { labels: ['Laki-laki', 'Perempuan'], datasets: [{ data: [laki, perempuan], backgroundColor: ['#4f46e5', '#ec489a'], borderWidth: 0 }] },
                options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'bottom' } } }
            });
        }
        
        let anak = wargaData.filter(w => new Date().getFullYear() - new Date(w.tgl).getFullYear() < 15).length;
        let dewasa = wargaData.filter(w => { let u = new Date().getFullYear() - new Date(w.tgl).getFullYear(); return u >= 15 && u < 65; }).length;
        let lansia = wargaData.filter(w => new Date().getFullYear() - new Date(w.tgl).getFullYear() >= 65).length;
        
        const ageCtx = document.getElementById('ageChart')?.getContext('2d');
        if (ageCtx) {
            if (ageChart) ageChart.destroy();
            ageChart = new Chart(ageCtx, {
                type: 'bar',
                data: { labels: ['0-14 Thn', '15-64 Thn', '65+ Thn'], datasets: [{ data: [anak, dewasa, lansia], backgroundColor: '#4f46e5', borderRadius: 8 }] },
                options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } } }
            });
        }
    }

    // ==================== NAVIGATION ====================
    function showPage(pageId) {
        $(".page-content").removeClass("active");
        $(`#page-${pageId}`).addClass("active");
        $(".sidebar .nav-link").removeClass("active");
        $(`.sidebar .nav-link[data-page="${pageId}"]`).addClass("active");
        
        let titles = { dashboard: "Dashboard", warga: "Data Warga", kk: "Kartu Keluarga", meninggal: "Warga Meninggal", disabilitas: "Warga Disabilitas", laporan: "Laporan & Rekapitulasi" };
        $("#page-title").text(titles[pageId]);
        
        if (pageId === "dashboard") updateCharts();
        if (pageId === "laporan") updateStats();
        
        // Tutup sidebar di mobile setelah klik
        if (window.innerWidth <= 992) {
            closeSidebar();
        }
    }

    $(".sidebar .nav-link").click(function(e) {
        e.preventDefault();
        let page = $(this).data("page");
        showPage(page);
    });

    // ==================== CRUD WARGA ====================
    $("#saveWarga").click(function() {
        let id = $("#warga-id").val();
        let newData = {
            id: id ? parseInt(id) : nextIdWarga++,
            nik: $("#warga-nik").val(),
            nama: $("#warga-nama").val(),
            jk: $("#warga-jk").val(),
            tempat: $("#warga-tempat").val(),
            tgl: $("#warga-tgl").val(),
            alamat: $("#warga-alamat").val(),
            rt: $("#warga-rt").val(),
            rw: $("#warga-rw").val(),
            nokk: $("#warga-nokk").val(),
            status: $("#warga-status").val(),
            pekerjaan: $("#warga-pekerjaan").val(),
            foto: $("#warga-foto").val()
        };
        
        if (!newData.nik || !newData.nama || !newData.jk || !newData.tempat || !newData.tgl || !newData.alamat || !newData.nokk) {
            Swal.fire('Error', 'Harap lengkapi data yang bertanda *', 'error');
            return;
        }
        
        if (newData.nik.length !== 16) {
            Swal.fire('Error', 'NIK harus 16 digit angka', 'error');
            return;
        }
        
        if (id) {
            let index = wargaData.findIndex(w => w.id == id);
            if (index !== -1) wargaData[index] = newData;
            Swal.fire('Berhasil', 'Data warga diperbarui', 'success');
        } else {
            wargaData.push(newData);
            Swal.fire('Berhasil', 'Warga baru ditambahkan', 'success');
        }
        
        $("#modalWarga").modal("hide");
        refreshAllTables();
        $("#formWarga")[0].reset();
        $("#warga-id").val("");
    });

    $(document).on("click", ".edit-warga", function() {
        let id = $(this).data("id");
        let w = wargaData.find(w => w.id == id);
        if (w) {
            $("#warga-id").val(w.id);
            $("#warga-nik").val(w.nik);
            $("#warga-nama").val(w.nama);
            $("#warga-jk").val(w.jk);
            $("#warga-tempat").val(w.tempat);
            $("#warga-tgl").val(w.tgl);
            $("#warga-alamat").val(w.alamat);
            $("#warga-rt").val(w.rt);
            $("#warga-rw").val(w.rw);
            $("#warga-nokk").val(w.nokk);
            $("#warga-status").val(w.status);
            $("#warga-pekerjaan").val(w.pekerjaan);
            $("#warga-foto").val(w.foto);
            $("#modalWarga").modal("show");
        }
    });

    $(document).on("click", ".delete-warga", function() {
        let id = $(this).data("id");
        Swal.fire({ title: 'Hapus Warga?', text: "Data akan dihapus permanen", icon: 'warning', showCancelButton: true, confirmButtonColor: '#d33', confirmButtonText: 'Ya, Hapus!' }).then((result) => {
            if (result.isConfirmed) {
                wargaData = wargaData.filter(w => w.id != id);
                refreshAllTables();
                Swal.fire('Terhapus!', 'Data warga dihapus', 'success');
            }
        });
    });

    // ==================== CRUD KK ====================
    $("#saveKK").click(function() {
        let kepalaNama = $("#kk-kepala").val();
        let kepalaData = wargaData.find(w => w.nama === kepalaNama);
        
        let newData = {
            id: $("#kk-id").val() ? parseInt($("#kk-id").val()) : nextIdKK++,
            nomor: $("#kk-nomor").val(),
            kepala: kepalaNama,
            alamat: $("#kk-alamat").val(),
            rt: $("#kk-rt").val(),
            rw: $("#kk-rw").val()
        };
        
        if (!newData.nomor || !newData.kepala || !newData.alamat) { Swal.fire('Error', 'Lengkapi data yang bertanda *', 'error'); return; }
        
        if (newData.nomor.length !== 16) {
            Swal.fire('Error', 'No KK harus 16 digit', 'error');
            return;
        }
        
        if ($("#kk-id").val()) {
            let index = kkData.findIndex(k => k.id == newData.id);
            if (index !== -1) kkData[index] = newData;
            Swal.fire('Berhasil', 'Data KK diperbarui', 'success');
        } else {
            kkData.push(newData);
            Swal.fire('Berhasil', 'KK baru ditambahkan', 'success');
        }
        
        $("#modalKK").modal("hide");
        refreshAllTables();
        $("#formKK")[0].reset();
        $("#kk-id").val("");
    });

    $(document).on("click", ".edit-kk", function() {
        let id = $(this).data("id");
        let k = kkData.find(k => k.id == id);
        if (k) {
            $("#kk-id").val(k.id);
            $("#kk-nomor").val(k.nomor);
            $("#kk-kepala").val(k.kepala);
            $("#kk-alamat").val(k.alamat);
            $("#kk-rt").val(k.rt);
            $("#kk-rw").val(k.rw);
            $("#modalKK").modal("show");
        }
    });

    $(document).on("click", ".delete-kk", function() {
        let id = $(this).data("id");
        let hasMembers = wargaData.some(w => w.nokk === kkData.find(k => k.id == id)?.nomor);
        if (hasMembers) {
            Swal.fire('Tidak bisa hapus', 'KK ini masih memiliki anggota. Pindahkan anggota terlebih dahulu.', 'warning');
            return;
        }
        Swal.fire({ title: 'Hapus KK?', icon: 'warning', showCancelButton: true }).then((result) => {
            if (result.isConfirmed) { kkData = kkData.filter(k => k.id != id); refreshAllTables(); Swal.fire('Terhapus!', '', 'success'); }
        });
    });

    // ==================== CRUD MENINGGAL ====================
    $("#saveMeninggal").click(function() {
        let wargaId = $("#meninggal-warga").val();
        let wargaOpt = $(`#meninggal-warga option[value="${wargaId}"]`);
        if (!wargaId) { Swal.fire('Error', 'Pilih warga', 'error'); return; }
        
        let newData = {
            id: nextIdMeninggal++,
            wargaId: parseInt(wargaId),
            nik: wargaOpt.data("nik"),
            nama: wargaOpt.data("nama"),
            jk: wargaOpt.data("jk"),
            tglMeninggal: $("#meninggal-tgl").val(),
            sebab: $("#meninggal-sebab").val()
        };
        
        if (!newData.tglMeninggal) {
            Swal.fire('Error', 'Tanggal meninggal wajib diisi', 'error');
            return;
        }
        
        meninggalData.push(newData);
        wargaData = wargaData.filter(w => w.id != wargaId);
        $("#modalMeninggal").modal("hide");
        refreshAllTables();
        $("#formMeninggal")[0].reset();
        Swal.fire('Berhasil', 'Data meninggal ditambahkan', 'success');
    });

    $(document).on("click", ".delete-meninggal", function() {
        let id = $(this).data("id");
        Swal.fire({ title: 'Hapus Data Meninggal?', icon: 'warning', showCancelButton: true }).then((result) => {
            if (result.isConfirmed) { meninggalData = meninggalData.filter(m => m.id != id); refreshAllTables(); Swal.fire('Terhapus!', '', 'success'); }
        });
    });

    // ==================== CRUD DISABILITAS ====================
    $("#saveDisabilitas").click(function() {
        let wargaId = $("#disabilitas-warga").val();
        let wargaOpt = $(`#disabilitas-warga option[value="${wargaId}"]`);
        if (!wargaId) { Swal.fire('Error', 'Pilih warga', 'error'); return; }
        
        let newData = {
            id: $("#disabilitas-id").val() ? parseInt($("#disabilitas-id").val()) : nextIdDisabilitas++,
            wargaId: parseInt(wargaId),
            nik: wargaOpt.data("nik"),
            nama: wargaOpt.data("nama"),
            jenis: $("#disabilitas-jenis").val(),
            tingkat: $("#disabilitas-tingkat").val(),
            pendamping: $("#disabilitas-pendamping").val()
        };
        
        if (!newData.jenis) {
            Swal.fire('Error', 'Jenis disabilitas wajib diisi', 'error');
            return;
        }
        
        if ($("#disabilitas-id").val()) {
            let index = disabilitasData.findIndex(d => d.id == newData.id);
            if (index !== -1) disabilitasData[index] = newData;
            Swal.fire('Berhasil', 'Data disabilitas diperbarui', 'success');
        } else {
            disabilitasData.push(newData);
            Swal.fire('Berhasil', 'Data disabilitas tersimpan', 'success');
        }
        
        $("#modalDisabilitas").modal("hide");
        refreshAllTables();
        $("#formDisabilitas")[0].reset();
        $("#disabilitas-id").val("");
    });

    $(document).on("click", ".edit-disabilitas", function() {
        let id = $(this).data("id");
        let d = disabilitasData.find(d => d.id == id);
        if (d) {
            $("#disabilitas-id").val(d.id);
            $("#disabilitas-warga").val(d.wargaId);
            $("#disabilitas-jenis").val(d.jenis);
            $("#disabilitas-tingkat").val(d.tingkat);
            $("#disabilitas-pendamping").val(d.pendamping);
            $("#modalDisabilitas").modal("show");
        }
    });

    $(document).on("click", ".delete-disabilitas", function() {
        let id = $(this).data("id");
        Swal.fire({ title: 'Hapus Data Disabilitas?', icon: 'warning', showCancelButton: true }).then((result) => {
            if (result.isConfirmed) { disabilitasData = disabilitasData.filter(d => d.id != id); refreshAllTables(); Swal.fire('Terhapus!', '', 'success'); }
        });
    });

    // ==================== PRINT LAPORAN ====================
    $("#btn-print-laporan").click(function() {
        let printContent = $("#laporan-content").html();
        let printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html><head><title>Laporan Kependudukan Desa Kalitengah</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body { padding: 20px; font-family: 'Inter', sans-serif; }
                @media print {
                    body { margin: 0; padding: 15px; }
                    .btn { display: none; }
                }
            </style>
            </head><body><div class="container">${printContent}</div>
            <script>
                window.onload = function() { 
                    window.print(); 
                    setTimeout(function() { window.close(); }, 1000); 
                }
            <\/script>
            </body></html>
        `);
        printWindow.document.close();
    });

    // ==================== INIT ====================
    updateDate();
    populateDropdowns();
    refreshAllTables();
    showPage("dashboard");
});