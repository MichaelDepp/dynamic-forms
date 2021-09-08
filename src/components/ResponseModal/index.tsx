import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  Stack,
  Text,
  Box,
  Button,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";
import _ from "lodash";
import { Props } from "./props";

const ResponseModal: React.FC<Props> = (prop) => {
  const { isOpen, responseData, onClose } = prop;
  const printRef = useRef<HTMLDivElement>(null); // ref to point when print pdf is triggered
  const { colorMode } = useColorMode();
  const bgColor = colorMode === "light" ? "#ffffff" : "#2c3848";

  // renders the pdf from by passing the reference context
  const onDownloadPdf = useReactToPrint({
    content: () => printRef.current
  });

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{"Your Form Response 🌈"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody ref={printRef} backgroundColor={bgColor}>
          <Stack spacing={3}>
            {responseData &&
              _.map(responseData, (data, index) => {
                return (
                  <Box key={index}>
                    <Text fontWeight="semibold" fontSize="xl">
                      {data.name}
                    </Text>
                    <Text fontSize="lg">{data.value.toString()}</Text>
                  </Box>
                );
              })}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onDownloadPdf}>
            {"Download As PDF"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResponseModal;
