//BUGS: Pickups piscam ao mudar a src

//////////////////////////////
//////////////////////////////
//////////VARIÁVEIS///////////
//////////////////////////////
//////////////////////////////
////////////KEYS/////////////

var estado_Clique
window.onkeydown = function(event) {
    jogador.processa_tecla(event)
    
    
  }
  window.onkeyup = function(event) {
    jogador.processa_tecla(event)
  }
  


//////////////////////////////
//////////////////////////////
//////////CANVAS//////////////
//////////////////////////////
//////////////////////////////

//iniciação dos canvas, precisamos de dois para efetuar o rezise perfeito 
var canvasBuffer = document.createElement("canvas").getContext("2d");
var canvas = document.getElementById('canvas');
var canvasVisual = canvas.getContext('2d');
                
var jogoIniciou = false; // variavel que armazena se o jogo foi iniciado ou nao

var mundo = { //definir de que forma vamos organizar o mundo, número de colunas e linhas e dar o tamanho dos "tiles"
    colunas :20,
    linhas : 12,
    tamanho_tile : 16,
    height : function(){return this.tamanho_tile * this.linhas},
    width : function(){return this.tamanho_tile * this.colunas},
    atrito: 0.9,
    gravidade: 1,
    nivel:1,

    //valores iniciam a null e são redifinidos à medida que os niveis carregam pois variam consoante o nivel atual (na pág mundos.js)
    imagem_tile_sheet: null, 
    numTilesImagem_porLinha: null,
    mapa: null, 
    mapa_colisao:  null,
    fundo: null,

}

