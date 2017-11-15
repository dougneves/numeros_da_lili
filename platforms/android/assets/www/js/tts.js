class TTSWrapper {
  constructor() {
    try {
      if (typeof SpeechSynthesisUtterance !== 'undefined') {
        this.ttsObj = new SpeechSynthesisUtterance()
        this.ttsObj.voiceURI = 'native'
        this.ttsObj.volume = 1
        this.ttsObj.rate = 1
        this.ttsObj.pitch = 1
        this.ttsObj.lang = 'pt-BR'
      }
    } catch (err) {
      console.error(err)
    }
  }
  falar(frase, callback) {
    try {
      if (typeof TTS !== 'undefined') {
        TTS.speak(
          {
            text: frase,
            locale: 'pt-BR',
            rate: 1
          },
          callback,
          err => {
            console.error(err)
          }
        )
      }
    } catch (err) {
      console.error(err)
    }
    try {
      if (typeof SpeechSynthesisUtterance !== 'undefined') {
        this.ttsObj.text = frase
        this.ttsObj.onend = callback
        speechSynthesis.speak(this.ttsObj)
      }
    } catch (err) {
      console.error(err)
    }
  }
  calar() {
    try {
      if (typeof SpeechSynthesisUtterance !== 'undefined') {
        speechSynthesis.cancel()
      }
    } catch (err) {
      console.error(err)
    }
  }
}
