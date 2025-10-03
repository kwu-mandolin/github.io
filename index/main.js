const request = new XMLHttpRequest();
request.open('GET', 'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjIVvM5hz2q-A23mJeGQsN6xWhk54_cK8UJvpzgHX0mXBB_Yp3c6U4Ao_BN6kjk6b5IMfO7WJP0WIUQC__1GMgrO9IMYE75XbP-K7MgJPKMI00MzMGUV5vUuj8b7GkcXHktEcx-PKO4_we_4w0Vr9yESSbgbOlWqO8xtSYJ8fbHubuZeoqmyfM3s-g59iI7_E1Wak6plG851dIPy9WCOtU90lCXs1linhHT6PBxyAXn1xzpNmrLEadLGtk-ikjAY-NuEMWJpcy7362IsV2rK2FpU-1xig&lib=MKoaYyoemKuw1zE9Sj5faEbUz7p6ufxs_');
request.responseType = 'json';
request.onload = function () {
    let data = this.response;
    console.log(data); 
    document.getElementById('output').innerText = data['date'];
};
request.send();
