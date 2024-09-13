"use client";

import { useAudioStore } from "@/store/useAudioStore";
import { Box } from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Background from "./_components/Background";
import Camera from "./_components/Camera";
import InterviewerCard from "./_components/InterviewerCard";
import { nomalizeIndex } from "./_utils/convert";
import InterviewerInfo from "./_components/InterviewerInfo";

const interviewerList = [
  {
    id: 1,
    imgUrl: "/images/ENFP.webp",
    name: "민지",
    mbti: "ENFP",
  },
  {
    id: 2,
    imgUrl: "/images/ESTJ.webp",
    name: "철수",
    mbti: "ESTJ",
  },
  {
    id: 3,
    imgUrl: "/images/ISFP.webp",
    name: "영희",
    mbti: "ISFP",
  },
];

interface Interviewer {
  id: number;
  name: string;
  imgUrl: string;
  mbti: string;
}

const InterviewerChoicePage: React.FC = () => {
  const [selectedInterviewer, setSelectedInterviewer] =
    React.useState<Interviewer | null>(interviewerList[0]);

  const { play } = useAudioStore();

  const handleClick = (interviewer: Interviewer) => {
    setSelectedInterviewer(interviewer);
  };

  return (
    <Box>
      <Canvas
        style={{
          display: "block",
          width: "100vw",
          aspectRatio: "16/9",
          margin: "0 auto",
        }}
      >
        <Camera />
        <Background imageUrl={selectedInterviewer?.imgUrl || ""} />
        <InterviewerInfo selectedInterviewer={selectedInterviewer} />
        {interviewerList.map((interviewer, index) => (
          <InterviewerCard
            key={interviewer.id}
            imgUrl={interviewer.imgUrl}
            position={[nomalizeIndex(index, interviewerList.length), -2.5, 0]}
            onClick={() => {
              handleClick(interviewer);
              play();
            }}
          />
        ))}
      </Canvas>
    </Box>
  );
};

export default InterviewerChoicePage;
