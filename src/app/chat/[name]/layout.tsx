import { Box, Flex } from "@chakra-ui/react";

import { UserProvider } from "@/app/_providers/UserProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <Flex flexDirection={"column"} minHeight={"100vh"}>
        <Box
          as="header"
          width="100%"
          height="60px"
          backgroundColor={"#F3F6F7"}
        ></Box>
        <Box
          as="section"
          width="100%"
          display="flex"
          flex={1}
          justifyContent={"center"}
        >
          {children}
        </Box>
      </Flex>
    </UserProvider>
  );
}
