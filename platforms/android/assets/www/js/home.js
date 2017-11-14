const tts = new TTSWrapper()
let contagem = 0

$(document).ready(() => {
  //site mobile não pode tocar som automaticamente
  if (
    !window.cordova &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  )
    FimDaMusica()
  else
    $('#intro-sound')
      .on('ended', FimDaMusica)[0]
      .play()

  $('#menu-item-jogar').on('click', VamosJogar)
})

const FimDaMusica = () => {
  $('#tela-logo').fadeIn()
  tts.falar('os números da lili', FimDoTexto)
}

const FimDoTexto = () => {
  $('#menu-jogo').fadeIn()
  setInterval(FalarComecar, 10000)
  FalarComecar()
}

const FalarComecar = () => {
  contagem++
  if (contagem < 3) tts.falar('aperte jogar para começar', null)
  else if (contagem == 8) {
    tts.falar('xiii, parece que ninguém quer jogar', null)
    contagem = 0
  } else if (contagem >= 6) tts.falar('lili, você está aí?', null)
}
const VamosJogar = () => {
  $('#click-sound')[0].play()
  tts.calar()
  tts.falar('legal, vamos jogar', () => {
    location.href = 'jogo.html'
  })
}
