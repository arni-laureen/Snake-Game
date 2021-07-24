window.onload = function() {
  c = document.querySelector('#gc');
  ctx = c.getContext("2d");
  document.addEventListener("keydown", keyPush);
  setInterval(game, 1000/10);
}

px=py=10;   // initial snake position
gs=tc=20;   // grid size and tile count
ax=ay=15;   // initial apple location
xv=yv=0;    // initial velocity
trail=[];   // initial snake body
tail=2;     // initial snake length
score=0;    // initial score

function game() {
  // IF gameover:
  if (is_gameover()) {
    // GAME OVER text
    ctx.font = "60px Share Tech Mono";
    ctx.fillStyle = "#FFF338";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER",200,200);
    // RESTART text
    ctx.font = "16px Share Tech Mono";
    ctx.fillStyle = "#EEEEEE";
    ctx.textAlign = "center";
    ctx.fillText("Press SPACE to play again",200,230);
    return;
  }
  
  // ELSE:
  // Move snake head
  px+=xv;
  py+=yv;
  // Wrap board
  if (px<0) px=tc-1;
  if (px>tc-1) px=0;
  if (py<0) py=tc-1;
  if (py>tc-1) py=0;

  // Draw board
  ctx.fillStyle = "#476072";
  ctx.fillRect(0,0,c.width,c.height);

  // Draw snake
  ctx.fillStyle = "#71EFA3";
  for (var i=0; i<trail.length; i++) {
    ctx.fillRect(trail[i].x*gs, trail[i].y*gs, gs, gs);
    if (trail[i].x==px && trail.y==py) {
      tail = 2;
      score = 0;
    }
  }

  // Move snake
  trail.push({x:px, y:py});
  while (trail.length>tail) {
    trail.shift();
  }
  // If snake eats the apple
  if (ax==px && ay==py) {
    tail++;   // increment snake length
    score++;  // increment score
    // respawn apple
    ax=Math.floor(Math.random()*tc);
    ay=Math.floor(Math.random()*tc);
  }

  // Draw apple
  ctx.fillStyle = "#FF3D68";
  ctx.fillRect(ax*gs, ay*gs, gs, gs);

  // Update score
  document.querySelector('#score').innerText = score;
}

// Controls
function keyPush(evt) {
  switch(evt.keyCode) {
    case 32:  // spacebar
      if (is_gameover()) {
        window.location.reload();
      }
      break;
    case 37:	// left key
      if (xv!=1) {
        xv=-1; 
        yv=0;
      }
      break;
    case 38:	// up key
      if (yv!=1) {
        xv=0; 
        yv=-1;
      }
      break;
    case 39:	// right key
      if (xv!=-1) {
        xv=1; 
        yv=0;
      }
      break;
    case 40:	// down key
      if (yv!=-1) {
        xv=0; 
        yv=1;
      }
      break;
  }
}

// Check if snake has collided with itself
function is_gameover() {
  for (var i=4; i < trail.length; i++) {    
    if (trail[i].x === trail[0].x && trail[i].y === trail[0].y) return true;
  }
}