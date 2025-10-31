// 🔹 GASのURL（あなたのデプロイした /exec URL を設定）
const GAS_URL = 'https://script.google.com/macros/s/AKfycbz1FBpjDeIuHJEJUOcmc1DZCb9IRfNA5dq5-1Yy1IhTFeSGxMoZ2qbiDPylMGcZrsr7/exec';

// ---------------------
// 一覧取得（GET）
// ---------------------
function loadData() {
  fetch(GAS_URL)
    .then(response => response.json())
    .then(data => {
      const output = document.getElementById('output');
      output.innerHTML = "<table border='1' cellspacing='0' cellpadding='5'><thead></thead><tbody></tbody></table>";

      const table = output.querySelector("table");
      const thead = table.querySelector("thead");
      const tbody = table.querySelector("tbody");

      // ヘッダー
      const headerRow = document.createElement('tr');
      ["曲名","作曲者","編曲者","総譜","1st","2nd","Dola","Cello","Guitar","Bass","その他"].forEach(h => {
        const th = document.createElement('th');
        th.textContent = h;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);

      // データ行
      data.forEach(row => {
        const tr = document.createElement('tr');
        ["title","composer","arranger","score","part1","part2","dola","cello","guitar","bass","other"].forEach(key => {
          const td = document.createElement('td');
          td.textContent = row[key] || '';
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error("データ取得エラー:", err);
      document.getElementById('output').innerText = "通信エラーが発生しました";
    });
}

// ---------------------
// 追加（POST）
// ---------------------
document.getElementById('add-btn').addEventListener('click', () => {
  const newData = {
    title: document.getElementById('title').value || '',
    composer: document.getElementById('composer').value || '',
    arranger: document.getElementById('arranger').value || '',
    score: document.getElementById('score').value,
    part1: document.getElementById('part1').value,
    part2: document.getElementById('part2').value,
    dola: document.getElementById('dola').value,
    cello: document.getElementById('cello').value,
    guitar: document.getElementById('guitar').value,
    bass: document.getElementById('bass').value,
    other: document.getElementById('other').value || ''
  };

  if (!newData.title) {
    alert('曲名を入力してください');
    return;
  }

  fetch(GAS_URL, {
    method: 'POST',
    mode: 'no-cors', // CORS制約回避
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newData)
  })
  .then(() => {
    alert('追加しました！ページを更新してください！');
    document.querySelectorAll('#form input').forEach(i => i.value = '');
    loadData();
  })
  .catch(err => {
    console.error("追加エラー:", err);
    alert('追加に失敗しました');
  });
});

// ---------------------
// 初期表示
// ---------------------
window.onload = loadData;
