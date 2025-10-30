const GAS_URL = 'https://script.google.com/macros/s/AKfycbzmJ1kLXMoDGjMcBzN83KWoGP0cM6f2bk-hVn-JKJ3ZP7swuU4c4D-7-Cn2baTI2IUQ/exec';

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

// 新規追加
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
        document.getElementById("addForm").style.display = "none";
      } else {
        alert("登録失敗: " + result.message);
      }
    })
    .catch(err => console.error("fetch POST error:", err));
});