var jogador = {

    //propriedade do jogador e movimento do mesmo

    x:270, //posicao inicial do jogador no x, no nivel 1
    y:85, //posicao inicia do jogador no y, no nivel 1
    x_old:null, // necessário para calcular as colisoes com as platafomar
    y_old:null, // necessário para calcular as colisoes com as platafomar
    width: 8,
    height: 15, // não é 16 para não haver problemas nas colisões
    velX: 0,
    velY: 0,

    esq:     false,
    dir:     false,
    cima:    false,
    baixo:   false,
    aSaltar: false,
    limitador: 0, //fix encontrado para previnir o spam de salto enquanto a tecla w está onkeydown, desta forma apenas se salta uma vez 

    //propriedades da animação de sprite do jogador
    srcX: null,
    srcY: null,
    sheetWidth:32,
    sheetHeight:96,

    colunas:4,
    linhas:6,

    frame_width:8,
    frame_height:16,

    frame_atual:0,
    frame_atual_arredondado:0,

    //valores correspondem às linhas do sprite (personagem.png)
    andar_esq:0,
    andar_dir:1,
    saltar_esq:3,
    saltar_dir:2,
    idle_esq:4,
    idle_dir:5,
    cliqueEsq:true, //true de estiver a andar para a Esq, false se Direita para que se escolha a linha da animaçao
    

    ficheiro_jogador: function() {
        imagem = new Image()
        imagem.src = 'imgs/personagem.png'
        return imagem
    },

    update_frame: function () {
        
        jogador.frame_atual = 0.1+jogador.frame_atual  % jogador.colunas;  //se estiver idle a animação é mais lenta
         if(jogador.esq || jogador.dir || jogador.cima)
            jogador.frame_atual = 0.2+jogador.frame_atual  % jogador.colunas;  //se estiver em movimento a animação é mais rápida

      while (jogador.frame_atual > 4) { //fix para o boneco a piscar
        jogador.frame_atual = 0
      }

      jogador.frame_atual_arredondado = parseInt(jogador.frame_atual) //fix para o boneco a piscar 
      
      
      //escolha de qual set de animações usar baseado na direcao atual do player
      jogador.srcX = jogador.frame_atual_arredondado * jogador.frame_width

      if (jogador.cliqueEsq) {//andar para a esquerda
        jogador.srcY = jogador.andar_esq * jogador.frame_height
      }if(!jogador.cliqueEsq){//andar para a direita
        jogador.srcY = jogador.andar_dir * jogador.frame_height
      }if(jogador.aSaltar && jogador.cliqueEsq){//saltar e andar para a esquerda
        jogador.srcY = jogador.saltar_esq * jogador.frame_height
      }if(jogador.aSaltar && !jogador.cliqueEsq){//saltar e andar para a direita
        jogador.srcY = jogador.saltar_dir * jogador.frame_height
      }if (!jogador.dir && !jogador.cliqueEsq) {//idle para a direita
        jogador.srcY = jogador.idle_dir * jogador.frame_height
      }if (!jogador.esq && jogador.cliqueEsq) {//idle para a esquerda
        jogador.srcY = jogador.idle_esq * jogador.frame_height
      }
      
    },
    //desenhar os frames escolhidos no canvas buffer (nao no canvasVisual para se poder fazer resize) 
    desenhar_player: function () {
        jogador.update_frame()
        //drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
        if (mundo.nivel == 10) {
            canvasBuffer.drawImage(this.ficheiro_jogador(), this.srcX, this.srcY, this.frame_width, this.frame_height,this.x, this.y,this.frame_width*5,this.frame_height*5)
        }else
        canvasBuffer.drawImage(this.ficheiro_jogador(), this.srcX, this.srcY, this.frame_width, this.frame_height,this.x, this.y,this.frame_width,this.frame_height)
        
    },


    
    processa_tecla: function(event) {
        
        if (jogoIniciou == true) {
            if (event.type == 'keydown') {
                estado_Clique = true
            }else {
                estado_Clique = false             
            }

            switch (event.key) {
            case ('ArrowRight' ) :
                jogador.dir = estado_Clique
                break;
                
            case ('ArrowLeft' ):
                jogador.esq = estado_Clique
                break;
                
            case ('ArrowUp'):
                jogador.limitador++
                jogador.cima = estado_Clique
                
                    if (estado_Clique == false) {//limitador de spam do salto ao pressionar o w sem largar
                        jogador.limitador = 0
                    } 
                break;
            }
        }else{ //quando o jogo ainda não iniciou
            switch (event.key) {
                case 'Enter':
                    startGame()
                    break;
                
                }
        }
    },

    
 
    
    move_jogador: function () {//movimento efetivo do jogador baseado nas condições verificadas em cima
        
        if (jogador.cima && jogador.aSaltar == false && jogador.limitador == 1) {
            jogador.limitador++
            jogador.velY -= 14;
            jogador.aSaltar = true

        }
        if (jogador.esq) {
            jogador.velX -= 0.2
            jogador.cliqueEsq = true
        }
        if (jogador.dir) {
            jogador.velX += 0.2
            jogador.cliqueEsq = false
        }

        //calcular o movemento com as fisicas definidas
        jogador.velY += mundo.gravidade //gravidade
        //atribuiçao de x_old e y_old antes de dar update para fazer as colisoes com as plataformas
        jogador.x_old = jogador.x;
        jogador.y_old = jogador.y;

        jogador.y += jogador.velY
        jogador.x += jogador.velX

        jogador.velX = jogador.velX* mundo.atrito
        jogador.velY = jogador.velY* mundo.atrito
    

    
        //colisões com as bordas do mapa
        if (jogador.y + jogador.height> canvasBuffer.canvas.height) { //se o jogador cair do mapa 
            morrer() // :_(
          }
        //o resto é apenas para garantir que ele nunca ultrapassa os limites laterais e superior do canvas
        if (jogador.x < 0) {
            jogador.x = 0;
            jogador.velX = 0;

        } 
        if (jogador.x + jogador.width > mundo.width()) {
            jogador.x = mundo.width() - jogador.width  -0.1;
            jogador.velX = 0;
        } 
        if (jogador.y < 0) {
            jogador.y = 0;
            jogador.velY = 0;
            
        }

    //VERIFICAÇÃO DOS CANTOS DO PLAYER E IDENTIFICAÇÃO DE LINHA E COLUNA EM QUE ELE SE ENCONTRA
        
        //TOP LEFT
        let top, left, right, bottom
        
        top    = (Math.floor(getTop(jogador)    / mundo.tamanho_tile));
        left   = Math.floor(getLeft(jogador)   / mundo.tamanho_tile);
        value  = mundo.mapa_colisao[top * mundo.colunas + left];
        //verificacao de colide com a plataforma 
        colidePlat(value, jogador, left * mundo.tamanho_tile, top * mundo.tamanho_tile, mundo.tamanho_tile);
        

        //TOP RIGHT
        top    = Math.floor(getTop(jogador)    / mundo.tamanho_tile);
        right  = Math.floor(getRight(jogador)  / mundo.tamanho_tile);
        value  = mundo.mapa_colisao[top * mundo.colunas + right];
        //verificacao de colide com a plataforma 
        colidePlat(value, jogador, right * mundo.tamanho_tile, top * mundo.tamanho_tile, mundo.tamanho_tile);
        

        //BOTTOM LEFT
        bottom = Math.floor(getBottom(jogador) / mundo.tamanho_tile);
        left   = Math.floor(getLeft(jogador)   / mundo.tamanho_tile);
        value  = mundo.mapa_colisao[bottom * mundo.colunas + left];
        //verificacao de colide com a plataforma 
        colidePlat(value, jogador, left * mundo.tamanho_tile, bottom * mundo.tamanho_tile, mundo.tamanho_tile);
        

        //BOTTOM RIGHT
        bottom = Math.floor(getBottom(jogador) / mundo.tamanho_tile);
        right  = Math.floor(getRight(jogador)  / mundo.tamanho_tile);
        value  = mundo.mapa_colisao[bottom * mundo.colunas + right];
        //verificacao de colide com a plataforma 
        colidePlat(value, jogador, right * mundo.tamanho_tile, bottom * mundo.tamanho_tile, mundo.tamanho_tile);
        
        

        
    },

    
    

}


