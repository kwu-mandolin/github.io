const GAS_URL = 'https://script.google.com/macros/s/AKfycbxhLlVS29bH8XLbmBpSNctdSpJ368o0-b3vo3ipsIVgZwrzFF21aGWFx7VAIwNmKJ8Y/exec';

window.onload = function() {
  loadData();
};

function loadData() {
  fetch(GAS_URL)
    .then(response => {
      if (!response.ok) throw new Error("HTTPエラー: " + response.status);
      return response.json();
    })
    .then(data => {
      console.log("取得データ:", data);
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
    .catch(error => console.error("データ取得エラー:", error));
}
