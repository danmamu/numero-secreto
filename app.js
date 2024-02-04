let numeroMaximo = 10;
let intentos = 1;
let cantidadMaximaDeIntentos = 4;
let numerosTipados = [];
let numeroSecreto;

function asignarTextoAElementos(elemento, texto){
    let elementoHTML = document.getElementById(elemento);
    elementoHTML.textContent = texto;
    return;
}

function condicionesIniciales(){
    asignarTextoAElementos('titulo_juego', 'Juego del numero Seeeecreto');
    asignarTextoAElementos('subtitulo', `Indica un numero del 1 al ${numeroMaximo}`);

    numeroSecreto = crearNumeroSecreto();
}

function crearNumeroSecreto(){
    numeroSecreto = Math.floor(Math.random() * numeroMaximo) + 1;
    console.log('N° Secreto:', numeroSecreto);
    console.log('N° intentos juego nuevo:', intentos);
    numerosTipados.sort(function(a, b){ return a - b });
            
        document.getElementById('numerosTipados').textContent=`Numeros jugados: ${numerosTipados}`;

    

    let numeroGenerado = numeroSecreto;

    if (numerosTipados.length == numeroMaximo){
        asignarTextoAElementos('subtitulo', `Ya se sortearon todos los numeros posibles`);
    } else {
        if (numerosTipados.includes(numeroGenerado)){
            return crearNumeroSecreto();
        } else {
            numerosTipados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}


function limpiarCaja(){
    document.getElementById('valorUsuario').value = '';
}

function verificarIntento(){
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    console.log('Usuario:', numeroDeUsuario);
    console.log('Secreto', numeroSecreto);
    console.log('intentos:', intentos);
    console.log('---------');

    if (numeroDeUsuario === numeroSecreto && intentos < cantidadMaximaDeIntentos) {
        asignarTextoAElementos('subtitulo', `ES CORRECTO!.. acertaste en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);

        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('verificado').setAttribute('disabled', true);
    } else {
        if (numeroDeUsuario > numeroSecreto && intentos < cantidadMaximaDeIntentos){
            asignarTextoAElementos('subtitulo', `ERROR! el numero secreto es Menor`);
        } if (numeroDeUsuario < numeroSecreto && intentos < cantidadMaximaDeIntentos){
            asignarTextoAElementos('subtitulo', `ERROR! el numero secreto es Mayor`);
        } if(intentos==cantidadMaximaDeIntentos) {

            numerosTipados.pop();
            asignarTextoAElementos('subtitulo', `Acabaste el numero maximo de intentos`);
            console.log(intentos);
            document.getElementById('reiniciar').removeAttribute('disabled');
            document.getElementById('verificado').setAttribute('disabled', true);
        }

        intentos++;
    }
    limpiarCaja();
}



function reiniciarJuego(){
    intentos = 1;
    condicionesIniciales();
    limpiarCaja();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('verificado').removeAttribute('disabled');
}

// Llamar a condicionesIniciales para verificar 4 intentos
condicionesIniciales();
