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

  return <Box width={"100%"} maxWidth={726} display="flex" height="100%"></Box>;
}
