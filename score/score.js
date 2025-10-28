// 🔹 GASのURLを設定
const GAS_URL = 'https://script.google.com/macros/s/AKfycbzRqfuE7UnLjFT1HRET_EWC0lqNPMlQUdG0Vtfx9Ow7txFZUOChU0rfe0Kb1QsoQtl-/exec';

// 🔹 ページ読み込み時にデータを取得
window.onload = function() {
  loadData();
};

// 🔹 一覧データ取得
function loadData() {
  fetch(GAS_URL)
    .then(response => response.json())
    .then(data => {
      const tbody = document.querySelector("#scoreTable tbody");
      tbody.innerHTML = "";

      data.forEach(row => {
        const tr = document.createElement("tr");
        Object.values(row).forEach(value => {
          const td = document.createElement("td");
          td.textContent = value;
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
    })
    .catch(err => console.error(err));
}

// 🔹 フォーム表示切替
document.getElementById("showFormBtn").addEventListener("click", () => {
  const form = document.getElementById("addForm");
  form.style.display = form.style.display === "none" ? "block" : "none";
});

// 🔹 新規追加処理
document.getElementById("addBtn").addEventListener("click", () => {
  const data = {
    title: document.getElementById("title").value,
    composer: document.getElementById("composer").value,
    arranger: document.getElementById("arranger").value,
    score: document.getElementById("score").value,
    part1: document.getElementById("part1").value,
    part2: document.getElementById("part2").value,
    dola: document.getElementById("dola").value,
    cello: document.getElementById("cello").value,
    guitar: document.getElementById("guitar").value,
    bass: document.getElementById("bass").value,
    other: document.getElementById("other").value
  };

  fetch(GAS_URL, {
    method: 'POST',
    mode: 'no-cors', // 注意：レスポンスは見えませんがGAS側で追加されます
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newData)
  })
    .then(response => response.text())
    .then(() => {
      alert("登録しました！");
      loadData(); // 一覧更新
      document.getElementById("addForm").style.display = "none";
    })
    .catch(err => console.error(err));
});
