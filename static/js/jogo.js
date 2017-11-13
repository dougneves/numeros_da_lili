const pergunta = $('#pergunta');
const tts=new TTS;

const jogo=
{
  level: 1,
  multiplicador: 15, //intervalo de números por nível (sendo 15: 1 vai de 1 a 14, 2 vai de 15 a 29)
  passar_nivel: 10,  //quantidade de pontos para passar de nível
  posicoes: 3,       //slots de opções de número
  acertos: 0,
  erros: 0,
  passou: false,
  correto_ix: 0,     //posição do número correto da rodada
  numeros: [0],      //array de números resposta do tamanho de posicoes
  geradores: [],  //funções de geração de números
}

jogo.geradores.push(GeradorMetodoA);
jogo.geradores.push(GeradorMetodoA); //mais chances
jogo.geradores.push(GeradorMetodoB);

const frases_certas=
[
'Parabéns',
'Muito bem',
'Correto',
'Isso aí',
'Certo',
]

const frases_erradas=
[
'Não é não',
'Tente de novo',
'Acho que não',
'Xi, errou',
'Mais uma vez',
]

function GeraNumero(min,max)
{
  return parseInt(Math.random() * (max - min) + min);
}

function DesenhaNumero(qual,onde)
{
  var n=(''+qual).split(''),i,html='';
  for(i=0;i<n.length;i++)
    html+='<img src="images/'+n[i]+'.png">';
  $(onde).attr('data-val',qual).html(html).css('visibility', 'visible').fadeIn();
}

function ClickSound()
{
  $('#click-sound')[0].play(); 
}

function InicioDeJogo()
{
  tts.falar('Depois de ouvir o número selecione ele na tela.',ProximaRodada);
}

function ProximaRodada()
{
  if(jogo.passou)
  {
    jogo.passou=false;
    tts.falar('Parabéns, agora vamos para o nível '+jogo.level,ProximaRodada);
    return;
  }

  Unlock();
  jogo.geradores[GeraNumero(0,jogo.geradores.length)]();

  for(i=0;i<jogo.posicoes;i++)
    DesenhaNumero(jogo.numeros[i],'#resposta'+i);

  FalaNumeroPrincipal();
}

//chuta um número e aloca em posição aleatória. os outros números errados ficam em sequência
function GeradorMetodoA()
{
  var numero,i;

  numero = GeraNumero((jogo.level-1)*jogo.multiplicador,jogo.level*jogo.multiplicador);
  //evita repetir
  if(numero==jogo.numeros[jogo.correto_ix]) numero++;

  jogo.correto_ix = GeraNumero(0,jogo.posicoes);
  if(GeraNumero(0,2)==0)
  {
    for(i=0;i<jogo.posicoes;i++)
      jogo.numeros[i]=numero+i;
  }
  else
  {
    if(numero<jogo.posicoes) numero+=jogo.posicoes;
    for(i=jogo.posicoes-1;i>=0;i--)
      jogo.numeros[i]=numero-i;
  }
}

//igual o A só que o número sempre termina igual
function GeradorMetodoB()
{
  numero = GeraNumero((jogo.level-1)*jogo.multiplicador,jogo.level*jogo.multiplicador);
  //evita repetir
  if(numero==jogo.numeros[jogo.correto_ix]) numero++;

  jogo.correto_ix = GeraNumero(0,jogo.posicoes);

  for(i=0;i<jogo.posicoes;i++)
    jogo.numeros[i]=numero+i;

  for(i=0;i<jogo.posicoes;i++)
    jogo.numeros[i]=parseInt((''+jogo.numeros[i]).split('').reverse().join(''));
}

function Lock()
{
  jogo.disabled=true;
  $('#mascara').show();
}

function Unlock()
{
  jogo.disabled=false;
  $('#mascara').hide();
}

function TestaNumero(e)
{
  e.preventDefault();
  if(jogo.disabled) return;

  if(e.target.tagName!='DIV') e.target=e.target.parentElement;
  e=$(e.target);

  Lock();
  ClickSound();
  if(e.attr('data-val')==jogo.numeros[jogo.correto_ix])
  {
    tts.falar(frases_certas[GeraNumero(0,frases_certas.length)],ProximaRodada);
    
    if(++jogo.acertos%jogo.passar_nivel==0)
    {
      jogo.passou++;
      jogo.level++;
    }
  }
  else
  {
    e.css('visibility', 'hidden');
    tts.falar(frases_erradas[GeraNumero(0,frases_erradas.length)],Unlock);
    jogo.erros++;
    
  }
  DesenhaPontuacao();
}

function DesenhaPontuacao()
{
  $('#tela-rodape').show();
  $('#pontuacao').html(jogo.acertos)
  $('#nivel').html(jogo.level);
}

function FalaNumeroPrincipal(e)
{
  if(e) e.preventDefault();
  if(jogo.disabled) return;

  Lock();
  //ClickSound();
  tts.falar(jogo.numeros[jogo.correto_ix],Unlock);
}
