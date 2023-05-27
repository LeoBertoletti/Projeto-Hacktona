const speak = document.querySelector("#textarea");
const microfone = document.querySelector("#microfone");

class SpeechApi {
  constructor() {
    const SpeechToText = window.SpeechRecognition || window.webkitSpeechRecognition;

    this.speechApi = new SpeechToText();
    this.output = speak; // Atribui o elemento "speak" à propriedade "output"
    this.speechApi.continuous = true;
    this.speechApi.lang = "pt-BR";

    this.speechApi.onresult = (e) => {
      const resultIndex = e.resultIndex;
      const transcript = e.results[resultIndex][0].transcript;

      this.output.textContent = transcript; // Atualiza o conteúdo do elemento "output"
    };
  }

  start() {
    this.speechApi.start();
  }

  stop() {
    this.speechApi.stop();
  }
}

const speech = new SpeechApi();

microfone.addEventListener("mousedown", (e) => {
  speech.start();
});

microfone.addEventListener("mouseup", () => {
  speech.stop();
});
