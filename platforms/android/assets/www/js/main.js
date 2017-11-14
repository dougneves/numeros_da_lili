document.addEventListener('deviceready', function() {
  TTS.speak(
    'hello, world!',
    function() {
      alert('success')
    },
    function(reason) {
      alert(reason)
    }
  )
})
