// 🔹 GASのURLを設定（あなたのGASのデプロイURLに変更）
const GAS_URL = 'https://script.google.com/macros/s/AKfycbwBdqiMeABXDeYmOzB3rwBUCko2nwZMSlScPf0IlgoNnxUIzdV50LygPOofNbXpHTc/exec';

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

        // 🔹 ヘッダー行
        const header = table.insertRow();
        ["選択", "楽器", "使用者", "購入年", "メーカー", "備品番号", "メモ"].forEach(h => {
            const th = document.createElement("th");
            th.innerText = h;
            th.style.backgroundColor = "#f0f0f0";
            th.style.padding = "5px";
            header.appendChild(th);
        });

        // 🔹 データ行
        rows.forEach((rowData, index) => {
            const row = table.insertRow();

            // ✅ チェックボックス列
            const checkboxCell = row.insertCell();
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.dataset.index = index + 2; // シート上の行番号（2行目からデータが始まる）
            checkboxCell.appendChild(checkbox);

            // 他のデータ列
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

// 🗑️ 削除ボタン処理
document.getElementById('delete-btn').addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    if (checkboxes.length === 0) {
        alert("削除する行を選択してください。");
        return;
    }

    if (!confirm("指定した範囲を削除しますか？")) {
        return;
    }

    // チェックされた行番号を取得
    const rowsToDelete = Array.from(checkboxes).map(cb => Number(cb.dataset.index));

    // GAS側で削除できるように送信
    fetch(GAS_URL + "?delete=" + JSON.stringify(rowsToDelete), {
        method: 'GET',
        mode: 'no-cors'
    })
    .then(() => {
        alert("削除しました！");
        loadData();
    })
    .catch(err => {
        console.error(err);
        alert("削除に失敗しました。");
    });
});

// 初期表示
loadData();
