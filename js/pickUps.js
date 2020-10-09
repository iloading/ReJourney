
var coordenadasPossiveisPickups = []
var lixo = new Image() // reciclagem para apanhar (pickUps)

//variavel para o HUD
var lixoApanhado = new Image()
lixoApanhado.src = 'imgs/lixo2.png' 

let b = 1 //variavel apenas de contagem para dar reset e tambem para a tentativa de eliminar o bug onde os pickups piscam ao trocar de src

setInterval(() => { // mudança da src da imagem para fazer com que o pickup rode
     lixo.src = 'imgs/lixo'+ b +'.png'
     b++
     if (b==4) {
         b=1
     }
 }, 200); 


function armazenarCoordenadas(lvl,x,y,array) { //armazenar em array todas as coordenadas possiveis de onde os pickups podem dar spwan 
    array.push({lvl:lvl , x:x , y:y})
}


//lvl1
armazenarCoordenadas(1,115,144,coordenadasPossiveisPickups  )
armazenarCoordenadas(1,91,96,coordenadasPossiveisPickups    )
armazenarCoordenadas(1,58,144,coordenadasPossiveisPickups   )
armazenarCoordenadas(1,3,80,coordenadasPossiveisPickups     )
armazenarCoordenadas(1,3,48,coordenadasPossiveisPickups     )
armazenarCoordenadas(1,66,32,coordenadasPossiveisPickups    )
armazenarCoordenadas(1,131,16,coordenadasPossiveisPickups   )
armazenarCoordenadas(1,210,48,coordenadasPossiveisPickups   )
armazenarCoordenadas(1,228,32,coordenadasPossiveisPickups   )
armazenarCoordenadas(1,260,48,coordenadasPossiveisPickups   )
//lvl2
armazenarCoordenadas(2,3,112,coordenadasPossiveisPickups    )
armazenarCoordenadas(2,84,128,coordenadasPossiveisPickups   )
armazenarCoordenadas(2,195,128,coordenadasPossiveisPickups  )
armazenarCoordenadas(2,259,96,coordenadasPossiveisPickups   )
armazenarCoordenadas(2,211,64,coordenadasPossiveisPickups   )
armazenarCoordenadas(2,165,64,coordenadasPossiveisPickups   )
armazenarCoordenadas(2,117,64,coordenadasPossiveisPickups   )
armazenarCoordenadas(2,36,16,coordenadasPossiveisPickups    )
armazenarCoordenadas(2,245,16,coordenadasPossiveisPickups   )
armazenarCoordenadas(2,180,0,coordenadasPossiveisPickups    )
//lvl3
armazenarCoordenadas(3,5,128,coordenadasPossiveisPickups      )
armazenarCoordenadas(3,37,96,coordenadasPossiveisPickups      )
armazenarCoordenadas(3,121,128,coordenadasPossiveisPickups      )
armazenarCoordenadas(3,157,80,coordenadasPossiveisPickups      )
armazenarCoordenadas(3,85,16,coordenadasPossiveisPickups      )
armazenarCoordenadas(3,157,16,coordenadasPossiveisPickups      )
armazenarCoordenadas(3,190,80,coordenadasPossiveisPickups      )
armazenarCoordenadas(3,242,48,coordenadasPossiveisPickups      )
armazenarCoordenadas(3,275,80,coordenadasPossiveisPickups      )
armazenarCoordenadas(3,307,0,coordenadasPossiveisPickups      )
//lvl4
armazenarCoordenadas(4,85,112,coordenadasPossiveisPickups      )
armazenarCoordenadas(4,3,112,coordenadasPossiveisPickups      )
armazenarCoordenadas(4,33,165,coordenadasPossiveisPickups      )
armazenarCoordenadas(4,101,165,coordenadasPossiveisPickups      )
armazenarCoordenadas(4,161,149,coordenadasPossiveisPickups      ) 
armazenarCoordenadas(4,163,96,coordenadasPossiveisPickups      )
armazenarCoordenadas(4,261,64,coordenadasPossiveisPickups      )
armazenarCoordenadas(4,305,48,coordenadasPossiveisPickups      )
armazenarCoordenadas(4,177,16,coordenadasPossiveisPickups      )
armazenarCoordenadas(4,273,160,coordenadasPossiveisPickups      )
//lvl5
armazenarCoordenadas(5,53,32,coordenadasPossiveisPickups    )
armazenarCoordenadas(5,52,96,coordenadasPossiveisPickups    )
armazenarCoordenadas(5,100,160,coordenadasPossiveisPickups  )
armazenarCoordenadas(5,276,144,coordenadasPossiveisPickups  )
armazenarCoordenadas(5,148,64,coordenadasPossiveisPickups   )
armazenarCoordenadas(5,116,64,coordenadasPossiveisPickups   )
armazenarCoordenadas(5,100,48,coordenadasPossiveisPickups   )
armazenarCoordenadas(5,69,16,coordenadasPossiveisPickups    )
armazenarCoordenadas(5,116,0,coordenadasPossiveisPickups    )
armazenarCoordenadas(5,210,32,coordenadasPossiveisPickups   )

    //filtrar, de todos os valores no array, aqueles que correspondem ao nivel que queremos e armazenalos noutro array
    itemsLvL1 = coordenadasPossiveisPickups.filter(item => item.lvl == 1)
    itemsLvL2 = coordenadasPossiveisPickups.filter(item => item.lvl == 2)
    itemsLvL3 = coordenadasPossiveisPickups.filter(item => item.lvl == 3)
    itemsLvL4 = coordenadasPossiveisPickups.filter(item => item.lvl == 4)
    itemsLvL5 = coordenadasPossiveisPickups.filter(item => item.lvl == 5)
  
