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

        // ヘッダー行（左端にチェックボックス列を追加）
        const header = table.insertRow();
        ["選択", "楽器", "使用者", "購入年", "メーカー", "備品番号", "メモ"].forEach(h => {
            const th = document.createElement("th");
            th.innerText = h;
            th.style.backgroundColor = "#f0f0f0";
            th.style.padding = "5px";
            header.appendChild(th);
        });

        // データ行
        rows.forEach((rowData, index) => {
            const row = table.insertRow();

            // 🔹 チェックボックス列
            const checkCell = row.insertCell();
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("delete-checkbox");
            checkbox.dataset.row = index + 2; // シートの行番号（2行目から）
            checkCell.appendChild(checkbox);

            // 🔹 残りのデータ列
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
