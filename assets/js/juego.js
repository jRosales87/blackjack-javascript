/* 
    C -> Clubs (Tréboles)
    D -> Diamons (Diamantes)
    H -> Hearts (Corazones)
    S -> Spades (Espadas)
*/

const types = ['C','D','H','S']
const specials = ['A','J','Q','K']
let desk = [];
let puntosJ = 0, puntosB = 0;


//Referencias 
const btnPedir = document.querySelector('#btnPedir'),
      btnDetener = document.querySelector('#btnDetener'),
      smalls = document.querySelectorAll('small'),
      jugadorCartas = document.querySelector('#jugador-cartas'),
      bancaCartas = document.querySelector('#banca-cartas');


/*
Este código define una función llamada crearDesk
que crea y devuelve una baraja de cartas mezclada.
*/
const crearDesk = () => {

    for( let i = 2; i <= 10; i++ ){
        for (let type of types) {
            desk.push(`${i}${type}`);
        }
    }
   for (let type of types) {
    for (let special of specials) {
        desk.push(`${special}${type}`);
    }
   }
   desk = _.shuffle(desk);
    return desk; 
}

crearDesk();

const pedirCarta = () => {
    if(desk.length === 0){
        throw 'No hay más cartas';
    }
    return desk.pop();
}

// pedirCarta();

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length-1);
    return ( isNaN(valor) ) ? ((valor == 'A') ? 11 : 10) : valor * 1;
}


const turnoBanca = ( puntosMinimos ) => {

do {
    const carta = pedirCarta();
    let img = document.createElement('img');
    
    puntosB = puntosB + valorCarta( carta );
    smalls[1].innerHTML=puntosB;
    img.src = `assets/cartas/${carta}.png`
    img.classList.add('__carta');
    bancaCartas.append(img);

    if( puntosMinimos > 21 ){
        break;
    }
    
} while ( (puntosB < puntosMinimos) && (puntosMinimos <= 21 ) );




}


// Eventos

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    let img = document.createElement('img');
    
    puntosJ = puntosJ + valorCarta( carta );
    smalls[0].innerHTML=puntosJ;
    img.src = `assets/cartas/${carta}.png`
    img.classList.add('__carta');
    jugadorCartas.append(img);

    
    if( puntosJ > 21 ) {
        console.warn('Perdiste Bro');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoBanca( puntosJ );
    } else if( puntosJ === 21 ){
        console.warn('21, genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoBanca( puntosJ );
    }


})

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoBanca( puntosJ );
})



