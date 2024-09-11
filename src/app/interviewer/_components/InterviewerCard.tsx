"use client";

import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";

const MotionBox = motion(Box);

interface InterviewerCardProps {
  id: number;
  imgUrl: string;
  onClick?: () => void;
}

const InterviewerCard = ({ id, imgUrl, onClick }: InterviewerCardProps) => {
  return (
    <MotionBox
      width="240px"
      height="240px"
      borderRadius="8px"
      backgroundColor="white"
      border="1px solid"
      overflow="hidden"
      boxShadow="lg"
      onClick={onClick}
    >
      <Image src={imgUrl} width={240} height={240} alt="ff" />
    </MotionBox>
  );
};

export default InterviewerCard;