//////////////////////////////
//////////////////////////////
/////////////RUN//////////////
//////////////////////////////
//////////////////////////////


//////////CANVAS/////////////
canvasBuffer.canvas.height = mundo.height();
canvasBuffer.canvas.width = mundo.width();

handleResize() // Size inicial do canvas
window.addEventListener('resize', handleResize) // quando a janela mudar de tamanho, volta a calcular o tamanho do canvas
intro_screen() // garantir que quando se faz o resize enquanto no introscreen, ele continua presente (fix)

//////////////////////////////
//////////////////////////////
//////////FUNÇÕES/////////////
//////////////////////////////
//////////////////////////////



function resize(width, height, height_width_ratio){ //Verificação do tamanho do janela em relação à ratio do tamanho do jogo
    if(height / width > height_width_ratio){
        canvasVisual.canvas.height = width * height_width_ratio;
        canvasVisual.canvas.width = width;
    }
    else{
        canvasVisual.canvas.height = height;
        canvasVisual.canvas.width = height / height_width_ratio;
    }
    canvasBuffer.imageSmoothingEnabled = false //fix para blur dos assets
    canvasVisual.imageSmoothingEnabled = false //fix para blur dos assets
}

function handleResize (){ // o único propósito desta função é correr a função resize no EventListener
    resize(window.innerWidth - 32, window.innerHeight - 32, mundo.height()/mundo.width())
    
    if(jogoIniciou == false){
        intro_screen()
    }
    
}

function clearCanvas(){
    canvasBuffer.clearRect(0, 0, canvasVisual.canvas.width,  canvasVisual.canvas.height);
}

 //////////Inicio/////////////
 function intro_screen(){ // ecra inicial
    canvasVisual.font = 0.0001 * window.innerWidth * window.innerHeight  + "px Impact";
    canvasVisual.fillStyle = "#ff00f5";
    canvasVisual.textAlign = "center";
    canvasVisual.fillText("REJOURNEY", canvasVisual.canvas.width/2, canvasVisual.canvas.height/2);
    canvasVisual.fillStyle = "#0099CC";
    canvasVisual.font = 0.00002 * window.innerWidth * window.innerHeight  + "px Impact";
    canvasVisual.fillText("Pressiona ENTER para comecar!",canvasVisual.canvas.width/2, canvasVisual.canvas.height/2 + 150);
}

function startGame(){ //quando o jogador clica ENTER
        jogoIniciou = true;
        MusicaLvL1.play() //comeca a musica no lvl 1
        clearCanvas(); 
        
        tempoAtual = 120 //variavel apenas serve para desenhar no canvas o valor do tempo
        temporizador(120) // definir o tempo do nivel 1
	    setInterval(function(){ //engine a correr a 60fps
            clearCanvas();
            loop();
	    }, 1000/60)
    
}
    
//FUNCOES DE DESENHAR NO CANVAS, quando é no buffer é para se fazer o resize , quando é diretamente no visual é para manter a qualidade original da imagem (ex backfrounds)

function desenhar_tileSet() {
    
    for(let index = mundo.mapa.length -1 ; index > -1; --index){
      
        let valor = mundo.mapa[index] -1 ;
        let source_x =           (valor % mundo.numTilesImagem_porLinha)* mundo.tamanho_tile;
        let source_y = Math.floor(valor / mundo.numTilesImagem_porLinha)* mundo.tamanho_tile;
        let destination_x =           (index % mundo.colunas) * mundo.tamanho_tile;
        let destination_y = Math.floor(index / mundo.colunas) * mundo.tamanho_tile;
                    //drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
        canvasBuffer.drawImage(mundo.imagem_tile_sheet(), source_x, source_y, mundo.tamanho_tile, mundo.tamanho_tile, destination_x, destination_y, mundo.tamanho_tile, mundo.tamanho_tile);

      }
}




