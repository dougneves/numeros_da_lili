const pergunta = $('#pergunta');
const tts=new TTS;

const jogo=
{
  level: 1,
  posicoes: 3,
  correto_ix: 0,
  numeros: [],
  falando: false,
}


function GeraNumero(min,max)
{
  return parseInt(Math.random() * (max - min) + min);
}

function DesenhaNumero(qual,onde)
{
  var n=(''+qual).split(''),i,html='';
  for(i=0;i<n.length;i++)
    html+='<img src="images/'+n[i]+'.png">';
  $(onde).html(html);
}

function ProximaRodada()
{
  var numero = GeraNumero((jogo.level-1)*30,jogo.level*30),i;
  jogo.correto_ix = GeraNumero(0,jogo.posicoes);
  jogo.numeros[jogo.correto_ix] = numero;
 
  for(i=0;i<jogo.posicoes;i++)
  {
    if(i!=jogo.correto_ix)
      jogo.numeros[i]=jogo.numeros[jogo.correto_ix]+i-jogo.correto_ix;

    DesenhaNumero(jogo.numeros[i],'#resposta'+i);
  }

  FalaNumeroPrincipal();
}


function FalaNumeroPrincipal()
{
  if(jogo.falando) return;

  jogo.falando=true;
  tts.falar(jogo.numeros[jogo.correto_ix],FimFalaNumero);
}

function FimFalaNumero()
{
  jogo.falando=false;
}
