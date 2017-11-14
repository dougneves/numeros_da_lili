class TTS {
  constructor() {
    this.ttsObj = new SpeechSynthesisUtterance()
    this.ttsObj.voiceURI = 'native'
    this.ttsObj.volume = 1
    this.ttsObj.rate = 1
    this.ttsObj.pitch = 1
    this.ttsObj.lang = 'pt-BR'
  }
  falar(frase, callback) {
    this.ttsObj.text = frase
    this.ttsObj.onend = callback
    speechSynthesis.speak(this.ttsObj)
  }
  calar() {
    speechSynthesis.cancel()
  }
}
