// 🔹 あなたのGASデプロイURLをここに貼る
const GAS_URL = 'https://script.google.com/macros/s/AKfycbzDrB34jR7jHV6-rC0ZWEJ1WYDfHtfTibxo_nIPsqoFuS2t6fKoTY-PSQ-x0qioretL/exec';

// loadData: データ読み込み（filter: '' | '消除' | 'その他'）
async function loadData(filter = '') {
  try {
    const url = filter ? `${GAS_URL}?filter=${encodeURIComponent(filter)}` : GAS_URL;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    const tbody = document.querySelector('#scoreTable tbody');
    tbody.innerHTML = '';

    json.date.forEach(row => {
      const tr = document.createElement('tr');
      const rowNum = row[0]; // シートの実際の行番号
      const values = row.slice(1); // データ部分（0:番号,1:曲名,...）

      // 行番号セル（目視用）
      const th = document.createElement('th');
      th.textContent = rowNum;
      tr.appendChild(th);

      // データセルを追加
      values.forEach(val => {
        const td = document.createElement('td');
        td.textContent = val;
        tr.appendChild(td);
      });

      // 操作セル（編集・削除）
      const tdOps = document.createElement('td');

      const editBtn = document.createElement('button');
      editBtn.textContent = '編集';
      editBtn.addEventListener('click', () => editRow(rowNum, values));

      const delBtn = document.createElement('button');
      delBtn.textContent = '削除';
      delBtn.addEventListener('click', () => deleteRow(rowNum));

      tdOps.appendChild(editBtn);
      tdOps.appendChild(delBtn);
      tr.appendChild(tdOps);

      tbody.appendChild(tr);
    });
  } catch (err) {
    alert('データ取得エラー: ' + err.message);
    console.error(err);
  }
}

// editRow: 編集ボタン押下時にフォームへデータを流す
function editRow(row, values) {
  document.getElementById('row').value = row;

  const ids = [
    'number','title','composer','editor','score','part1',
    'part2','dola','cello','guitar','bass','other'
  ];

  ids.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.value = values[i] !== undefined && values[i] !== null ? values[i] : '';
  });

  // スクロールしてフォームを見せる（任意）
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// deleteRow: 削除（行番号を配列で送る）
async function deleteRow(row) {
  if (!confirm(`行 ${row} を削除しますか？`)) return;
  try {
    const url = `${GAS_URL}?delete=${encodeURIComponent(JSON.stringify([row]))}`;
    const res = await fetch(url);
    const txt = await res.text();
    alert(txt);
    loadData();
  } catch (err) {
    alert('削除エラー: ' + err.message);
    console.error(err);
  }
}

// saveData: 追加／更新
async function saveData() {
  // 必要なフィールドを収集
  const data = {
    row: document.getElementById('row').value || '',
    number: document.getElementById('number').value || '',
    title: document.getElementById('title').value || '',
    composer: document.getElementById('composer').value || '',
    editor: document.getElementById('editor').value || '',
    score: document.getElementById('score').value || '',
    part1: document.getElementById('part1').value || '',
    part2: document.getElementById('part2').value || '',
    dola: document.getElementById('dola').value || '',
    cello: document.getElementById('cello').value || '',
    guitar: document.getElementById('guitar').value || '',
    bass: document.getElementById('bass').value || '',
    other: document.getElementById('other').value || ''
  };

  if (!data.title) {
    alert('曲名を入力してください。');
    return;
  }

  try {
    const res = await fetch(GAS_URL, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const text = await res.text();
    alert(text);

    resetForm();
    loadData();
  } catch (err) {
    alert('保存エラー: ' + err.message);
    console.error(err);
  }
}

function resetForm() {
  document.getElementById('dataForm').reset();
  document.getElementById('row').value = '';
}

// ページ読み込み時に全件取得
window.onload = () => loadData();
