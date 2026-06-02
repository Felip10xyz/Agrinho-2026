function animarContador(id, valorFinal){

    let numero = 0;

    const intervalo = setInterval(() => {

        numero += Math.ceil(valorFinal / 100);

        if(numero >= valorFinal){
            numero = valorFinal;
            clearInterval(intervalo);
        }

        document.getElementById(id).innerHTML = numero;

    }, 30);
}

animarContador("num1", 5000);
animarContador("num2", 1200);
animarContador("num3", 350);