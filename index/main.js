const request = new XMLHttpRequest();
request.open('GET', 'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjIVvM5hz2q-A23mJeGQsN6xWhk54_cK8UJvpzgHX0mXBB_Yp3c6U4Ao_BN6kjk6b5IMfO7WJP0WIUQC__1GMgrO9IMYE75XbP-K7MgJPKMI[...]');
request.responseType = 'json';
request.onload = function () {
    let data = this.response;
    let table = `<table border="1"><thead><tr>
        <th>楽器</th>
        <th>使用者</th>
        <th>購入年</th>
        <th>メーカー</th>
        <th>備品番号</th>
        <th>メモ</th>
    </tr></thead><tbody>`;
    if (Array.isArray(data)) {
        data.forEach(row => {
            table += `<tr>
                <td>${row.instrument || ""}</td>
                <td>${row.user || ""}</td>
                <td>${row.year || ""}</td>
                <td>${row.maker || ""}</td>
                <td>${row.itemId || ""}</td>
                <td>${row.memo || ""}</td>
            </tr>`;
        });
    }
    table += "</tbody></table>";
    document.getElementById('output').innerHTML = table;
};
request.send();
