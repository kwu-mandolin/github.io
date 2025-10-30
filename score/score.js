// 🔹 GASのURLを設定
const GAS_URL = 'https://script.google.com/macros/s/AKfycbyJaQx-kYctJrvZ9Ht0JQqH9oU7J51oVMBSCsZmtAp_ddbvMIa36voPdHWrzPWZWe5E/exec';

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
    .catch(err => console.error("fetch GET error:", err));
}

// 🔹 フォーム表示切替
document.getElementById("showFormBtn").addEventListener("click", () => {
  const form = document.getElementById("addForm");
  form.style.display = form.style.display === "none" ? "block" : "none";
});

// 🔹 新規追加処理
document.getElementById("addBtn").addEventListener("click", () => {
  const newData = {
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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newData)
  })
    .then(response => response.json()) // ← JSONとして受け取る
    .then(result => {
      if (result.result === "success") {
        alert("登録しました！");
        loadData(); // 一覧更新
        document.getElementById("addForm").style.display = "none";
      } else {
        alert("登録に失敗しました: " + result.message);
      }
    })
    .catch(err => console.error("fetch POST error:", err));
});
