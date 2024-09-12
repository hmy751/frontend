"use client";

import { useAudioStore } from "@/store/useAudioStore";
import { Box } from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Background from "./_components/Background";
import Camera from "./_components/Camera";
import InterviewerCard from "./_components/InterviewerCard";
import { nomalizeIndex } from "./_utils/convert";

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

const InterviewerChoicePage: React.FC = () => {
  const [selectedInterviewer, setSelectedInterviewer] =
    React.useState<Interviewer | null>(null);

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
        <Background
          imgUrl={selectedInterviewer?.imgUrl || interviewerList[0].imgUrl}
        />
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
