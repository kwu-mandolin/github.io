// 🔹 GASのURLを設定
const GAS_URL = 'https://script.google.com/macros/s/AKfycbzRqfuE7UnLjFT1HRET_EWC0lqNPMlQUdG0Vtfx9Ow7txFZUOChU0rfe0Kb1QsoQtl-/exec';

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
  // 1) 送るデータを作る（変数名は `data`）
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
    // 2) fetchでPOST（no-cors は使わない）
    const res = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    // 3) レスポンスを確認（GAS側がJSONを返す前提）
    const text = await res.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch (e) {
      // GASがプレーンテキスト返す場合もあるので fallback
      json = { result: text };
    }

    // 4) 成功チェック（GASで {result:"success"} を返すようにしているなら）
    if (json.result === 'success' || res.ok) {
      alert('登録しました！');
      // フォームを閉じ、入力をクリア
      document.getElementById("addForm").style.display = "none";
      clearFormInputs();
      loadData();
    } else {
      console.error('登録失敗:', json);
      alert('登録に失敗しました。コンソールを確認してください。');
    }

  } catch (err) {
    console.error('fetch POST error:', err);
    alert('ネットワークエラーが発生しました。コンソールを確認してください。');
  }
});

function clearFormInputs() {
  const ids = ["title","composer","arranger","score","part1","part2","dola","cello","guitar","bass","other"];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.tagName === 'SELECT') el.selectedIndex = 0;
    else el.value = '';
  });
}
