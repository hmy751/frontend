"use client";

import { useRef } from "react";
import { Box } from "@chakra-ui/react";

import Recorder from "recorder-js";

export default function Page() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const recorderRef = useRef<Recorder | null>(null);
  const audioFileRef = useRef<File | null>(null);

  const handleRecord = async () => {
    const { mediaDevices } = navigator;
    const stream = await mediaDevices.getUserMedia({ audio: true });

    audioContextRef.current = new window.AudioContext();

    const recorderInstance = new Recorder(audioContextRef.current);

    recorderRef.current = recorderInstance;
    recorderRef.current.init(stream);
    recorderRef.current.start();
  };

  const handleFinishRecord = async () => {
    if (recorderRef.current === null) return;

    const { blob } = await recorderRef.current.stop();
    const audioFile = new File([blob], "recording.wav", { type: "audio/wav" });
    audioFileRef.current = audioFile;
  };

  const handleSendNaverSST = async () => {
    const audioFile = audioFileRef.current;

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
    }
  };

  return (
    <Box
      as="section"
      width="100%"
      height="100%"
      border="1px"
      borderColor="black"
      paddingX="10"
    >
      <Box display="flex" border="1px solid" height="100%" borderColor="black">
        <button onClick={handleRecord}>녹음</button>
        <button onClick={handleFinishRecord}>종료</button>
        <button onClick={handleSendNaverSST}>네이버</button>
      </Box>
    </Box>
  );
}
