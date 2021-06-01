//変数初期値設定
//画面消去ボタン
var btn = document.getElementById('btn-social-giza-eraser');
//ダウンロードボタン
var btn2 = document.getElementById('btn-social-giza-arrow-down');
//ダウンロードナンバー
var dnum = 1;
var btn3 = document.getElementById('btn-social-giza-circle-left');
var btn4 = document.getElementById('btn-social-giza-circle-right');

//canvasネーム drawDream
var drawDream = document.getElementById('drawDream');


// getContext()は、2d描画するためのコンテキストを取得するメソッド。
// 引数にコンテキストの種類を指定します。二次元グラフィックを描画するためには2d、
// 三次元グラフィックスを描画するためのwebglを使用する。
var ctx = drawDream.getContext('2d');
//クリック座標変数初期値設定。
var mousex, mousey;
//クリックの有効状態変数定義
var clickOnOff = false;
//線カラー初期値
// var color = 0;
var color = 100;

//カラーフラグ
var coflag = true;


//drawDreamキャンバスの縦幅を設定 window.xxxでそれぞれ幅いっぱいまで広げられる
drawDream.width = window.innerWidth - 10;
drawDream.height = window.innerHeight - 10;
//線幅
ctx.lineWidth = 30;
//先端丸く
ctx.lineCap = 'round';
// ctx.lineCap = 'square';



//drawDreamキャンバスに対してaddEventListenerでイベントを設定。aelで予測変換
//addEventListener(イベント発火アクション, 呼び出したい関数 )

//動かした時
drawDream.addEventListener('mousemove', mM);
//マウスを押した時
drawDream.addEventListener('mousedown', mD);
//マウスを離した時
drawDream.addEventListener('mouseup', mU);

//btn全消去ボタン処理
btn.addEventListener('click', clearDraw);
function clearDraw() {
  ctx.clearRect(0, 0, drawDream.width, drawDream.height);
}

//btn2ダウンロードボタン処理
btn2.addEventListener('click', download);
function download() {
  // var canvas = document.getElementById('drawDream');
  var base64 = drawDream.toDataURL("image/png");
  document.getElementById("btn-social-giza-arrow-down").href = base64;
  btn2.download = dnum +'.png';
  dnum++;
}

//マウスを押されている時に呼び出す関数
function mD(e){
  //clientX,Yで座標を取得。
  mousex = e.clientX;
  mousey = e.clientY;
  clickOnOff = true;
}

//マウスを離した時に呼び出す関数。
function mU(e){
  clickOnOff = false;
}

// マウスを動かしている時の関数。マウスが押されている時のみ動作
function mM(e){
    //下記のようにif文内に!を入れるとfalseでreturnできる
    if(!clickOnOff) return;
  //線幅設定
  var rand = Math.random() * 30;
  if(rand < 10){
    rand += 10;
  }else{
    rand = rand;
  }
  // ドット強弱
  // if(rand > 50){
  //   rand = 5;
  // }else if( rand > 60 ){
  //   rand = 16;
  // }else{
  //   rand = rand;
  // }
  ctx.lineWidth = rand;
  // 線のカラースタイル
  //青~緑
  if( coflag === true && color > 200 ){
    color--;
    coflag = false;
  }else if( coflag === false && color >= 101){
    color--;
  }else if( coflag === false && color === 100){
    coflag = true;
  }else{
    color++;
  }
  // 赤から黄色青
  // if( coflag === true && color > 100 ){
  //   color--;
  //   coflag = false;
  // }else if( coflag === false && color >= 1){
  //   color--;
  // }else if( coflag === false && color === 0){
  //   coflag = true;
  // }else{
  //   color++;
  // }
  ctx.strokeStyle = 'hsla( '+color+', 50%, 70%, 90% )';
  //beginPathメソッド.パスのリセットができる。これを設定しないと消しゴムで消せず、色が全て更新される
  ctx.beginPath();
  ctx.moveTo(mousex, mousey);
  ctx.lineTo(e.clientX, e.clientY);
  // ctx.fill();
  ctx.stroke();
  //座標情報を更新し続けるため、再度変数へ格納
  mousex = e.clientX;
  mousey = e.clientY;
}

// ■直線を描画する
// 新しい直線を描画する場合は以下のような流れとなります。
//
//if(!clickOnOff) return;でマウスを離した時に処理を止める
// beginPath()で現在のパスをリセットする
// moveTo(x, y)でパスの開始座標を指定する
// lineTo(x, y)で座標を指定してラインを引く
// stroke()で現在のパスを輪郭表示する

// ■三角形を描画する
// 新しい三角形を描画する場合は以下のような流れとなります。
//
// if(!clickOnOff) return;でマウスを離した時に処理を止める
// beginPath()で現在のパスをリセットする
// moveTo(x, y)でパスの開始座標を指定する
// lineTo(x, y)で座標を指定してラインを引く（一本目の線）
// lineTo(x, y)で座標を指定してラインを引く（二本目の線）
// closePath()でパスを閉じる（三本目の線を引いて図形を閉じる）
// stroke()で現在のパスを輪郭表示する
