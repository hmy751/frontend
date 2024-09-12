"use client";

import { useRef, useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import InterviewerProfile from "./_components/InterviewerProfile";
import ChatArticle from "./_components/ChatArticle";
import RecordButton from "./_components/RecordButton";
import { selectChat } from "@/store/redux/features/chat/selector";

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
  const chatContents = useSelector(selectChat);

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
        {chatContents.map(({ speaker, content, status, timeStamp }) => {
          return (
            <ChatArticle type={speaker}>
              {speaker === "bot" ? (
                <>
                  <ChatArticle.Avatar src="/assets/images/elon_musk.png" />
                  <ChatArticle.Speech status={status} text={content} />
                </>
              ) : (
                <>
                  <ChatArticle.Speech status={status} text={content} />
                  <ChatArticle.Avatar src="/assets/images/elon_musk.png" />
                </>
              )}
            </ChatArticle>
          );
        })}
        {/* <ChatArticle type={"bot"}>
          <ChatArticle.Avatar src="/assets/images/elon_musk.png" />
          <ChatArticle.Speech status="success" text="입력 테스트 입력 테스" />
        </ChatArticle>

        <ChatArticle type={"user"}>
          <ChatArticle.Avatar src="/assets/images/elon_musk.png" />
          <ChatArticle.Speech status="success" text="입력 테스트 입력 테스트" />
        </ChatArticle>

        <ChatArticle type={"bot"}>
          <ChatArticle.Avatar src="/assets/images/elon_musk.png" />
          <ChatArticle.Speech
            status="success"
            text="입력 테스트 입력 테스트 입력 테스트입"
          />
        </ChatArticle> */}
      </ChatWrapper>
      <RecordButton setCurrentMessage={setCurrentMessage} />
    </Box>
  );
}
