let secret=null,guessCount=0,maxGuess=5;
const $=id=>document.getElementById(id);
['startBtn','guessBtn'].forEach(id=>setTimeout(()=>$(id).addEventListener('mouseenter',e=>{e.target.style.filter='hue-rotate('+Math.floor(Math.random()*360)+'deg)';}),0));

function resetGame(){
  secret=null; guessCount=0;
  $('secret').value=''; $('guess').value='';
  $('secret').classList.remove('hide');
  $('startBtn').classList.remove('hide');
  $('guessArea').classList.add('hide');
  $('message').className=''; $('message').textContent='';
  $('counter').textContent='';
  $('status').textContent='Player 1 write your number';
  $('bgtext').textContent='✨ FIND THE NUMBER ✨';
  const rb=$('restartBtn'); if(rb) rb.remove();
  const rn=$('revealNumber'); if(rn) rn.remove();
}

function showRestart(){
  if($('restartBtn')) return;
  const btn=document.createElement('button');
  btn.id='restartBtn'; btn.textContent='🔄 Play Again';
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
  div.textContent='🔢 The number was: '+num;
  $('message').after(div);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    div.style.opacity='1';
    div.style.transform='scale(1) rotate(0deg)';
  }));
}

$('startBtn').onclick=()=>{
 let n=parseInt($('secret').value);
 if(isNaN(n)||n<0||n>100){$('message').textContent='❌ Wrong number please choose a number between 0-100'; return;}
 secret=n; $('secret').classList.add('hide'); $('startBtn').classList.add('hide');
 $('guessArea').classList.remove('hide');
 $('status').textContent='Player2 start the game';
 $('bgtext').textContent='✨ GUESS THE NUMBER ✨';
 guessCount=1; $('counter').textContent='Guess 1';
 $('message').textContent='Game started!';
}
$('guessBtn').onclick=()=>{
 let g=parseInt($('guess').value); if(isNaN(g)) return;
 if(g<0||g>100){$('message').textContent='❌ Wrong number please choose a number between 0-100'; $('guess').value=''; return;}
 let d=g-secret;
 if(d===0){$('message').className='win'; $('message').textContent='🎉🥳 Congratulations!'; showRestart(); return;}
 if(guessCount>=maxGuess){
   $('message').className='win'; $('message').textContent='😢💔 You lose! No more chances!';
   $('counter').textContent='Finished';
   $('guessArea').classList.add('hide');
   revealNumber(secret);
   showRestart();
   return;
 }
 $('message').className='';
 if(d>20)$('message').textContent='📈 Toooooooooooo high';
 else if(d>0)$('message').textContent='⬆️ Too high';
 else if(d<-20)$('message').textContent='📉 Toooooooooooo low';
 else $('message').textContent='⬇️ Too low';
 guessCount++;
 $('counter').textContent = guessCount===5 ? '⚠️ Last Chance' : 'Guess '+guessCount;
 $('guess').value='';
}