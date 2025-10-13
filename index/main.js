const request = new XMLHttpRequest();
request.open('GET', 'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjIVvM5hz2q-A23mJeGQsN6xWhk54_cK8UJvpzgHX0mXBB_Yp3c6U4Ao_BN6kjk6b5IMfO7WJP0WIUQC__1GMgrO9IMYE75XbP-K7MgJPKMI00MzMGUV5vUuj8b7GkcXHktEcx-PKO4_we_4w0Vr9yESSbgbOlWqO8xtSYJ8fbHubuZeoqmyfM3s-g59iI7_E1Wak6plG851dIPy9WCOtU90lCXs1linhHT6PBxyAXn1xzpNmrLEadLGtk-ikjAY-NuEMWJpcy7362IsV2rK2FpU-1xig&lib=MKoaYyoemKuw1zE9Sj5faEbUz7p6ufxs_');
request.responseType = 'json';

request.onload = function () {
    let data = this.response;
    console.log(data);

    let rows = data['date']; // すでに二次元配列

    let output = document.getElementById('output');
    output.innerHTML = "<table border='1' style='border-collapse: collapse; width: 100%; text-align: center;'></table>";
    let table = output.querySelector("table");

    // ✅ ヘッダー行
    let header = table.insertRow();
    ["選択", "楽器", "使用者", "購入年", "メーカー", "備品番号", "メモ"].forEach(h => {
        let th = document.createElement("th");
        th.innerText = h;
        th.style.backgroundColor = "#f0f0f0";
        th.style.padding = "5px";
        header.appendChild(th);
    });

    // ✅ データ行
    rows.forEach((rowData, index) => {
        let row = table.insertRow();

        // ✅ チェックボックス列（最初の列）
        let checkCell = row.insertCell();
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = index; // 行番号を識別用に入れておく
        checkCell.appendChild(checkbox);

        // 他のデータ列
        rowData.forEach(cellData => {
            let cell = row.insertCell();
            cell.innerText = cellData;
            cell.style.padding = "5px";
        });
    });
};

request.onerror = function () {
    document.getElementById('output').innerText = "通信エラーが発生しました";
};

request.send();
