import { useRef, useState, useEffect } from "react";
import { detectSilence } from "../_utils";

import Recorder from "recorder-js";

export default function RecordButton() {
  const recorderRef = useRef<Recorder | null>(null);
  const [isRecording, setIsRecording] = useState<
    "recording" | "finished" | null
  >(null);

  const handleRecord = async () => {
    const { mediaDevices } = navigator;
    const stream = await mediaDevices.getUserMedia({ audio: true });

    const audioContext = new window.AudioContext();
    const analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 2048;
    const dataArray = new Uint8Array(analyserNode.fftSize);

    const recorder = new Recorder(audioContext);
    recorderRef.current = recorder;

    await recorderRef.current.init(stream);

    recorderRef.current.start().then(() => setIsRecording("recording"));

    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyserNode);

    detectSilence(analyserNode, dataArray, setIsRecording);
  };

  useEffect(() => {
    if (recorderRef.current === null) return;
    if (isRecording === null || isRecording === "recording") return;

    if (isRecording === "finished") {
      finishRecord();
    }

    return () => {
      setIsRecording(null);
    };
  }, [isRecording]);

  const finishRecord = async () => {
    if (recorderRef.current === null) return;

    const { blob } = await recorderRef.current.stop();
    const audioFile = new File([blob], "recording.wav", { type: "audio/wav" });

    if (!audioFile) {
      console.error("No audio file to send.");
      return;
    }

    const params = {
      language: "ko-KR",
      completion: "sync",
      wordAlignment: true,
      fullText: true,
    };

    const formData = new FormData();
    formData.append("media", audioFile);
    formData.append("params", JSON.stringify(params));

    try {
      const response = await fetch(`/api/chat`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("STT API request failed");
      }

      const data = await response.json();
      console.log("STT Result:", data);
    } catch (error) {
      console.error("Error with STT API request:", error);
    } finally {
      setIsRecording(null);
    }
  };

  const recordingState = () => {
    if (isRecording === null || isRecording === "finished") {
      return "녹음";
    }

    if (isRecording === "recording") {
      return "녹음중";
    }

    return "녹음";
  };

  return <button onClick={handleRecord}>{recordingState()}</button>;
}
