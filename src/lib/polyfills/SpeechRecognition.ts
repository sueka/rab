type GlobalThisWithSpeechRecognition = typeof globalThis & {
  webkitSpeechRecognition: typeof SpeechRecognition
}

if ('webkitSpeechRecognition' in window) {
  globalThis.SpeechRecognition = (globalThis as GlobalThisWithSpeechRecognition).webkitSpeechRecognition
}
