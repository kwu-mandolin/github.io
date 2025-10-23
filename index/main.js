// 🔹 GASのURLを設定
const GAS_URL = 'https://script.google.com/macros/s/AKfycbwgbnSL0DbaAsRU4osDXGkZsZQ6Cw9o2KC3y54m2xgmf_oesoCSpNrmd41HC7ARJG8/exec';

// =================================================
// 一覧表示関数（instrument指定で絞り込み）
// =================================================
function loadData(instrument = '') {
    const request = new XMLHttpRequest();
    const url = instrument ? `${GAS_URL}?instrument=${encodeURIComponent(instrument)}` : GAS_URL;
    request.open('GET', url);
    request.responseType = 'json';

    request.onload = function () {
        const data = this.response;
        const rows = data['date'];
        const output = document.getElementById('output');

        output.innerHTML = "<table border='1' style='border-collapse: collapse; width: 100%; text-align: center;'></table>";
        const table = output.querySelector("table");

        // 🔹 ヘッダー行
        const header = table.insertRow();
        ["選択", "楽器", "使用者", "購入年", "メーカー", "備品番号", "メモ", "操作"].forEach(h => {
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
            checkbox.dataset.index = index + 2;
            checkboxCell.appendChild(checkbox);

            // ✅ データ列
            rowData.forEach(cellData => {
                const cell = row.insertCell();
                cell.innerText = cellData;
                cell.style.padding = "5px";
            });

            // ✅ 編集ボタン列
            const editCell = row.insertCell();
            const editBtn = document.createElement("button");
            editBtn.textContent = "編集";
            editBtn.style.padding = "3px 8px";
            editBtn.style.cursor = "pointer";
            editBtn.addEventListener("click", () => {
                openEditModal(rowData, index + 2);
            });
            editCell.appendChild(editBtn);
        });
    };

    request.onerror = function () {
        document.getElementById('output').innerText = "通信エラーが発生しました";
    };

    request.send();
}

// =================================================
// 絞り込みボタン
// =================================================
document.getElementById("filter-btn").addEventListener("click", () => {
    const selected = document.getElementById("filter-select").value;
    loadData(selected);
});

// 絞り込み解除
document.getElementById("clear-filter").addEventListener("click", () => {
    document.getElementById("filter-select").value = "";
    loadData();
});

// =================================================
// データ追加処理
// =================================================
document.getElementById('add-btn').addEventListener('click', () => {
    const newData = {
        instrument: document.getElementById('instrument').value,
        user: document.getElementById('user').value,
        year: document.getElementById('year').value,
        maker: document.getElementById('maker').value,
        number: document.getElementById('number').value,
        memo: document.getElementById('memo').value
    };

    if (!newData.instrument) {
        alert("楽器名を入力してください。");
        return;
    }

    fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
    })
        .then(() => {
            alert('データを追加しました！');
            loadData();
            document.querySelectorAll('#form input').forEach(i => i.value = '');
        })
        .catch(err => {
            console.error(err);
            alert('追加に失敗しました。');
        });
});

// =================================================
// 編集モーダル関連
// =================================================
function openEditModal(rowData, rowIndex) {
    document.getElementById("edit-id").value = rowIndex;
    document.getElementById("edit-instrument").value = rowData[0];
    document.getElementById("edit-user").value = rowData[1];
    document.getElementById("edit-year").value = rowData[2];
    document.getElementById("edit-maker").value = rowData[3];
    document.getElementById("edit-number").value = rowData[4];
    document.getElementById("edit-memo").value = rowData[5];

    document.getElementById("edit-modal").style.display = "block";
}

document.getElementById("cancel-edit").addEventListener("click", function () {
    document.getElementById("edit-modal").style.display = "none";
});

document.getElementById("save-edit").addEventListener("click", function () {
    const updatedData = {
        row: document.getElementById("edit-id").value,
        instrument: document.getElementById("edit-instrument").value,
        user: document.getElementById("edit-user").value,
        year: document.getElementById("edit-year").value,
        maker: document.getElementById("edit-maker").value,
        number: document.getElementById("edit-number").value,
        memo: document.getElementById("edit-memo").value
    };

    fetch(GAS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
    })
        .then(() => {
            alert("更新しました！");
            document.getElementById("edit-modal").style.display = "none";
            loadData();
        })
        .catch(err => {
            console.error(err);
            alert("更新に失敗しました。");
        });
});

// =================================================
// 初期表示
// =================================================
loadData();
