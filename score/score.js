// 🔹 あなたのGASデプロイURLをここに貼る
const GAS_URL = 'https://script.google.com/macros/s/AKfycbzf9nLgkVePlRdjw2WviZ3lkybnEKp2vVHvRszNFars6K8oIV0vcdsS6YkeTppEzzZU/exec';

// 🔹 データ読み込み
async function loadData(filter = '') {
  const url = filter ? `${GAS_URL}?filter=${encodeURIComponent(filter)}` : GAS_URL;
  const res = await fetch(url);
  const json = await res.json();

  const tbody = document.querySelector('#scoreTable tbody');
  tbody.innerHTML = '';

  json.date.forEach(row => {
    const tr = document.createElement('tr');
    const rowNum = row[0]; // シート行番号
    const values = row.slice(1); // データ部分（番号〜other）

    values.forEach(val => {
      const td = document.createElement('td');
      td.textContent = val;
      tr.appendChild(td);
    });

    // 操作ボタン
    const tdOps = document.createElement('td');
    tdOps.innerHTML = `
      <button onclick="editRow(${rowNum}, ${JSON.stringify(values).replace(/"/g, '&quot;')})">編集</button>
      <button onclick="deleteRow(${rowNum})">削除</button>
    `;
    tr.appendChild(tdOps);

    tbody.appendChild(tr);
  });
}

// 🔹 編集ボタン押下時
function editRow(row, values) {
  document.getElementById('row').value = row;
  [
    'number','title','composer','editor','score','part1',
    'part2','dola','cello','guitar','bass','other'
  ].forEach((id, i) => {
    document.getElementById(id).value = values[i] || '';
  });
}

// 🔹 削除処理
async function deleteRow(row) {
  if (!confirm(`行 ${row} を削除しますか？`)) return;
  const url = `${GAS_URL}?delete=${encodeURIComponent(JSON.stringify([row]))}`;
  const res = await fetch(url);
  const text = await res.text();
  alert(text);
  loadData();
}

// 🔹 保存（追加／更新）
async function saveData() {
  const data = {
    row: document.getElementById('row').value,
    number: document.getElementById('number').value,
    title: document.getElementById('title').value,
    composer: document.getElementById('composer').value,
    editor: document.getElementById('editor').value,
    score: document.getElementById('score').value,
    part1: document.getElementById('part1').value,
    part2: document.getElementById('part2').value,
    dola: document.getElementById('dola').value,
    cello: document.getElementById('cello').value,
    guitar: document.getElementById('guitar').value,
    bass: document.getElementById('bass').value,
    other: document.getElementById('other').value
  };

  const res = await fetch(GAS_URL, {
    method: 'POST',
    body: JSON.stringify(data)
  });
  const text = await res.text();
  alert(text);

  // フォームリセット & 再読み込み
  document.getElementById('dataForm').reset();
  document.getElementById('row').value = '';
  loadData();
}

// 🔹 ページ読み込み時に全件取得
window.onload = () => loadData();
