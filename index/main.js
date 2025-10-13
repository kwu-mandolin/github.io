// 🔹 GASのURLを設定（あなたのGASのデプロイURLに変更）
const GAS_URL = 'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjIVvM5hz2q-A23mJeGQsN6xWhk54_cK8UJvpzgHX0mXBB_Yp3c6U4Ao_BN6kjk6b5IMfO7WJP0WIUQC__1GMgrO9IMYE75XbP-K7MgJPKMI00MzMGUV5vUuj8b7GkcXHktEcx-PKO4_we_4w0Vr9yESSbgbOlWqO8xtSYJ8fbHubuZeoqmyfM3s-g59iI7_E1Wak6plG851dIPy9WCOtU90lCXs1linhHT6PBxyAXn1xzpNmrLEadLGtk-ikjAY-NuEMWJpcy7362IsV2rK2FpU-1xig&lib=MKoaYyoemKuw1zE9Sj5faEbUz7p6ufxs_/exec';

// 🔸 初期データ取得（一覧表示）
function loadData() {
    const request = new XMLHttpRequest();
    request.open('GET', GAS_URL);
    request.responseType = 'json';

    request.onload = function () {
        const data = this.response;
        const rows = data['date'];
        const output = document.getElementById('output');
        output.innerHTML = "<table border='1' style='border-collapse: collapse; width: 100%; text-align: center;'></table>";
        const table = output.querySelector("table");

        // ヘッダー行
        const header = table.insertRow();
        ["楽器", "使用者", "購入年", "メーカー", "備品番号", "メモ"].forEach(h => {
            const th = document.createElement("th");
            th.innerText = h;
            th.style.backgroundColor = "#f0f0f0";
            th.style.padding = "5px";
            header.appendChild(th);
        });

        // データ行
        rows.forEach(rowData => {
            const row = table.insertRow();
            rowData.forEach(cellData => {
                const cell = row.insertCell();
                cell.innerText = cellData;
                cell.style.padding = "5px";
            });
        });
    };

    request.onerror = function () {
        document.getElementById('output').innerText = "通信エラーが発生しました";
    };

    request.send();
}

// 🔹 追加ボタン処理
document.getElementById('add-btn').addEventListener('click', () => {
    const newData = {
        instrument: document.getElementById('instrument').value,
        user: document.getElementById('user').value,
        year: document.getElementById('year').value,
        maker: document.getElementById('maker').value,
        number: document.getElementById('number').value,
        memo: document.getElementById('memo').value
    };

    // フォーム未入力チェック
    if (!newData.instrument) {
        alert("楽器名を入力してください。");
        return;
    }

    fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors', // GASはCORS制約があるため
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
    })
    .then(() => {
        alert('データを追加しました！');
        loadData(); // 再読み込み
        document.querySelectorAll('#form input').forEach(i => i.value = '');
    })
    .catch(err => {
        console.error(err);
        alert('追加に失敗しました。');
    });
});

// 初期表示
loadData();
