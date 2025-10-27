// 🔹 あなたのGAS WebアプリURLをここに入れる
const GAS_URL = 'https://script.google.com/macros/s/AKfycbz9VWID9NwsVnisdQ-9aqVTsGQM81iY96HPU3NLFKZo1s2KTkjH5o67IKTTUdG6E8Xd/exec';

// ページ読み込み時にデータ取得
window.onload = function() {
  fetch(GAS_URL)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        displayTable(data.data);
      } else {
        console.error('データ取得失敗');
      }
    })
    .catch(error => {
      console.error('通信エラー:', error);
    });
};

// 🔸 テーブルにデータを表示する関数
function displayTable(scores) {
  const tbody = document.getElementById('scoreBody');
  tbody.innerHTML = ''; // 一旦クリア

  scores.forEach(score => {
    const tr = document.createElement('tr');

    const keys = ["番号", "曲名", "作曲者", "編曲者", "総譜", "1st", "2nd", "dola", "cello", "guitar", "bass", "other"];
    keys.forEach(key => {
      const td = document.createElement('td');
      td.textContent = score[key] || '';
      td.style.wordBreak = "break-word"; // セル内でも折り返し
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
}
