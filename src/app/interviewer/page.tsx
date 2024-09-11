"use client";

import { Box, Flex, Grid, Stack } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import InterviewerCard from "./_components/InterviewerCard";

const interviewerList = [
  {
    id: 1,
    imgUrl: "/images/ENFP.webp",
  },
  {
    id: 2,
    imgUrl: "/images/ESTJ.webp",
  },
  {
    id: 3,
    imgUrl: "/images/ISFP.webp",
  },
];

interface Interviewer {
  id: number;
  imgUrl: string;
}

const InterviewerChoicePage = () => {
  const [selectedInterviewer, setSelectedInterviewer] =
    React.useState<Interviewer | null>(null);
  return (
    <Flex
      mx={"auto"}
      w={"full"}
      maxW={1200}
      justifyContent={"center"}
      alignItems={"center"}
      position={"relative"}
    >
      <Image
        src={selectedInterviewer?.imgUrl || interviewerList[0].imgUrl}
        width={1000}
        height={800}
        className=""
        alt="Background Imag"
      />

      <Flex gap={4} position={"absolute"} bottom={10}>
        {interviewerList.map((interviewer) => (
          <InterviewerCard
            key={interviewer.id}
            id={interviewer.id}
            imgUrl={interviewer.imgUrl}
            onClick={() => setSelectedInterviewer(interviewer)}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default InterviewerChoicePage;
