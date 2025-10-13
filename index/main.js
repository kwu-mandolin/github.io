const GAS_URL =
  "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjIVvM5hz2q-A23mJeGQsN6xWhk54_cK8UJvpzgHX0mXBB_Yp3c6U4Ao_BN6kjk6b5IMfO7WJP0WIUQC__1GMgrO9IMYE75XbP-K7MgJPKMI00MzMGUV5vUuj8b7GkcXHktEcx-PKO4_we_4w0Vr9yESSbgbOlWqO8xtSYJ8fbHubuZeoqmyfM3s-g59iI7_E1Wak6plG851dIPy9WCOtU90lCXs1linhHT6PBxyAXn1xzpNmrLEadLGtk-ikjAY-NuEMWJpcy7362IsV2rK2FpU-1xig&lib=MKoaYyoemKuw1zE9Sj5faEbUz7p6ufxs_";

// ✅ データ取得して表を表示する関数
function loadTable() {
  const request = new XMLHttpRequest();
  request.open("GET", GAS_URL);
  request.responseType = "json";

  request.onload = function () {
    let data = this.response;
    if (!data || !data.date) {
      document.getElementById("output").innerText = "データがありません";
      return;
    }

    let rows = data.date;

    // テーブルを新しく作る
    let table = document.createElement("table");
    table.border = "1";
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";
    table.style.textAlign = "center";

    // ✅ ヘッダー
    let header = table.insertRow();
    ["選択", "楽器", "使用者", "購入年", "メーカー", "備品番号", "メモ"].forEach(
      (h) => {
        let th = document.createElement("th");
        th.innerText = h;
        th.style.backgroundColor = "#f0f0f0";
        th.style.padding = "5px";
        header.appendChild(th);
      }
    );

    // ✅ データ行
    rows.forEach((rowData, index) => {
      let row = table.insertRow();

      // チェックボックス列
      let checkCell = row.insertCell();
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = index;
      checkCell.appendChild(checkbox);

      // データ列
      rowData.forEach((cellData) => {
        let cell = row.insertCell();
        cell.innerText = cellData;
        cell.style.padding = "5px";
      });
    });

    // 出力エリアに表示
    let output = document.getElementById("output");
    output.innerHTML = "";
    output.appendChild(table);
  };

  request.onerror = function () {
    document.getElementById("output").innerText = "通信エラーが発生しました";
  };

  request.send();
}

// ✅ ページ読み込み時にテーブルを表示
loadTable();

// ✅ データ追加ボタンの処理
document.getElementById("add-btn").addEventListener("click", () => {
  const instrument = document.getElementById("instrument").value;
  const user = document.getElementById("user").value;
  const year = document.getElementById("year").value;
  const maker = document.getElementById("maker").value;
  const number = document.getElementById("number").value;
  const memo = document.getElementById("memo").value;

  if (!instrument) {
    alert("楽器名を入力してください");
    return;
  }

  const data = {
    instrument,
    user,
    year,
    maker,
    number,
    memo,
  };

  // ここは仮のPOST先（後でGAS側のdoPostを設定）
  fetch(
    "https://script.google.com/macros/s/AKfycbzVLUmyF5t5J0rKHQzCTckxEZyR0aU38Lkp8lQsnZJlML-WfPcaw0KkVCfD0svzCvMA9Q/exec",
    {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )
    .then(() => {
      alert("データを追加しました！");
      // 再読み込みで最新反映
      loadTable();
    })
    .catch(() => {
      alert("追加に失敗しました。");
    });
});
