<html lang="ja">
    <head>
        <title>search</title>
    </head>
    <body>
        <?php 
//初期設定
$dbh = new PDO('mysql40.74.95.167; dbname=DB21241056','21241056','65014212');
//AP全表示
$sql = "SELECT title,composer,arranger FROM AP";
$p = $dbh->query($sql);
$v = $p->fetchAll(PDO::FETCH_ASSOC);
if ($v) {
$sheets = array();
for ($i = 0; $i < count(value: $v); $i++) {
    $sheets[]="{$v[$i]['title']}　作曲者：{$v[$i]['composer']}　編曲者：{$v[$i]['arranger']}" ;
    }
    }
    $count=count(value: $sheets);
    for ($i=0; $i <=$count; $i++) {
    print_r($sheets[$i]."<br>");
    }
?>
 </body>
</html>
