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
  gerador: false,    //função de geração de números
}

const frases_certas=
[
'OK 1',
'OK 2',
'OK 3',
'OK 4',
'OK 5',
]

const frases_erradas=
[
'ERRO 1',
'ERRO 2',
'ERRO 3',
'ERRO 4',
'ERRO 5',
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
  jogo.gerador=GeradorMetodoA;
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
  jogo.gerador();

  for(i=0;i<jogo.posicoes;i++)
    DesenhaNumero(jogo.numeros[i],'#resposta'+i);

  FalaNumeroPrincipal();
}

function GeradorMetodoA()
{
  var numero,i;

  //evita repetir
  do
    numero = GeraNumero((jogo.level-1)*jogo.multiplicador+jogo.posicoes,jogo.level*jogo.multiplicador);
  while(numero==jogo.numeros[jogo.correto_ix]);

  jogo.correto_ix = GeraNumero(0,jogo.posicoes);
  jogo.numeros[jogo.correto_ix] = numero;
 
  for(i=0;i<jogo.posicoes;i++)
  {
    if(i!=jogo.correto_ix)
      jogo.numeros[i]=jogo.numeros[jogo.correto_ix]+i-jogo.correto_ix;
  }
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

function FalaNumeroPrincipal()
{
  if(jogo.disabled) return;

  Lock();
  ClickSound();
  tts.falar(jogo.numeros[jogo.correto_ix],Unlock);
}
