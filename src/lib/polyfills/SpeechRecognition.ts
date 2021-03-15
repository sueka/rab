type GlobalThisWithSpeechRecognition = typeof globalThis & {
  webkitSpeechRecognition: typeof SpeechRecognition
}

if ('webkitSpeechRecognition' in window) {
  // tslint:disable-next-line:no-object-mutation
  globalThis.SpeechRecognition = (globalThis as GlobalThisWithSpeechRecognition).webkitSpeechRecognition
}
