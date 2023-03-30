/* 
    C -> Clubs (Tréboles)
    D -> Diamons (Diamantes)
    H -> Hearts (Corazones)
    S -> Spades (Espadas)
*/

const types = ['C','D','H','S']
const specials = ['A','J','Q','K']
let desk = [];


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

pedirCarta();