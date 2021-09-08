import React from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  Flex,
  Box,
  Button,
  Image,
  Heading,
  useColorMode,
  IconButton,
  Text
} from "@chakra-ui/react";
import _ from "lodash";
import MotionBox from "components/MotionBox";
import formsStore from "models/forms";

const FormRecord: React.FC = observer(() => {
  const router = useRouter();
  const { colorMode } = useColorMode();

  const onClickForm = (id: string) => {
    if (id) {
      router.push({ pathname: "/form", query: { formId: id } });
    }
  };

  // removes the formArray from the form list in the mobX model
  const onRemoveForm = (id: string) => {
    formsStore.deleteFormbyId(id);
  };

  // handles empty formList
  if (_.size(formsStore.formList) < 1) {
    return (
      <Box my={[24, 16]} width="full" align="center">
        <MotionBox
          animate={{ y: 20 }}
          transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
          width={["100%", "70%"]}
          margin="0 auto">
          <Image src="/empty-folder.svg" alt="Error 404" />
          <Heading mt={4} fontSize="3xl" textAlign="center">
            {"No Forms Found!"}
          </Heading>
        </MotionBox>
        <Box my={8}>
          <Box textAlign="center" marginTop={4}>
            <Text>{"It's Okay!"}</Text>
            <Link href="/" passHref>
              <Button
                backgroundColor={
                  colorMode === "light" ? "gray.300" : "teal.500"
                }>
                {"Let's Head Back"}
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    );
  }
  return (
    <Box my={8} width="full" align="center">
      {_.map(formsStore.formList, (form, index) => {
        return (
          <Flex
            key={index}
            cursor="pointer"
            bg={colorMode === "light" ? "#e2e8ef" : "#141414"}
            width="full"
            align="center"
            justifyContent="space-between"
            mb={4}>
            <Heading
              onClick={() => onClickForm(form.id)}
              p={4}
              fontSize="2xl"
              fontWeight="bold">
              {form.title ? form.title : `Form-${index + 1}`}
            </Heading>
            <IconButton
              variant="outline"
              zIndex={10}
              size={"sm"}
              colorScheme="red"
              mr={4}
              aria-label="Delete Form"
              onClick={() => onRemoveForm(form.id)}
              icon={<RiDeleteBin6Line />}
            />
          </Flex>
        );
      })}
    </Box>
  );
});

export default FormRecord;
