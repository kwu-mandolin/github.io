const request = new XMLHttpRequest();
request.open(
  "GET",
  "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjIVvM5hz2q-A23mJeGQsN6xWhk54_cK8UJvpzgHX0mXBB_Yp3c6U4Ao_BN6kjk6b5IMfO7WJP0WIUQC__1GMgrO9IMYE75XbP-K7MgJPKMI00MzMGUV5vUuj8b7GkcXHktEcx-PKO4_we_4w0Vr9yESSbgbOlWqO8xtSYJ8fbHubuZeoqmyfM3s-g59iI7_E1Wak6plG851dIPy9WCOtU90lCXs1linhHT6PBxyAXn1xzpNmrLEadLGtk-ikjAY-NuEMWJpcy7362IsV2rK2FpU-1xig&lib=MKoaYyoemKuw1zE9Sj5faEbUz7p6ufxs_"
);
request.responseType = "json";

request.onload = function () {
  let data = this.response;
  console.log(data);

  let rows = data["date"]; // GASからのデータ（2次元配列）

  // テーブルを新規作成
  let output = document.getElementById("output");
  let table = document.createElement("table");
  table.border = "1";
  table.style.borderCollapse = "collapse";
  table.style.width = "100%";
  table.style.textAlign = "center";

  // ✅ ヘッダー行
  let header = table.insertRow();
  ["選択", "楽器", "使用者", "購入年", "メーカー", "備品番号", "メモ"].forEach((h) => {
    let th = document.createElement("th");
    th.innerText = h;
    th.style.backgroundColor = "#f0f0f0";
    th.style.padding = "5px";
    header.appendChild(th);
  });

  // ✅ データ行
  rows.forEach((rowData, index) => {
    let row = table.insertRow();

    // ✅ チェックボックス列（左端）
    let checkCell = row.insertCell();
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = index; // 行の識別用
    checkCell.appendChild(checkbox);

    // 他のデータ列
    rowData.forEach((cellData) => {
      let cell = row.insertCell();
      cell.innerText = cellData;
      cell.style.padding = "5px";
    });
  });

  // 既存の内容を消してテーブルを表示
  output.innerHTML = "";
  output.appendChild(table);
};

request.onerror = function () {
  document.getElementById("output").innerText = "通信エラーが発生しました";
};

request.send();
