let selectedIndex = -1;

function getData() {
    return JSON.parse(localStorage.getItem("siswa")) || [];
}

function saveData(data) {
    localStorage.setItem("siswa", JSON.stringify(data));
}

function tampilData() {

    let data = getData();
    let tbody = document.getElementById("tbody");

    tbody.innerHTML = "";

    data.forEach(function(item, index) {

        tbody.innerHTML += `
        <tr onclick="pilihData(${index})">
            <td>${item.nis}</td>
            <td>${item.nama}</td>
            <td>${item.kelas}</td>
            <td>${item.jurusan}</td>
            <td>
                <img src="${item.foto}" width="80">
            </td>
        </tr>
        `;

    });

}

function tambahData() {

    let nis = document.getElementById("nis").value;
    let nama = document.getElementById("nama").value;
    let kelas = document.getElementById("kelas").value;
    let jurusan = document.getElementById("jurusan").value;

    let file = document.getElementById("foto").files[0];

    if (nis === "" || nama === "" || kelas === "" || jurusan === "") {
        alert("Isi semua data");
        return;
    }

    let data = getData();

    if (file) {

        let reader = new FileReader();

        reader.onload = function(e) {

            data.push({
                nis: nis,
                nama: nama,
                kelas: kelas,
                jurusan: jurusan,
                foto: e.target.result
            });

            saveData(data);

            tampilData();
            bersih();

            alert("Data berhasil disimpan");

        };

        reader.readAsDataURL(file);

    } else {

        data.push({
            nis: nis,
            nama: nama,
            kelas: kelas,
            jurusan: jurusan,
            foto: ""
        });

        saveData(data);

        tampilData();
        bersih();

        alert("Data berhasil disimpan");

    }

}

function pilihData(index) {

    let data = getData();

    document.getElementById("nis").value = data[index].nis;
    document.getElementById("nama").value = data[index].nama;
    document.getElementById("kelas").value = data[index].kelas;
    document.getElementById("jurusan").value = data[index].jurusan;

    selectedIndex = index;

}

function updateData() {

    if (selectedIndex === -1) {
        alert("Pilih data dulu");
        return;
    }

    let data = getData();

    data[selectedIndex].nis =
        document.getElementById("nis").value;

    data[selectedIndex].nama =
        document.getElementById("nama").value;

    data[selectedIndex].kelas =
        document.getElementById("kelas").value;

    data[selectedIndex].jurusan =
        document.getElementById("jurusan").value;

    saveData(data);

    tampilData();
    bersih();

    alert("Data berhasil diupdate");

}

function hapusData() {

    if (selectedIndex === -1) {
        alert("Pilih data dulu");
        return;
    }

    let data = getData();

    data.splice(selectedIndex, 1);

    saveData(data);

    tampilData();
    bersih();

    alert("Data berhasil dihapus");

}

function cariData() {

    let keyword =
        document.getElementById("search")
        .value.toLowerCase();

    let data = getData();

    let hasil = data.filter(function(item) {

        return (
            item.nis.toLowerCase().includes(keyword) ||
            item.nama.toLowerCase().includes(keyword) ||
            item.kelas.toLowerCase().includes(keyword) ||
            item.jurusan.toLowerCase().includes(keyword)
        );

    });

    let tbody = document.getElementById("tbody");

    tbody.innerHTML = "";

    hasil.forEach(function(item, index) {

        tbody.innerHTML += `
        <tr onclick="pilihData(${index})">
            <td>${item.nis}</td>
            <td>${item.nama}</td>
            <td>${item.kelas}</td>
            <td>${item.jurusan}</td>
            <td>
                <img src="${item.foto}" width="80">
            </td>
        </tr>
        `;

    });

}

function bersih() {

    document.getElementById("nis").value = "";
    document.getElementById("nama").value = "";
    document.getElementById("kelas").value = "";
    document.getElementById("jurusan").value = "";
    document.getElementById("foto").value = "";

    selectedIndex = -1;

}

function cetakData() {
    window.print();
}

tampilData();