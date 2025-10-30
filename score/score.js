// 🔹 GASのURLを設定
const GAS_URL = 'https://script.google.com/macros/s/AKfycbwHq35VesxY3V9c_5ROk-hNV2UhBbJXHiIib9WOBGZQvdkOVj5b0cCk7csyob-Dvjro/exec';

// ページ読み込み時にデータを取得
window.onload = function() {
  loadData();
};

// 一覧データ取得
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
    .catch(err => console.error('loadData error:', err));
}

// フォーム表示切替
document.getElementById("showFormBtn").addEventListener("click", () => {
  const form = document.getElementById("addForm");
  form.style.display = form.style.display === "none" ? "block" : "none";
});

// 新規追加処理
document.getElementById("addBtn").addEventListener("click", async () => {
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

  try {
    const res = await fetch(GAS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    if (json.result === 'success') {
      alert('登録しました！');
      document.getElementById("addForm").style.display = "none";
      clearFormInputs();
      loadData();
    } else {
      console.error('登録失敗:', json);
      alert('登録に失敗しました。');
    }

  } catch (err) {
    console.error('fetch POST error:', err);
    alert('ネットワークエラーが発生しました。');
  }
});

// 入力フォームをクリア
function clearFormInputs() {
  const ids = ["title","composer","arranger","score","part1","part2","dola","cello","guitar","bass","other"];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.tagName === 'SELECT') el.selectedIndex = 0;
    else el.value = '';
  });
}
