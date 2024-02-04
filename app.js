
let numeroMaximo=10;
let intentos=1;
let cantidadMaximaDeIntentos=2;
let numerosTipados=[];

//acorta los pasos para repetir el titulo y subtitulo.
function asignarTextoAElementos(elemento,texto){
    let elementoHTML= document.getElementById(elemento);
    elementoHTML.textContent = texto;
    return;
}

function condicionesIniciales(){
    asignarTextoAElementos('titulo_juego','Juego del numero Seeeecreto');
    asignarTextoAElementos('subtitulo',`Indica un numero del 1 al ${numeroMaximo}`);

    let numeroSecreto=crearNumeroSecreto();
    return;
}

function crearNumeroSecreto(){
    numeroSecreto= Math.floor(Math.random()*numeroMaximo)+1;
    console.log('N° Secreto:',numeroSecreto);
    console.log(numerosTipados.sort(function(a, b){return a - b}));

    let numeroGenerado=numeroSecreto;

    // Esta parte es para verificar que se sorteen del 1 al numeromaximo
    if(numerosTipados.length==numeroMaximo){
        asignarTextoAElementos('subtitulo',`Ya se sortearon todos los numeros posibles`);
    }else{
        if(numerosTipados.includes(numeroGenerado)){
            return crearNumeroSecreto();
        }else{
            numerosTipados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
    return;
}

function limpiarCaja(){
    document.getElementById('valorUsuario').value='';
}

function verificarIntento(){
        let numeroDeUsuario= parseInt(document.getElementById('valorUsuario').value);

        console.log('Usuario:',numeroDeUsuario);
        console.log('Secreto',numeroSecreto);


        if (numeroDeUsuario === numeroSecreto &&intentos<cantidadMaximaDeIntentos) {
            asignarTextoAElementos('subtitulo',`ES CORRECTO!.. acertaste en ${intentos} ${intentos==1 ? 'vez' : 'veces'}`);
            document.getElementById('reiniciar').removeAttribute('disabled');
            document.getElementById('verificado').setAttribute('Disabled',true);    

        }else{
            if(numeroDeUsuario>numeroSecreto&&intentos<cantidadMaximaDeIntentos){
                asignarTextoAElementos('subtitulo',`ERROR! el numero secreto es Menor`);
            }if(numeroDeUsuario<numeroSecreto&&intentos<cantidadMaximaDeIntentos){
                asignarTextoAElementos('subtitulo',`ERROR! el numero secreto es Mayor`);
            }else{
                asignarTextoAElementos('subtitulo',`Acabaste el numero maximo de intentos`);
            }

            intentos++;    
        }
        limpiarCaja();  
}

function reiniciarJuego(){

    condicionesIniciales();
    limpiarCaja();
    document.getElementById('reiniciar').setAttribute('Disabled',true);
    document.getElementById('verificado').removeAttribute('disabled');
} 

condicionesIniciales();