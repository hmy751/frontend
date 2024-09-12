"use client";

import { useRef, useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

import InterviewerProfile from "./_components/InterviewerProfile";
import ChatArticle from "./_components/ChatArticle";
import RecordButton from "./_components/RecordButton";

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
  const [currentMessage, setCurrentMessage] = useState("");

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
      <RecordButton setCurrentMessage={setCurrentMessage} />
    </Box>
  );
}
