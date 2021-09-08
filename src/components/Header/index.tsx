import { Box, Flex, Heading, IconButton } from "@chakra-ui/react";
import { RiStarSFill } from "react-icons/ri";
import Link from "next/link";
import ThemeControl from "components/ThemeControl";

const Header = () => {
  return (
    <Flex
      as="header"
      width="full"
      align="center"
      justifyContent="space-between">
      <Box>
        <Link href="/history">
          <IconButton aria-label="theme control" icon={<RiStarSFill />} />
        </Link>
      </Box>
      <Heading textAlign="center" as="h1" fontSize={["md", "2xl"]}>
        <Link href="/">Did someone say Form ?</Link>
      </Heading>
      <Box>
        <ThemeControl />
      </Box>
    </Flex>
  );
};

export default Header;
