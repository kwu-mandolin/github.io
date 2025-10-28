// === 設定 ===
const GAS_URL = 'https://script.google.com/macros/s/AKfycbyWZ0AbTzn2VoOFt-JXf3nt4fD-yHibYw5mUbqXMJHULZujeXKL5LTMpiwqQY9osQJm/exec';

// === 初期処理 ===
document.addEventListener('DOMContentLoaded', loadData);

const showFormBtn = document.getElementById("showFormBtn");
const addForm = document.getElementById("addForm");
const addBtn = document.getElementById("addBtn");

// === フォーム開閉 ===
showFormBtn.addEventListener("click", () => {
  if (addForm.style.display === "none") {
    addForm.style.display = "block";
    showFormBtn.textContent = "－ 閉じる";
  } else {
    addForm.style.display = "none";
    showFormBtn.textContent = "＋ 追加";
  }
});

// === 登録処理 ===
addBtn.addEventListener("click", async () => {
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

  await fetch(GAS_URL, {
    method: "POST",
    body: JSON.stringify(data)
  });

  alert("登録しました！");
  loadData();
});

// === 一覧取得 ===
async function loadData() {
  const res = await fetch(GAS_URL);
  const json = await res.json();

  const tbody = document.querySelector("#scoreTable tbody");
  tbody.innerHTML = "";

  json.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.番号}</td>
      <td>${row.曲名}</td>
      <td>${row.作曲者}</td>
      <td>${row.編曲者}</td>
      <td>${row.総譜}</td>
      <td>${row["1st"]}</td>
      <td>${row["2nd"]}</td>
      <td>${row.dola}</td>
      <td>${row.cello}</td>
      <td>${row.guitar}</td>
      <td>${row.bass}</td>
      <td>${row.other}</td>
    `;
    tbody.appendChild(tr);
  });
}
