//basicamente esta página é a responsável para alterar todos os valores necessários aquando da troca de niveis, e verificar se essa mesma troca acontece
//por falta de tempo não iremos comentar toda a página

var comecar = true
var tempoLvL //utilizado para o contador
var tempoAtual = tempoLvL //utilizado para o display ne tempo no
var placasExit = new Image()
placasExit.src = 'imgs/spriteexit1.png'


function desenharPlacasExit() {
    if (mundo.nivel==1) {
        canvasBuffer.drawImage(placasExit, 303,55 , mundo.tamanho_tile, mundo.tamanho_tile)
    }
    else if (mundo.nivel==3) {
        canvasBuffer.drawImage(placasExit, 303,25 , mundo.tamanho_tile, mundo.tamanho_tile)
    }
    else if (mundo.nivel==5) {
        canvasBuffer.drawImage(placasExit, 255,155, mundo.tamanho_tile, mundo.tamanho_tile)
    }
    else if (mundo.nivel==6) {
        canvasBuffer.drawImage(placasExit, 303,135 , mundo.tamanho_tile, mundo.tamanho_tile)
    }
    else if (mundo.nivel==8) {
        canvasBuffer.drawImage(placasExit, 303,32 , mundo.tamanho_tile, mundo.tamanho_tile)
    }
}
function temporizador(tempo) {
    
    if (comecar == true) {

        timer= setInterval(function() {
            tempo--
            tempoAtual = tempo
            
            if (tempo<=0) {
                clearInterval(timer)
                alert('ACABOU O TEMPO') //deixámos com alert por falta de tempo, queriamos fazer interface gráfica
                setTimeout(function () {
                    window.location.reload(false); //Se chegar a 0, volta ao nivel 1 o ak'ua tornou-se num microplastico 
                }, 1);
                      
            }
            
        }, 1000);
        
        
    }
}
    function desenharTempo(tempo) {
        let relogio = new Image()
        relogio.src = 'imgs/hourglass.png'
        
        if (mundo.nivel==1 || mundo.nivel==3 || mundo.nivel==5 || mundo.nivel==6) {
        
            canvasVisual.font = 0.00002 * window.innerWidth * window.innerHeight + "px Arial Black";
            canvasVisual.fillStyle = "#ff00f5";
            canvasVisual.textAlign = "center";
            canvasVisual.fillText(tempo,  canvasVisual.canvas.width - canvasVisual.canvas.width/13 , canvasVisual.canvas.height/11);
            canvasVisual.drawImage(relogio,canvasVisual.canvas.width - canvasVisual.canvas.width/12 - canvasVisual.canvas.width/18   ,canvasVisual.canvas.height/11 - ((0.00003 * window.innerWidth * window.innerHeight)/1.5), 0.00003 * window.innerWidth * window.innerHeight, 0.00003 * window.innerWidth * window.innerHeight)
        }if(mundo.nivel==8){
            canvasVisual.font = 0.00002 * window.innerWidth * window.innerHeight + "px Arial Black";
            canvasVisual.fillStyle = "#ff00f5";
            canvasVisual.textAlign = "center";
            canvasVisual.fillText(tempo,  canvasVisual.canvas.width - canvasVisual.canvas.width/10 , canvasVisual.canvas.height/16);
            canvasVisual.drawImage(relogio,canvasVisual.canvas.width - canvasVisual.canvas.width/9 - canvasVisual.canvas.width/18   ,canvasVisual.canvas.height/16 - ((0.00003 * window.innerWidth * window.innerHeight)/1.5), 0.00003 * window.innerWidth * window.innerHeight, 0.00003 * window.innerWidth * window.innerHeight) 
        }else{

        }
            

    }