function desenharFundo() {
    
    canvasVisual.drawImage(mundo.fundo(),0,0,canvasVisual.canvas.width, canvasVisual.canvas.height)
    
}
// desenhar o HUD da quantidade de pickups apanhados 
function desenharRecolhidos(recolhidos) {
    if (mundo.nivel==1 || mundo.nivel==3 || mundo.nivel==5 || mundo.nivel==6) {
        canvasVisual.font = 0.00002 * window.innerWidth * window.innerHeight  + "px Arial Black";
        canvasVisual.fillStyle = "#ff00f5";
        canvasVisual.textAlign = "center";
        canvasVisual.fillText(recolhidos,  canvasVisual.canvas.width/12 , canvasVisual.canvas.height/11);
        canvasVisual.drawImage(lixoApanhado,canvasVisual.canvas.width/12 - canvasVisual.canvas.width/20   ,canvasVisual.canvas.height/11 - ((0.00003 * window.innerWidth * window.innerHeight)/1.5), 0.00003 * window.innerWidth * window.innerHeight, 0.00003 * window.innerWidth * window.innerHeight)
    
    }if(mundo.nivel==8){
        canvasVisual.font = 0.00002 * window.innerWidth * window.innerHeight  + "px Arial Black";
        canvasVisual.fillStyle = "#ff00f5";
        canvasVisual.textAlign = "center";
        canvasVisual.fillText(recolhidos,  canvasVisual.canvas.width/9 , canvasVisual.canvas.height/16);
        canvasVisual.drawImage(lixoApanhado,canvasVisual.canvas.width/9 - canvasVisual.canvas.width/20   ,canvasVisual.canvas.height/16 - ((0.00003 * window.innerWidth * window.innerHeight)/1.5), 0.00003 * window.innerWidth * window.innerHeight, 0.00003 * window.innerWidth * window.innerHeight)
    }else{
        
    }
}



//passar toda a informacao desenhada no canvasBuffer para o canvasVisual , aqui acontece o resize e é o que garante ter as mesmas fisicas independentemente do tamanho da janela
function renderizar() { 
    canvasVisual.drawImage(canvasBuffer.canvas, 0, 0, canvasBuffer.canvas.width, canvasBuffer.canvas.height, 0, 0, canvasVisual.canvas.width, canvasVisual.canvas.height); };


function loop(){// tudo a ser corrido 60x por segundo , a ordem das funções é essencial pois conecta as várias páginas JS 
    
    desenhar_pickUps(mundo.nivel); // posicionar os pickups no mapa
    mudarNivel(mundo.nivel)//chamar a função que está no ficheiro mundos.js para verificar se o jogador passa de nivel
    desenharFundo(); // desenhar o fundo, é necessário 60x por segundo para não haver trail do personagem
    desenhar_tileSet(); 
    desenharPlacasExit() // placas foram um extra adicionado mais tarde no jogo pelo que foi necessário desenhalas separadamente
    jogador.move_jogador(); 
    jogador.desenhar_player(); 
    temporizador(tempoLvL) //correr o temporizador de cada nivel
    //HUD
    desenharRecolhidos(recolhidos)
    desenharTempo(tempoAtual)

    renderizar(); //desenhar tudo do buffer no visual
    
    
}

//////////COLISOES/////////////

//Créditos para o GitUser: frankarendpoth, de onde nos baseámos para fazer as colisoes com as nossas plataformas 

