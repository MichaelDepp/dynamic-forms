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
    control,
    name: "fieldArray"
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

  // Watches the changes for the formTitle and update the state
  const onChangeFormTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormTitle(e.target.value);
  };

  // Triggeres when the add Form Element is clicked
  const onAddFormElement = () => {
    append({}); // append will generate new array field in the react hook form fields
    toast({
      // toast for success message
      title: `New Field Added!`,
      position: "top-right",
      status: "success",
      isClosable: true
    });
    // updates the values in the mobX formArray model
    formsStore.formArray.fieldArray = controlledFields;
  };

  // Triggeres everytime form item is removed
  const onRemoveItem = (index: number) => {
    remove(index); // react form will remove the element from array
    toast({
      title: `Field Removed!`,
      position: "top-right",
      status: "warning",
      isClosable: true
    });
    // updates the values in the mobX formArray model
    formsStore.formArray.fieldArray = controlledFields;
  };

  // renders the form Item dynamically
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

  // Triggeres when the onsubmit action is triggered
  const onActionSubmit = (data: formData[]) => {
    console.log(data);
    const id = nanoid(10); // generates an unique id for the new form
    formsStore.formArray.fieldArray = controlledFields; // updates the formArray in the mobX model
    formsStore.formArray.id = id; // add the infos to the formArray
    formsStore.formArray.title = formTitle;
    formsStore.addForm(); // add the new form to the formList array
    router.push({ pathname: "/form", query: { formId: id } }); // redirects to the form view page and pass the required parameters
  };

  // custom color to handle the  darkMode lightMode of the placeHolder
  const placeHolderColor = colorMode === "light" ? "#7e838f" : "#7e838f";

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
        {/* renders the formItems using function */}
        {renderFormItem(controlledFields)}
        <Flex width={["full", "auto"]} justifyContent={["center", "left"]}>
          <Button
            onClick={onAddFormElement}
            leftIcon={<RiFileAddFill />}
            colorScheme="teal"
            variant="solid">
            {"Add Form Item"}
          </Button>
        </Flex>
        <Button
          mt={4}
          disabled={_.size(controlledFields) < 1}
          type="submit"
          leftIcon={<RiCheckboxCircleFill />}
          colorScheme="teal"
          variant="solid">
          {"Done!"}
        </Button>
      </form>
    </Box>
  );
};

export default FormBuilder;
