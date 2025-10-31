const GAS_URL = 'https://script.google.com/macros/s/AKfycbx0Xh-zhWwvnt-sh13Tf6prXqEkZEPqoEMxGBxMHrro2rIq6iMblydd3Ip5xfqbSbor/exec';

// ページ読み込み時
window.onload = function() {
  loadData();
};

// 一覧取得
function loadData() {
  fetch(GAS_URL)
    .then(res => res.text())
    .then(text => {
      console.log("GETレスポンス:", text);
      const data = JSON.parse(text);
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

// 登録ボタンクリック時
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

  console.log("送信データ:", newData);

  fetch(GAS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData)
  })
    .then(res => res.text())
    .then(text => {
      console.log("POSTレスポンス:", text);
      const result = JSON.parse(text);
      if (result.result === "success") {
        alert("登録しました！");
        loadData();

        // 入力欄をリセット
        document.querySelectorAll("#addForm input").forEach(input => input.value = "");
        document.querySelectorAll("#addForm select").forEach(select => select.value = "〇");

        // フォームを隠す
        document.getElementById("addForm").style.display = "none";
      } else {
        alert("登録失敗: " + result.message);
      }
    })
    .catch(err => console.error("fetch POST error:", err));
});

// フォーム表示ボタン
document.getElementById("showFormBtn").addEventListener("click", () => {
  const form = document.getElementById("addForm");
  form.style.display = (form.style.display === "none") ? "block" : "none";
});
