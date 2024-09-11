import { Box } from "@chakra-ui/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box
        as="header"
        width="100%"
        height="60px"
        backgroundColor={"#F3F6F7"}
      ></Box>
      <Box
        as="section"
        width="100%"
        height="100%"
        display="flex"
        justifyContent={"center"}
      >
        {children}
      </Box>
    </>
  );
}