function mudarNivel(nivel) {
     //mudança dos arrays de mapa e colisão e dos paths das imagem de fundo/sprites consoante o nível atual
    switch (nivel) {
        case 1: //Fabrica
            
            
            comecar = false
            mundo.numTilesImagem_porLinha = 12
            mundo.mapa = 
               [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 
                00, 00, 00, 00, 00, 00, 00, 37, 38, 39, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 
                00, 00, 00, 37, 38, 39, 00, 00, 00, 00, 00, 00, 40, 00, 40, 00, 00, 00, 00, 00, 
                40, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 40, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 01, 02,
                02, 02, 03, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 13, 14,
                14, 14, 15, 00, 00, 01, 03, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 13, 14,
                14, 14, 15, 00, 00, 13, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 13, 14,
                14, 14, 15, 00, 00, 13, 15, 00, 01, 02, 02, 02, 03, 00, 00, 00, 00, 00, 13, 14,
                14, 14, 30, 02, 02, 31, 30, 02, 31, 14, 14, 14, 30, 02, 02, 02, 02, 02, 31, 14,
                14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14]

            mundo.mapa_colisao = 
               [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 13, 05, 07, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 13, 05, 07, 00, 00, 00, 00, 00, 00, 15, 00, 15, 00, 00, 00, 00, 00,
                15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 09, 01,
                01, 01, 03, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 08, 00,
                00, 00, 02, 00, 00, 09, 03, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 08, 00,
                00, 00, 02, 00, 00, 08, 02, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 08, 00,
                00, 00, 02, 00, 00, 08, 02, 00, 09, 01, 01, 01, 03, 00, 00, 00, 00, 00, 08, 00,
                00, 00, 00, 01, 01, 00, 00, 01, 00, 00, 00, 00, 00, 01, 01, 01, 01, 01, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00]
            
            
            mundo.fundo = function() {
                    this.imagem = new Image();
                    this.imagem.src = 'imgs/nivel1.png';
                    return this.imagem  
                }

            mundo.imagem_tile_sheet = function() {
                    this.imagem = new Image();
                    this.imagem.src = 'imgs/sprite.png'
                    return (this.imagem)
                }
            
            
            //passar de nivel
            if (jogador.x>300 && jogador.y>50 && jogador.y<80 && recolhidos==3) {
                MusicaLvL1.pause()
                mundo.nivel = 2
                MusicaTr1.play()
                jogador.x = 3
                jogador.y=150
                clearInterval(timer) //parar o temporizador do nivel 1
            }
            break;



        case 2: //transição
            comecar = false
            mundo.numTilesImagem_porLinha = 20
            mundo.mapa = 
               []

            mundo.mapa_colisao = 
               [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
            
            
            mundo.fundo = function() {
                    this.imagem = new Image();
                    this.imagem.src = 'imgs/transicao1.png';
                    return this.imagem  
                }

            mundo.imagem_tile_sheet = function() {
                    this.imagem = new Image();
                    this.imagem.src = 'imgs/sprite-transicao1.png'
                    return (this.imagem)
                }

            //passar de nivel
            if (jogador.x>300 && jogador.y<192 && jogador.y>-1 ) {
                MusicaTr1.pause()
                mundo.nivel = 3
                MusicaLvL2.play()
                jogador.x = 30
                jogador.y=120
                tempoLvL = 300   // tempo que vai estar disponivel no próximo nivel
                tempoAtual = 300
                comecar = true //comecar proximo temporizador com o valor de tempo acima referido
            }
            break;



        case 3: //Frigorifico
        comecar = false
        mundo.numTilesImagem_porLinha = 12
            mundo.mapa = 
               [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 37, 38, 38, 38, 39, 00, 00, 00, 00, 00, 00, 
                00, 00, 40, 00, 00, 00, 37, 39, 00, 00, 00, 00, 00, 00, 00, 40, 00, 00, 00, 00, 
                00, 00, 00, 40, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 40, 00, 00, 40, 
                00, 00, 00, 00, 40, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 40, 00, 00, 40, 00, 00, 40, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 40, 00, 00, 00,
                03, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                15, 00, 00, 00, 00, 40, 00, 00, 40, 00, 00, 37, 09, 39, 00, 00, 00, 00, 00, 00,
                15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 16, 00, 00, 00, 00, 00, 00, 00,
                30, 02, 02, 03, 00, 00, 00, 00, 00, 00, 00, 00, 16, 00, 00, 00, 00, 00, 00, 00]

            mundo.mapa_colisao = 
                [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 15, 15, 15, 15, 00, 00, 00, 00, 00, 00, 
                00, 00, 15, 00, 00, 00, 15, 15, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 00, 
                00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 15, 
                00, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 15, 00, 00, 15, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00,
                15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                15, 00, 00, 00, 00, 15, 00, 00, 15, 00, 00, 15, 15, 15, 00, 00, 00, 00, 00, 00,
                15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00,
                15, 15, 15, 15, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00]

            mundo.fundo = function() {
                this.imagem = new Image();
                this.imagem.src = 'imgs/nivel2.png';
                return this.imagem  
            }
            mundo.imagem_tile_sheet = function() {
                this.imagem = new Image();
                this.imagem.src = 'imgs/sprite2.png'
                return (this.imagem)
            }
            
            //passar de nivel
            if (jogador.x>300 && jogador.y>30 && jogador.y<45 && recolhidos==3) {
                MusicaLvL2.pause()
                mundo.nivel = 4
                MusicaTr2.play()
                jogador.x = 0
                jogador.y=160
                clearInterval(timer) // parar o temporizador do lvl frigorifico
                comecar = false //não comeca um novo pois a seguir é transicao
            }
            break;



            case 4: //transição
            comecar = false
            mundo.mapa = 
               []

            mundo.mapa_colisao = 
               [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
            
            
            mundo.fundo = function() {
                    this.imagem = new Image();
                    this.imagem.src = 'imgs/transicao2.png';
                    return this.imagem  
                }

            mundo.imagem_tile_sheet = function() {
                    this.imagem = new Image();
                    this.imagem.src = 'imgs/sprite.png'
                    return (this.imagem)
                }

            //passar de nivel
            if (jogador.x>300 && jogador.y<192 && jogador.y>-1 ) {
                MusicaTr2.pause()
                mundo.nivel = 5
                MusicaLvL3.play()
                jogador.x = 16//20
                jogador.y=0//100
                tempoLvL = 150
                tempoAtual = 150
                comecar = true
                
            }
            break;

        case 5: //Doca
            comecar = false
            mundo.numTilesImagem_porLinha = 3
            mundo.mapa = 
            [00, 00, 00, 00, 02, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 02, 00, 00, 00, 00, 00, 00, 02, 00, 00, 00, 02, 02, 00, 00, 02, 
                02, 02, 00, 00, 02, 02, 00, 00, 02, 02, 02, 02, 00, 02, 00, 00, 02, 00, 00, 00,
                02, 02, 02, 00, 02, 00, 00, 00, 00, 00, 00, 02, 00, 00, 00, 00, 02, 02, 00, 00, 
                00, 00, 00, 00, 00, 00, 00, 02, 00, 00, 00, 02, 00, 00, 00, 02, 02, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 02, 00, 00, 00, 00, 02, 00, 00, 02, 
                00, 02, 00, 00, 02, 00, 02, 02, 02, 02, 02, 02, 02, 00, 02, 00, 02, 02, 02, 02,
                00, 00, 02, 00, 00, 00, 00, 00, 00, 00, 00, 02, 00, 00, 02, 02, 02, 02, 02, 02, 
                00, 00, 02, 00, 00, 00, 00, 00, 00, 00, 00, 02, 00, 02, 02, 00, 00, 00, 00, 00,
                02, 00, 00, 00, 02, 00, 00, 02, 02, 00, 00, 02, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 02, 02, 00, 00, 08, 08, 08, 08, 00, 
                00, 02, 02, 00, 00, 00, 00, 00, 00, 00, 00, 02, 02, 02, 02, 07, 07, 07, 07, 00]

            mundo.mapa_colisao = 
            [00, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 15, 15, 00, 00, 15, 
                15, 15, 00, 00, 15, 15, 00, 00, 15, 15, 15, 15, 00, 15, 00, 00, 15, 00, 00, 00,
                15, 15, 15, 00, 15, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 00, 15, 15, 00, 00, 
                00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 15, 00, 00, 00, 15, 15, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 00, 15, 00, 00, 15, 
                00, 15, 00, 00, 15, 00, 15, 15, 15, 15, 15, 15, 15, 00, 15, 00, 15, 15, 15, 15,
                00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 15, 15, 15, 15, 15, 05, 
                00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 15, 15, 00, 00, 00, 00, 00,
                15, 00, 00, 00, 15, 00, 00, 15, 15, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 15, 00, 00, 00, 00, 00, 00, 00, 
                00, 15, 15, 00, 00, 00, 00, 00, 00, 00, 00, 15, 15, 15, 15, 15, 15, 15, 15, 00]

            mundo.fundo = function() {
                this.imagem = new Image();
                this.imagem.src = 'imgs/nivel3.png';
                return this.imagem  
            }
            mundo.imagem_tile_sheet = function() {
                this.imagem = new Image();
                this.imagem.src = 'imgs/sprite3.png'
                return (this.imagem)
            }
            
            //passar de nivel
            if (jogador.x>260 && jogador.y>155 && jogador.y<161 && recolhidos==3) {
                MusicaLvL3.pause()
                mundo.nivel = 6
                MusicaLvL4.play()
                jogador.x = 0
                jogador.y=32
                clearInterval(timer)
                tempoLvL = 150
                tempoAtual = 150
                comecar = true
                
            }
            break;

            
        case 6: //Mar
            comecar = false
            mundo.numTilesImagem_porLinha = 11 // fix para a sprite que tem menos colunas que os outros
            mundo.mapa = 
            [ 00,  00,  00,  00,  00,  00,  00,  00,  00,  00,  00,  00,  00,  00,  00,  00,  00,  00,  00,  00,
                65,  65,  65,  00,  00,  00,  00,  00,  65,  65,  65,  65,  65,  65,  00,  00,  00,  00,  00,  00, 
                76,  76,  76,  65,  65,  65,  65,  65,  65, 103, 109, 109, 109,  65,  65,  65,  65,  65,  65,  65,
                75,  75,  75,  46,  45,  46,  45,  46,  45, 100, 101, 101, 102,  45,  46,  45,  46,  45,  46,  45, 
                47,  47,  47,  47,  47,  17,  24,  24,  24,  24,  24,  24,  24,  24,  25,  47,  47,  47,  23,  18, 
                17,  24,  25,  47,  47,  14,  47,  47,  47,  47,  47,  47,  47,  47,  47,  47,  37,  47,  47,  12, 
                14,  47,  47,  47,  47,  47,  47,  47,  47,  47,  47,  47,  47,  17,  18,  47,  47,  47,  47,  12,
                47,  47,  47,  47,  47,  47,  47,  47,  47,  47,  37,  47,  47,  28,  29,  47,  47,  47,  47,  12,  
                36,  47,  37,  47,  47,  34,  36,  47,  47,  47,  47,  47,  47,  47,  47,  47,  47,  47,  47,  47,
                47,  47,  47,  47,  47,  47,  47,  47,  47,  47,  47,  47,  37,  47,  47,  47,  47,  47,  47,  47,
                47,  47,  47,  47,  48,  47,  47,  47,  47,  47,  48,  47,  47,  47,  47,  47,  47,  47,  47,  12,
                47,  47,  48,  47,  47,  47,  48,  48,  47,  47,  47,  47,  47,  47,  47,  01,  02,  02,  02,  29]

            mundo.mapa_colisao = 
            [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 15, 15, 15, 00, 00, 00, 00, 00, 00, 00,
                15, 15, 15, 00, 00, 00, 00, 00, 00, 15, 15, 15, 15, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 00, 00, 00, 15, 15,
                15, 15, 15, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 15,
                15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 15, 00, 00, 00, 00, 15,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 15, 15, 00, 00, 00, 00, 15,
                15, 00, 15, 00, 00, 15, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 16, 00, 00, 00, 00, 00, 16, 00, 00, 00, 00, 00, 00, 00, 00, 15,
                00, 00, 16, 00, 00, 00, 16, 16, 00, 00, 00, 00, 00, 00, 00, 15, 15, 15, 15, 15,]
            
            
            mundo.fundo = function() {
                this.imagem = new Image();
                this.imagem.src = 'imgs/nivel4.png';
                return this.imagem  
            }
            mundo.imagem_tile_sheet = function() {
                this.imagem = new Image();
                this.imagem.src = 'imgs/sprite4.png'
                return (this.imagem)
            }
            
            //passar de nivel
            if (jogador.x>300 && jogador.y>142 && jogador.y<150 && recolhidos==3) {~
                MusicaLvL4.pause()
                mundo.nivel = 7
                MusicaTr3.play()
                jogador.x = 0
                jogador.y=0
                clearInterval(timer)
                comecar= false
            }
            break;

            case 7: //transição
            comecar = false
            mundo.mapa = 
               []

            mundo.mapa_colisao = 
               [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
            
            
            mundo.fundo = function() {
                    this.imagem = new Image();
                    this.imagem.src = 'imgs/transicao3.png';
                    return this.imagem  
                }

            mundo.imagem_tile_sheet = function() {
                    this.imagem = new Image();
                    this.imagem.src = 'imgs/sprite.png'
                    return (this.imagem)
                }

            //passar de nivel
            if (jogador.x>165 && jogador.y<192 && jogador.y>-1 ) {
                MusicaTr3.pause()
                mundo.nivel = 8
                MusicaLvL5.play()
                jogador.x =36//20
                jogador.y=0//100
                tempoLvL = 300
                tempoAtual = 300
                comecar = true
            }
            break;

        case 8: //Baleia
            comecar = false
            mundo.numTilesImagem_porLinha = 11 // fix para a sprite que tem menos colunas que os outros
            mundo.mapa = 
               [14, 00, 00, 04, 00, 00, 00, 00, 00, 00, 00, 00, 54, 37, 00, 00, 00, 00, 00, 00,
                14, 00, 34, 41, 00, 00, 54, 04, 54, 54, 54, 54, 54, 00, 00, 00, 00, 00, 37, 00,
                14, 00, 00, 48, 37, 00, 00, 15, 54, 54, 37, 54, 54, 54, 54, 54, 54, 00, 00, 00,
                50, 36, 00, 04, 00, 00, 54, 26, 54, 37, 54, 54, 55, 37, 54, 55, 54, 54, 34, 07, 
                14, 00, 00, 15, 00, 00, 37, 54, 54, 54, 54, 00, 00, 00, 00, 00, 37, 00, 54, 12,
                14, 55, 34, 41, 00, 00, 00, 37, 54, 37, 54, 00, 00, 00, 00, 54, 54, 00, 00, 12, 
                14, 00, 00, 54, 04, 54, 54, 54, 54, 00, 00, 34, 36, 00, 00, 00, 37, 00, 00, 12,
                50, 36, 00, 34, 42, 35, 09, 35, 35, 35, 36, 54, 54, 34, 36, 00, 00, 00, 00, 12,
                14, 00, 00, 00, 00, 00, 15, 00, 54, 54, 54, 54, 54, 54, 00, 00, 00, 54, 34, 40, 
                14, 00, 37, 00, 00, 00, 26, 00, 00, 37, 00, 37, 00, 34, 36, 54, 54, 54, 55, 55,
                14, 00, 00, 00, 37, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 37, 55, 55, 
                25, 54, 54, 54, 54, 54, 37, 54, 37, 54, 54, 54, 54, 54, 54, 54, 54, 54, 55, 55]

            mundo.mapa_colisao = 
               [15, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00,
                15, 00, 15, 15, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00,
                15, 00, 00, 00, 15, 00, 00, 15, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                15, 15, 00, 15, 00, 00, 00, 15, 00, 15, 00, 00, 00, 15, 00, 00, 00, 00, 15, 15, 
                15, 00, 00, 15, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 15,
                15, 00, 15, 15, 00, 00, 00, 15, 00, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 
                15, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 15, 15, 00, 00, 00, 15, 00, 00, 15,
                15, 15, 00, 15, 15, 15, 15, 15, 15, 15, 15, 00, 00, 15, 15, 00, 00, 00, 00, 15,
                15, 00, 00, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 15, 
                15, 00, 15, 00, 00, 00, 14, 00, 00, 15, 00, 15, 00, 15, 15, 00, 00, 00, 00, 00,
                15, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 
                15, 00, 00, 00, 00, 00, 15, 00, 15, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00]
            
            
            mundo.fundo = function() {
                this.imagem = new Image();
                this.imagem.src = 'imgs/nivel5.png';
                return this.imagem  
            }
            mundo.imagem_tile_sheet = function() {
                this.imagem = new Image();
                this.imagem.src = 'imgs/sprite5.png'
                return (this.imagem)
            }
            
            //passar de nivel
            if (jogador.x>300 && jogador.y>15 && jogador.y<45 && recolhidos==3) {
                MusicaLvL5.pause()
                mundo.nivel = 9
                MusicaFim.play()
                jogador.x = 288
                jogador.y=10
                clearInterval(timer)
                comecar= false
            }
            break;

            case 9: //transição
            comecar = false
            mundo.mapa = 
               []

            mundo.mapa_colisao = 
               [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 15, 15,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 15, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 00,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                00, 00, 00, 00, 00, 00, 00, 15, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
            
            
            mundo.fundo = function() {
                    this.imagem = new Image();
                    this.imagem.src = 'imgs/transicao44.png';
                    return this.imagem  
                }

            mundo.imagem_tile_sheet = function() {
                    this.imagem = new Image();
                    this.imagem.src = 'imgs/sprite.png'
                    return (this.imagem)
                }
            if (jogador.x<48 && jogador.y>80 && jogador.y<190 && recolhidos==3) {
                mundo.nivel = 10

                jogador.x = 200
                jogador.y=0
                jogador.velY = 0
                jogador.velX = 0
                clearInterval(timer)
                comecar= false
                
                
            }
            
            break;


            case 10: //final
            let reset = new Image()
            reset.src = 'imgs/reset.png'
            comecar = false
            mundo.mapa = 
               []

            mundo.mapa_colisao = 
               [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 15,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 15,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 15,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 15, 15,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 15, 15,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 15, 15,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 15, 15,
                00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                00, 00, 00, 00, 00, 00, 00, 15, 15, 00, 00, 15, 15, 15, 15, 15, 15, 15, 15, 00,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
            
            canvasBuffer.drawImage(reset,80,canvasBuffer.canvas.height/2 -canvasBuffer.canvas.width/16,canvasBuffer.canvas.width/8, canvasBuffer.canvas.width/8)
            document.getElementById('canvas').onclick = function() { //ao clicar somos reciclados e voltamos ao inicio da ornada
                window.location="index.html";
                //window.location.reload(false)
            }
            mundo.fundo = function() {
                    this.imagem = new Image();
                    this.imagem.src = 'imgs/transicaofinal.png';
                    return this.imagem  
                }

            mundo.imagem_tile_sheet = function() {
                    this.imagem = new Image();
                    this.imagem.src = 'imgs/sprite.png'
                    return (this.imagem)
                }
            /*if (jogador.x>300 && jogador.y>15 && jogador.y<45) {
                mundo.nivel = 9
                jogador.x = 250
                jogador.y=30
                clearInterval(timer)
                comecar= false
                
            }*/
            
            break;
     
          
    }

}