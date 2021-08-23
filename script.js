// 1. Gerar um número aleatorio entre 1 e 100
var numeroAleatorio = Math.floor(Math.random() * 100) + 1;

/*Guardam referência para os parágrafos resultantes no html e usadas para inserir valores nos parágrafos do código */

var palpites = document.querySelector ('.palpites');
var ultimoResultado = document.querySelector('.ultimoResultado');
var baixoOuAlto = document.querySelector('.baixoOuAlto');

/*Campo de texto e botão enviar*/
var envioPalpite = document.querySelector('.envioPalpite');
var campoPalpite = document.querySelector('.campoPalpite');

/*armazenar contagem de palpites e botão de reiniciar o jogo */
var contagemPalpites = 1;
var botaoReinicio;

/* 1º bloco if: verifica se é o primeiro palpite do usuário. Se for, conteúdo do parágrafo aparece. 
6a linha: acrescenta o valor do palpite atual e mais um espaço em branco pra espaçamento */

function conferirPalpite(){
    var palpiteUsuario = Number(campoPalpite.value); 
    if (contagemPalpites === 1) {
        palpites.textContent='Palpites anteriores: ';
    }
    palpites.textContent += palpiteUsuario + ' ';

    if( palpiteUsuario === numeroAleatorio){
        ultimoResultado.textContent = 'Parabéns! Você acertou!';
        ultimoResultado.style.backgroundColor = 'green';
        ultimoResultado.style.color = 'white';
        baixoOuAlto.textContent = '';
        configFimDeJogo();
    } else if (contagemPalpites === 10) {
        ultimoResultado.textContent = ' FIM DE JOGO!';
        baixoOuAlto.textContent = '';
        configFimDeJogo ();
    } else {
        ultimoResultado.textContent = 'Errado!';
        ultimoResultado.style.backgroundColor = 'red';
        if (palpiteUsuario<numeroAleatorio) {
            baixoOuAlto.textContent = 'Seu palpite está muito baixo!';
        } else if (palpiteUsuario > numeroAleatorio) {
            baixoOuAlto.textContent = 'Seu palpite está muito alto!';
        }
     }
        contagemPalpites++;
        campoPalpite.value = ''; // limpa o campo de text do form
        campoPalpite.focus(); // foca no campo de texto
    }
/* Precisamos configurar para que a função seja "ativada" mediante o acionamento do botão "Enviar". Para isso, acionamos um event listener ao botão que possui como argumentos o tipo de evento que estamos monitorando (click) e a ação que será executada quando o evento ocorrer (conferir palpite) */

   envioPalpite.addEventListener('click', conferirPalpite);

function configFimDeJogo () {
    campoPalpite.disabled = true;
    envioPalpite.disabled = true;
    botaoReinicio = document.createElement('button');
    botaoReinicio.textContent = 'Iniciar novo jogo';
    document.body.appendChild(botaoReinicio); //adiciona ao final do html existente
    botaoReinicio.addEventListener('click', reiniciarJogo);
 
}

function reiniciarJogo () {
    contagemPalpites = 1;

    var reiniciarParas = document.querySelectorAll ('.resultadoParas p');
    for (var i=0; i<reiniciarParas.length; i++) {
        reiniciarParas[i].textContent = '';
    }

    botaoReinicio.parentNode.removeChild(botaoReinicio);
    
    campoPalpite.disabled = false;
    envioPalpite.disabled = false;
    campoPalpite.value='';
    campoPalpite.focus();

    ultimoResultado.style.backgroundColor='white';

    numeroAleatorio = Math.floor(Math.random() * 100) + 1;
}