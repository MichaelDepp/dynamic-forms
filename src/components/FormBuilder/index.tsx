import React, { useState } from "react";
import { useRouter } from "next/router";
import { RiFileAddFill, RiCheckboxCircleFill } from "react-icons/ri";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Flex,
  Box,
  Button,
  Input,
  useColorMode,
  useToast
} from "@chakra-ui/react";
import _ from "lodash";
import { nanoid } from "nanoid";
import FormItem from "components/FormItem";
import { formArrays, formData } from "types/formArray";
import formsStore from "models/forms";

const FormBuilder = () => {
  const { register, control, watch, handleSubmit } = useForm<formArrays>({
    defaultValues: {
      fieldArray: [{ name: "", type: "" }]
    }
  });
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "fieldArray" // unique name for your Field Array
  });
  const [formTitle, setFormTitle] = useState("");
  const { colorMode } = useColorMode();
  const router = useRouter();
  const toast = useToast();
  const watchFieldArray = watch("fieldArray");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index]
    };
  });

  const onChangeFormTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormTitle(e.target.value);
  };

  const onAddFormElement = () => {
    append({});
    toast({
      title: `New Field Added!`,
      position: "top-right",
      status: "success",
      isClosable: true
    });
    formsStore.formArray.fieldArray = controlledFields;
  };

  const onRemoveItem = (index: number) => {
    remove(index);
    toast({
      title: `Field Removed!`,
      position: "top-right",
      status: "warning",
      isClosable: true
    });
    formsStore.formArray.fieldArray = controlledFields;
  };

  const renderFormItem = (items: formData[]) => {
    return _.map(items, (item, index) => (
      <FormItem
        key={index}
        register={register}
        index={index}
        item={item}
        onRemoveItem={onRemoveItem}
      />
    ));
  };

  const onActionSubmit = (data: formData[]) => {
    console.log(data);
    const id = nanoid(10);
    formsStore.formArray.fieldArray = controlledFields;
    formsStore.formArray.id = id;
    formsStore.formArray.title = formTitle;
    formsStore.addForm();
    router.push({ pathname: "/form", query: { formId: id } });
  };

  const placeHolderColor = colorMode === "light" ? "#1b202b" : "#ecefee";

  return (
    <Box my={8} width="full" align="center">
      <Box width="full" pb={4} textAlign="left">
        <Input
          border="none"
          variant="flushed"
          fontSize="3xl"
          fontWeight="bold"
          placeholder="Edit Form Title"
          paddingLeft={0}
          defaultValue={formTitle}
          onChange={onChangeFormTitle}
          _placeholder={{ color: placeHolderColor }}
        />
      </Box>
      <form onSubmit={handleSubmit(onActionSubmit)}>
        {renderFormItem(controlledFields)}
        <Flex width={["full", "auto"]} justifyContent={["center", "left"]}>
          <Button
            onClick={onAddFormElement}
            leftIcon={<RiFileAddFill />}
            colorScheme="teal"
            variant="solid">
            Add Form Item
          </Button>
        </Flex>
        <Button
          mt={4}
          disabled={_.size(controlledFields) < 1}
          type="submit"
          leftIcon={<RiCheckboxCircleFill />}
          colorScheme="teal"
          variant="solid">
          Done!
        </Button>
      </form>
    </Box>
  );
};

export default FormBuilder;
