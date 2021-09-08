import React, { useState } from "react";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Input,
  useColorMode,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
  FormControl,
  FormLabel,
  Switch,
  useDisclosure
} from "@chakra-ui/react";
import _ from "lodash";
import ResponseModal from "components/ResponseModal";
import { formData } from "types/formArray";
import { responseMap, formResponseArr } from "types/response";
import { Props } from "./props";

const FormHandler: React.FC<Props> = (prop) => {
  const { fieldArray } = prop;
  const { isOpen, onOpen, onClose } = useDisclosure(); // for the modal hanlding
  const { register, handleSubmit } = useForm<formResponseArr>();
  const [responseData, setResponseData] = useState<responseMap[]>();
  const { colorMode } = useColorMode();
  const inputBorder = colorMode === "light" ? "#8895a7" : "#8895a7";

  const renderFormItem = (items: formData[]) => {
    return _.map(items, (item, index) => {
      let component; // initialise a let value since the values will be changed

      const { name, type } = item;

      // using switch to conditionally render the formItem for the field
      switch (type) {
        case "textInput":
          component = (
            <div key={index}>
              <FormLabel mb={2}>{name}</FormLabel>
              <Input
                // registers the form for the react form
                {...register(`formResponse.${index}.value` as const)}
                mb={4}
                type={"text"}
                borderColor={inputBorder}
                placeholder="Field Name"
              />
            </div>
          );
          break;
        case "numberInput":
          component = (
            <div key={index}>
              <FormLabel mb={2}>{name}</FormLabel>
              <NumberInput isRequired mb={4} defaultValue={0} step={1}>
                <NumberInputField
                  {...register(`formResponse.${index}.value` as const)}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </div>
          );
          break;
        case "checkbox":
          component = (
            <FormControl key={index} display="flex" alignItems="center">
              <Checkbox
                {...register(`formResponse.${index}.value` as const)}
                mb={4}>
                {name}
              </Checkbox>
            </FormControl>
          );
          break;
        case "boolean":
          component = (
            <FormControl key={index} display="flex" mb={4} alignItems="center">
              <FormLabel mb={"1"}>{name}</FormLabel>
              <Switch {...register(`formResponse.${index}.value` as const)} />
            </FormControl>
          );
          break;
        case "email":
          component = (
            <div key={index}>
              <FormLabel mb={2}>{name}</FormLabel>
              <Input
                {...register(`formResponse.${index}.value` as const)}
                mb={4}
                type={"email"}
                borderColor={inputBorder}
                placeholder="Field Name"
              />
            </div>
          );
          break;
        case "date":
          component = (
            <div key={index}>
              <FormLabel mb={2}>{name}</FormLabel>
              <Input
                {...register(`formResponse.${index}.value` as const)}
                mb={4}
                type={"date"}
                borderColor={inputBorder}
                placeholder="Field Name"
              />
            </div>
          );
          break;
        default:
          break;
      }

      return component;
    });
  };

  const onActionSubmit = (data: formResponseArr) => {
    const { formResponse } = data;
    // maps the data together with the field array to produce the response data
    const finalResponse = _.map(fieldArray, (field, index) => {
      return {
        name: field.name,
        value: formResponse[index].value
      };
    });
    setResponseData(finalResponse);
    onOpen();
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onActionSubmit)}>
        {renderFormItem(fieldArray)}
        <Button
          mt={4}
          type="submit"
          leftIcon={<RiCheckboxCircleFill />}
          colorScheme="teal"
          variant="solid">
          {"Submit!"}
        </Button>
      </form>
      <ResponseModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        responseData={responseData}
      />
    </Box>
  );
};

export default FormHandler;
