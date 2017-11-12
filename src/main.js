const select = s => document.querySelector(s)
select('#pergunta').appendChild(document.createElement('<span>82</span>'))
const msg = new SpeechSynthesisUtterance()
msg.voiceURI = 'native'
msg.volume = 1
msg.rate = 1
msg.pitch = 1
msg.text = '82'
msg.lang = 'pt-BR'
msg.onend = function(e) {
  console.log('Finished in ' + event.elapsedTime + ' seconds.')
}
speechSynthesis.speak(msg)