//chamada em cima (jogador.move_jogador), verifica a colisao no tipo de tile definido no array de colisoes
function colidePlat(value, object, tile_x, tile_y, tamanho_tile) { 
    switch(value) { 

        case  1: collidePlatformTop      (object, tile_y            ); break;
        case  2: collidePlatformRight    (object, tile_x + tamanho_tile); break;
        case  3: if (collidePlatformTop  (object, tile_y            )) return;// If there's a collision, we don't need to check for anything else.
                 collidePlatformRight    (object, tile_x + tamanho_tile); break;
        case  4: collidePlatformBottom   (object, tile_y + tamanho_tile); break;
        case  5: if (collidePlatformTop  (object, tile_y            )) return;
                 collidePlatformBottom   (object, tile_y + tamanho_tile); break;
        case  6: if (collidePlatformRight(object, tile_x + tamanho_tile)) return;
                 collidePlatformBottom   (object, tile_y + tamanho_tile); break;
        case  7: if (collidePlatformTop  (object, tile_y            )) return;
                 if (collidePlatformRight(object, tile_x + tamanho_tile)) return;
                 collidePlatformBottom   (object, tile_y + tamanho_tile); break;
        case  8: collidePlatformLeft     (object, tile_x            ); break;
        case  9: if (collidePlatformTop  (object, tile_y            )) return;
                 collidePlatformLeft     (object, tile_x            ); break;
        case 10: if (collidePlatformLeft (object, tile_x            )) return;
                 collidePlatformRight    (object, tile_x + tamanho_tile); break;
        case 11: if (collidePlatformTop  (object, tile_y            )) return;
                 if (collidePlatformLeft (object, tile_x            )) return;
                 collidePlatformRight    (object, tile_x + tamanho_tile); break;
        case 12: if (collidePlatformLeft (object, tile_x            )) return;
                 collidePlatformBottom   (object, tile_y + tamanho_tile); break;
        case 13: if (collidePlatformTop  (object, tile_y            )) return;
                 if (collidePlatformLeft (object, tile_x            )) return;
                 collidePlatformBottom   (object, tile_y + tamanho_tile); break;
        case 14: if (collidePlatformLeft (object, tile_x            )) return;
                 if (collidePlatformRight(object, tile_x            )) return;
                 collidePlatformBottom   (object, tile_y + tamanho_tile); break;
        case 15: if (collidePlatformTop  (object, tile_y            )) return;
                 if (collidePlatformLeft (object, tile_x            )) return;
                 if (collidePlatformRight(object, tile_x + tamanho_tile)) return;
                 collidePlatformBottom   (object, tile_y + tamanho_tile); break;
        case 16: collidePlatformTop      (object, tile_y + 5); break;
  
      }
}

//obter e posicionar o player, estas funcoes sao usadas abaixo
function getBottom(objeto)  { return objeto.y     + objeto.height; }
function getLeft(objeto)  { return objeto.x;                   }
function getRight(objeto)  { return objeto.x     + objeto.width;  }
function getTop(objeto)  { return objeto.y;                   }
function getOldBottom(objeto)  { return objeto.y_old + objeto.height; }
function getOldLeft(objeto)  {return objeto.x_old;               }
function getOldRight(objeto)  { return objeto.x_old + objeto.width;  }
function getOldTop(objeto)  { return objeto.y_old                }
function setBottom(objeto,y) { objeto.y     = y    - objeto.height; }
function setLeft(objeto,x) { objeto.x     = x;                  }
function setRight(objeto,x) { objeto.x     = x    - objeto.width;  }
function setTop(objeto,y) { objeto.y     = y;                  }
function setOldBottom(objeto,y) { objeto.y_old = y    - objeto.height; }
function setOldLeft(objeto,x) { objeto.x_old = x;                  }
function setOldRight(objeto,x) { objeto.x_old = x    - objeto.width;  }
function setOldTop(objeto,y) { objeto.y_old = y;                  }




function collidePlatformBottom(object, tile_bottom) { //o topo do nosso jogador bate no fundo do tile
    
    /*Se o topo do nosso jogador estiver acima do fundo do tile, e no frame anterior o topo do nosso jogador estava abaixo do fundo do tile, 
    supostamente entrámos dentro do tile, por isso redifinimos a posicao do jogador para fora do tile,   */ 
   
    if (getTop(object) < tile_bottom && getOldTop(object) >= tile_bottom) {
  
        setTop(object,tile_bottom);
        object.velY = 0;     
        return true;               
  
      } return false;
}
function collidePlatformLeft(object, tile_left) {
    
    if (getRight(object) > tile_left && getOldRight(object) <= tile_left) {

        setRight(object,tile_left - 0.01);// -0.01 is to fix a small problem with rounding
        object.velX = 0;
        return true;
  
      } return false;
}
function collidePlatformRight(object, tile_right) {

    if (getLeft(object) < tile_right && getOldLeft(object) >= tile_right) {        
        setLeft(object,tile_right);
        object.velX = 0;
        return true;
  
      } return false;
}
function collidePlatformTop(object, tile_top) {
    
    if (getBottom(object) > tile_top && getOldBottom(object) <= tile_top) {

        setBottom(object ,tile_top - 0.01);
        object.velY = 0;
        object.aSaltar    = false;
      
        return true;
    
      } return false;
}


//MORRER
function morrer() { // caso o jogador colida com o fundo do canvas
    
    switch (mundo.nivel) {
        case 3:
            jogador.x = 20
            jogador.y = 150
            jogador.velY = 0
            break;
        case 5:
            jogador.x = 16
            jogador.y = 0
            jogador.velY = 0
            break;
        case 6:
            jogador.x = 0
            jogador.y=32
            jogador.velY = 0
            break;
        case 8:
            jogador.x =36
            jogador.y=0
            jogador.velY = 0
            break;
        default:
            break;
    }
}
