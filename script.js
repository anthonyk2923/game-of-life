var started = false;
var timer;
var speed = 250
var row = 23;
var col = 25;
var cur = [row]
var next = [row]

function getfriends(r, c) {
  var count = 0;
  if (r != 0) {
    if (c != 0 && cur[r - 1][c - 1] == 1) count += 1;
    if (cur[r - 1][c] == 1) count += 1;
    if (c != col - 1 && cur[r - 1][c + 1] == 1) count += 1;

  }
  if (c != 0 && cur[r][c - 1] == 1) count += 1;
  if (c != col - 1 && cur[r][c + 1] == 1) count += 1;
  if (r != row - 1) {
    if (c != 0 && cur[r + 1][c - 1] == 1) count += 1;
    if (cur[r + 1][c] == 1) count += 1;
    if (c != col - 1 && cur[r + 1][c + 1] == 1) count += 1;
  }
  return (count)
}

function listgen() {
  for (z = 0; z < row; z += 1) {
    cur[z] = [col];
    next[z] = [col];
  }
}

function innerval() {
  for (var y = 0; row > y; y += 1) {
    for (var x = 0; col > x; x += 1) {
      cur[y][x] = 0
      next[y][x] = 0


    }
  }
}

function createworld() {

  var world = document.querySelector('#world');

  let tbl = document.createElement('table');
  tbl.setAttribute('id', 'worldgrid');

  for (var i = 0; i < row; i += 1) {
    var tr = document.createElement('tr');
    for (var j = 0; j < col; j += 1) {
      var tc = document.createElement('td');
      tc.setAttribute('class', 'dead');
      tc.addEventListener("click", changecell);
      tc.setAttribute('id', i + "_" + j);
      tr.appendChild(tc);
    }
    tbl.appendChild(tr)
  }
  world.appendChild(tbl)
}

function changecell() {
  var loc = this.id.split("_")
  var r = Number(loc[0])
  var c = Number(loc[1])
  if (this.className == "alive") {
    this.setAttribute("class", "dead")
    cur[r][c] = 0


  } else {
    this.setAttribute("class", "alive")
    cur[r][c] = 1
  }

  // console.log(cur)

}

function creatnextgen() {
  for (var r = 0; r < row; r++) {
    for (var c = 0; c < col; c++) {
      var friends = getfriends(r, c)
      if (cur[r][c] == 1) {
        if (friends < 2) {
          next[r][c] = 0
        }
        if (friends >= 4) {
          next[r][c] = 0
        } if(friends==2||friends==3){
          next[r][c] = 1
        }
      }
      if (cur[r][c] == 0) {
        if (friends == 3) {
          next[r][c] = 1
        }
      }
    }
  }
}

function curgentonext() {
  for (var y = 0; row > y; y += 1) {
    for (var x = 0; col > x; x += 1) {
      cur[y][x] = next[y][x];
      next[y][x] = 0;
       var cell = document.getElementById(y + '_' + x);

        if (cur[y][x] == 0)
        cell.setAttribute("class",'dead')
        if (cur[y][x] == 1){
          cell.setAttribute("class",'alive')
        }
    }
  }
}
function evolve(){
  creatnextgen()
  curgentonext()
  if (started) {
            timer = setTimeout(evolve, speed);
        }

}

function multievolve(){
  if (started==true){
    started=false;
    clearTimeout(timer);
  }
  else {
    started=true
    evolve()
  }

}

function resetcur(){
  for (var y = 0; row > y; y += 1) {
    for (var x = 0; col > x; x += 1) {
      cur[y][x] = next[y][x];
      next[y][x] = 0;
       var cell = document.getElementById(y + '_' + x);
        cell.setAttribute('class','dead')

        if (cur[y][x] == 1){
          cur[r][c] = 0
          evolve()

        }
    }
  }
  return(true)
}

  window.onload = () => {
    createworld()
    listgen()
    innerval()
    creatnextgen()
  }