//selecao de , neste caso, 3 valores desses arrays
function selecionarRandom(array,numeroDesejado) {
    let selecionados = []
    for (let i = 0; i < numeroDesejado; i++) {
       selecionados.push(array[Math.floor(Math.random()*array.length)])
    }   
    return selecionados 
}

    selecionados1 = selecionarRandom(itemsLvL1,3)
    selecionados2 = selecionarRandom(itemsLvL2,3)
    selecionados3 = selecionarRandom(itemsLvL3,3)
    selecionados4 = selecionarRandom(itemsLvL4,3)
    selecionados5 = selecionarRandom(itemsLvL5,3)


function desenhar_pickUps(nivel){//desenhar os pickups baseandonos no nivel atual

    
    switch (nivel) {
        case 1://fabrica
        
            for (let i = 0; i < selecionados1.length; i++) {
                x = selecionados1[i].x
                y = selecionados1[i].y

                colidePickUps(x,y,13,13, selecionados1, i)
                canvasBuffer.drawImage(lixo, x ,y, 13 , 13);
                recolhidos = 3 - selecionados1.length
                
                
            }
            break;
        case 3://frigorifico
       
            for (let i = 0; i < selecionados2.length; i++) {
                x = selecionados2[i].x
                y = selecionados2[i].y              
                //drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
                colidePickUps(x,y,13,13, selecionados2, i)
                canvasBuffer.drawImage(lixo, x ,y, 13 , 13);
                recolhidos = 3 - selecionados2.length
            }
            break;
        case 5://doca
        
            for (let i = 0; i < selecionados3.length; i++) {
                x = selecionados3[i].x
                y = selecionados3[i].y    
                colidePickUps(x,y,13,13, selecionados3, i)          
                //drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
                canvasBuffer.drawImage(lixo, x ,y, 13 , 13);
                recolhidos = 3 - selecionados3.length
            }
            break;
        case 6://mar
        
            for (let i = 0; i < selecionados4.length; i++) {
                x = selecionados4[i].x
                y = selecionados4[i].y  
                colidePickUps(x,y,13,13, selecionados4, i)            
                //drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
                canvasBuffer.drawImage(lixo, x ,y, 13 , 13);
                recolhidos = 3 - selecionados4.length
            }
            break;
        case 8://baleia
        
            for (let i = 0; i < selecionados5.length; i++) {
                x = selecionados5[i].x
                y = selecionados5[i].y     
                colidePickUps(x,y,13,13, selecionados5, i)          
                //drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
                canvasBuffer.drawImage(lixo, x ,y, 13 , 13);
                recolhidos = 3 - selecionados5.length
            }
            break;
        default:
            break;
        }
        
    }

//COLISOES COM OS PICKUPS, simple stuff, como fizemos nas aulas
function colidePickUps(lixoX, lixoY, lixoWidth, lixoHeight, array, i) {
        //colisao entre o player e os pickups
        if ((jogador.x + jogador.width >= lixoX && jogador.x + jogador.width<= lixoX+lixoWidth)||(jogador.x >= lixoX && jogador.x <= lixoX+lixoWidth) )   {
            if (jogador.y + jogador.height >= lixoY && jogador.y + jogador.width <= lixoY+lixoHeight) {
                return array.splice(i,1) //retira o pickup com que o player colidiu do array e assim ele não volta a ser desenhado no ecra
            }
        }
        
}

