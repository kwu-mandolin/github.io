// 🔹 GASのURL（あなたのデプロイURLに置き換えてください）
const GAS_URL = 'https://script.google.com/macros/s/AKfycbwR8BGSzFjvYvhKQ456Eds-zcUPycYT7XxEhA_8jrnp3uytX-gAX2ryNJTJzybxnyqy/exec';

// 🔹 ページ読み込み時にスコア一覧を表示
window.onload = function() {
  loadData();
};

// 🔹 データを取得してテーブルに表示
function loadData() {
  fetch(GAS_URL)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('scoreTableBody');
      tableBody.innerHTML = '';
      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.title}</td>
          <td>${row.composer}</td>
          <td>${row.arranger}</td>
          <td>${row.score}</td>
          <td>${row.part1}</td>
          <td>${row.part2}</td>
          <td>${row.dola}</td>
          <td>${row.cello}</td>
          <td>${row.guitar}</td>
          <td>${row.bass}</td>
          <td>${row.others}</td>
        `;
        tableBody.appendChild(tr);
      });
    })
    .catch(error => console.error('fetch GET error:', error));
}

// 🔹 フォーム送信（追加ボタンを押したとき）
document.getElementById('scoreForm').addEventListener('submit', function(e) {
  e.preventDefault(); // ページリロード防止

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  fetch(GAS_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .then(result => {
    if (result.status === 'success') {
      alert('✅ スプレッドシートに追加されました！');
      this.reset(); // フォームをリセット
      loadData();   // テーブル再読み込み
    } else {
      alert('⚠️ 追加に失敗しました。');
    }
  })
  .catch(err => console.error('送信エラー:', err));
});
