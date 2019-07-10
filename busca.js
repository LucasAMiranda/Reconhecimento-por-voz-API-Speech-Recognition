//Testando no browser a API SpeechRecognition
window.SpeechRecognition = window.SpeechRecognition ||
 window.webkitSpeechRecognition || null;

 //Caso não suporte essa Api de voz
 if (window.speechRecognition === null){
     document.getElementById("unsupported").classList.remove('hidden');

 }else{
     console.log("fui ouvido, Funcionou!!!")
 }

 var recognizer = new window.SpeechRecognition();
 var transcription = document.getElementById("transcription");

 //Para o reconhecedor de voz, não parar de ouvir, mesmo que usuário faça pausas.
recognizer.continuos = true;

recognizer.onresult = function(event){

    transcription.textContent = "";

    //Loop de reconhecimento de voz, me retorna um texto com resultado final da fala.

    for (var i = event.resultIndex; i < event.results.length; i++) {

        if(event.results[i].isFinal){
            transcription.textContent = event.results[i][0].
            transcript+' (Taxa de acerto [0/1] : ' + event.results[i][0].confidence + ')';

        }else{
            transcription.textContent += event.results[i][0].transcript; 
        }
    }
}

document.querySelector("#rect").addEventListener("click",function(){
    try {
        recognizer.start();
      } catch(ex) {
        alert("error: "+ex.message);
      }
});