const request = new XMLHttpRequest();
request.open('GET', 'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjIVvM5hz2q-A23mJeGQsN6xWhk54_cK8UJvpzgHX0mXBB_Yp3c6U4Ao_BN6kjk6b5IMfO7WJP0WIUQC__1GMgrO9IMYE75XbP-K7MgJPKMI00MzMGUV5vUuj8b7GkcXHktEcx-PKO4_we_4w0Vr9yESSbgbOlWqO8xtSYJ8fbHubuZeoqmyfM3s-g59iI7_E1Wak6plG851dIPy9WCOtU90lCXs1linhHT6PBxyAXn1xzpNmrLEadLGtk-ikjAY-NuEMWJpcy7362IsV2rK2FpU-1xig&lib=MKoaYyoemKuw1zE9Sj5faEbUz7p6ufxs_');
request.responseType = 'json';

request.onload = function () {
    let data = this.response;
    console.log(data);

    // "date" の中身を文字列として取得（カンマ区切り）
    let text = data['date'];
    let items = text.split(","); // 配列に分割

    let output = document.getElementById('output');
    output.innerHTML = "<table border='1' style='border-collapse: collapse; width: 100%; text-align: center;'></table>";
    let table = output.querySelector("table");

    // ヘッダー行
    let header = table.insertRow();
    ["楽器", "使用者", "購入年", "メーカー", "備品番号", "メモ"].forEach(h => {
        let th = document.createElement("th");
        th.innerText = h;
        th.style.backgroundColor = "#f0f0f0";
        th.style.padding = "5px";
        header.appendChild(th);
    });

    // データ行（6個ごとに1行）
    for (let i = 0; i < items.length; i += 6) {
        let row = table.insertRow();
        for (let j = 0; j < 6; j++) {
            let cell = row.insertCell();
            cell.innerText = items[i + j] || "";
            cell.style.padding = "5px";
        }
    }
};

request.onerror = function () {
    document.getElementById('output').innerText = "通信エラーが発生しました";
};

request.send();
