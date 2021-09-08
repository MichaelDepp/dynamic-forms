import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Text,
  Box,
  Image,
  Button,
  Heading,
  useColorMode
} from "@chakra-ui/react";
import _ from "lodash";
import FormHandler from "components/FormHandler";
import MotionBox from "components/MotionBox";
import { formList } from "types/formArray";
import formsStore from "models/forms";

const FormViewer = () => {
  const router = useRouter();
  const { formId } = router.query;
  const [formData, setFormData] = useState<formList>();
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (formId) {
      const data = formsStore.getFormbyId(formId as string);
      setFormData(data);
    }
  }, [formId]);

  const title = _.get(formData, "title", "");
  const fieldArray = _.get(formData, "fieldArray", []);

  if (_.size(fieldArray) < 1) {
    return (
      <Box my={[16, 10]} width="full" align="center">
        <MotionBox
          animate={{ y: 20 }}
          transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
          width={["100%", "70%", "50%", "50%"]}
          margin="0 auto">
          <Image src="/form-empty.svg" alt="Form Not Found" />
          <Heading mt={4} fontSize="3xl" textAlign="center">
            {`Form Didn't Exist!`}
          </Heading>
        </MotionBox>
        <Box my={8}>
          <Box textAlign="center" marginTop={4}>
            <Text>{"It's Okay!"}</Text>
            <Link href="/history" passHref>
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
      <Box width="full" pb={4} textAlign="left">
        <Heading fontSize="3xl" fontWeight="bold">
          {title ? title : formId}
        </Heading>
      </Box>
      <FormHandler fieldArray={fieldArray} />
    </Box>
  );
};

export default FormViewer;
