"use client";

import { useRef } from "react";
import { Box, Flex } from "@chakra-ui/react";

import Recorder from "recorder-js";
import InterviewerProfile from "./_components/InterviewerProfile";
import ChatArticle from "./_components/ChatArticle";

const InterviewerProfileWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <Flex
        height={"max-content"}
        paddingY={"40px"}
        borderBottom={"1px solid"}
        borderColor={"gray.100"}
      >
        {children}
      </Flex>
    </>
  );
};

const ChatWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Flex direction={"column"} marginTop={"40px"} gap={"20px"}>
        {children}
      </Flex>
    </>
  );
};

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
      width={"100%"}
      maxWidth={726}
      display="flex"
      height="100%"
      flexDirection={"column"}
    >
      <InterviewerProfileWrapper>
        <InterviewerProfile />
      </InterviewerProfileWrapper>
      <ChatWrapper>
        {/* 면접관  */}
        <ChatArticle type={"Interviewer"}>
          <ChatArticle.Avatar src="/assets/images/elon_musk.png" />
          <ChatArticle.Speech
            status="success"
            text="입력 테스트 입력 테스트 입력 테스트입력 테스트입력 테스트입력 테스트 입력 테스트 입력 테스트입력 테스트입력 테스트입력 테스트 입력 테스트 입력 테스트입력 테스트입력 테스트입력 테스트 입력 테스트 입력 테스트입력 테스트입력 테스트입력 테스트 입력 테스트 입력 테스트입력 테스트입력 테스트입력 테스트 입력 테스트 입력 테스트입력 테스트입력 테스트입력 테스트 입력 테스트 입력 테스트입력 테스트입력 테스트입력 테스트 입력 테스트 입력 테스트입력 테스트입력 테스트"
          />
        </ChatArticle>

        {/* 인터뷰이 */}
        <ChatArticle type={"Interviewee"}>
          <ChatArticle.Speech
            status="success"
            text="입력 테스트 입력 테스트 입력 테스트입스트입력 테스트입력 테스트 입력 테스트 입력 테스트입력 테스트입력 테스트입력 테스트 입력 테스트 입력 테스트입력 테스트입력 테스트입력 테스트 입력 테스트 입력 테스트입력 테스트입력 테스트입력 테스트 입력 테스트 입력 테스트입력 테스트입력 테스트입력 테스트 입력 테스트 입력 테스트입력 테스트입력 테스트입력 테스트 입력 테스트 입력 테스트입력 테스트입력 테스트"
          />
          <ChatArticle.Avatar src="/assets/images/elon_musk.png" />
        </ChatArticle>

        {/* 면접관  */}
        <ChatArticle type={"Interviewer"}>
          <ChatArticle.Avatar src="/assets/images/elon_musk.png" />
          <ChatArticle.Speech
            status="success"
            text="입력 테스트 입력 테스트 입력 테스트입력 테스트입력 테스트입력 테스트 입력 테스트 입력 테스트입력 테스트입력 테스트입력 테스트 입력 테스트 입력 테스트입력 테스트입력 테스트입력 테스트 입력 테스트 입력 테스트입력 테스트입력 테스트입력 테스트 입력 테스트 입력 테스트입력 테스트입력 테스트입력 테스트 입력 테스트 입력 테스트입력 테스트입력 테스트입력 테스트 입력 테스트 입력 테스트입력 테스트입력 테스트입력 테스트 입력 테스트 입력 테스트입력 테스트입력 테스트"
          />
        </ChatArticle>
      </ChatWrapper>
    </Box>
  );
}
