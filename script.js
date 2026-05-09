let secret=null,guessCount=0,maxGuess=5;
const $=id=>document.getElementById(id);

const guessLabels=['','هەوڵی یەکەم','هەوڵی دووەم','هەوڵی سێیەم','هەوڵی چوارەم'];

$('enterBtn').onclick=()=>{
  $('startScreen').classList.add('hide');
  $('gameArea').classList.remove('hide');
  const music=$('bgMusic');
  music.volume=0.5;
  music.play();
};

['startBtn','guessBtn'].forEach(id=>setTimeout(()=>$(id).addEventListener('mouseenter',e=>{e.target.style.filter='hue-rotate('+Math.floor(Math.random()*360)+'deg)';}),0));

$('infoBtn').onclick=()=>{
  const box=$('infoBox');
  box.classList.toggle('hide');
};

function resetGame(){
  secret=null; guessCount=0;
  $('secret').value=''; $('guess').value='';
  $('secret').classList.remove('hide');
  $('startBtn').classList.remove('hide');
  $('guessArea').classList.add('hide');
  $('message').className=''; $('message').textContent='';
  $('counter').textContent='';
  $('status').textContent='یاریزانی یەکەم ژمارەکەت تۆماربکە';
  $('status').classList.remove('hide');
  $('infoBtn').classList.remove('hide');
  const rb=$('restartBtn'); if(rb) rb.remove();
  const rn=$('revealNumber'); if(rn) rn.remove();
}

function showRestart(){
  if($('restartBtn')) return;
  const btn=document.createElement('button');
  btn.id='restartBtn'; btn.textContent='دووبارە یاری بکە';
  btn.style.cssText='margin-top:14px;display:block;width:100%';
  btn.addEventListener('mouseenter',e=>{e.target.style.filter='hue-rotate('+Math.floor(Math.random()*360)+'deg)';});
  btn.onclick=resetGame;
  $('message').after(btn);
}

function revealNumber(num){
  if($('revealNumber')) return;
  const div=document.createElement('div');
  div.id='revealNumber';
  div.style.cssText='margin-top:10px;font-size:20px;font-weight:800;opacity:0;transform:scale(0.4) rotate(-8deg);transition:opacity 0.6s ease,transform 0.6s cubic-bezier(.17,.67,.35,1.4);color:#f7e7a1;';
  div.textContent='ژمارە راستەکە ئەمە بوو: '+num;
  $('message').after(div);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    div.style.opacity='1';
    div.style.transform='scale(1) rotate(0deg)';
  }));
}

$('startBtn').onclick=()=>{
  let n=parseInt($('secret').value);
  if(isNaN(n)||n<0||n>100){$('message').textContent='ژمارە هەڵەیە، تکایە ژمارەیەک هەڵبژێرە لە نێوان 0-100'; return;}
  secret=n; $('secret').classList.add('hide'); $('startBtn').classList.add('hide');
  $('infoBtn').classList.add('hide'); $('infoBox').classList.add('hide');
  $('guessArea').classList.remove('hide');
  $('status').textContent='یاریزانی دووەم ژمارەکە بدۆزەوە';
  guessCount=1; $('counter').textContent=guessLabels[1];
  $('message').textContent='یاری دەستی پێکرد!';
}

$('guessBtn').onclick=()=>{
  let g=parseInt($('guess').value); if(isNaN(g)) return;
  if(g<0||g>100){$('message').textContent='ژمارە هەڵەیە، تکایە ژمارەیەک هەڵبژێرە لە نێوان 0-100'; $('guess').value=''; return;}
  let d=g-secret;
  if(d===0){$('message').className='win'; $('message').textContent='پیرۆزە ژمارەکەت دۆزیەوە!'; $('status').classList.add('hide'); showRestart(); return;}
  if(guessCount>=maxGuess){
    $('message').className='win'; $('message').textContent='بەداخەوە ژمارەکەت نەدۆزیەوە!';
    $('counter').textContent='یاریەکە تەواوبوو';
    $('guessArea').classList.add('hide');
    revealNumber(secret);
    showRestart();
    return;
  }
  $('message').className='';
  if(d>25)$('message').textContent='ژمارە راستەکە زۆر کەمترە';
  else if(d>10)$('message').textContent='ژمارە راستەکە کەمترە';
  else if(d>0)$('message').textContent='ژمارە راستەکە تۆزێک کەمترە';
  else if(d<-25)$('message').textContent='ژمارە راستەکە زۆر زیادترە';
  else if(d<-10)$('message').textContent='ژمارە راستەکە زیادترە';
  else $('message').textContent='ژمارە راستەکە تۆزێک زیادترە';
  guessCount++;
  $('counter').textContent = guessCount===5 ? 'هەوڵی کۆتایی' : guessLabels[guessCount];
  $('status').classList.add('hide');
  $('guess').value='';
}
