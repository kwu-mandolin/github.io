let text = data['date'];  
let items = text.split(",");

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

// データ行（6つごとに1行）
for (let i = 0; i < items.length; i += 6) {
    let row = table.insertRow();
    for (let j = 0; j < 6; j++) {
        let cell = row.insertCell();
        cell.innerText = items[i + j] || "";
        cell.style.padding = "5px";
    }
}

