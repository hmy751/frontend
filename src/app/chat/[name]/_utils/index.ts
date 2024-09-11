export const checkFileWave = (audioFile: File) => {
  const reader = new FileReader();

  reader.onloadend = (event: ProgressEvent<FileReader>) => {
    if (!event.target) return;
    const arrayBuffer = event.target.result;
    const uint8Array = new Uint8Array(arrayBuffer as ArrayBufferLike);

    // 파일의 첫 12바이트를 읽어 포맷 확인 ("RIFF" + "WAVE")
    const header = String.fromCharCode(...uint8Array.slice(0, 4)); // "RIFF" 확인
    const waveFormat = String.fromCharCode(...uint8Array.slice(8, 12)); // "WAVE" 확인

    if (header === "RIFF" && waveFormat === "WAVE") {
      console.log("This is a valid WAV file.");
    } else {
      console.log("This is not a WAV file.");
    }
  };

  // 파일의 첫 12바이트를 읽기 위해 slice 사용
  reader.readAsArrayBuffer(audioFile.slice(0, 12));
};
