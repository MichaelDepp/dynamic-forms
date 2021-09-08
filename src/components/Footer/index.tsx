import { Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      as="footer"
      width="full"
      align="center"
      justifyContent="center"
      pb={4}>
      <Text>
        <Link href="https://github.com/MichaelDepp" isExternal>
          Developed by Michael Depp
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
