import {
  Box,
  Stack,
  Select,
  Input,
  IconButton,
  useColorMode,
  useMediaQuery
} from "@chakra-ui/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import _ from "lodash";
import { optionsArr } from "constants/optionArray";
import { Props } from "./props";

type formData = {
  name: string;
  value: string;
};

const FormItem: React.FC<Props> = (prop) => {
  const { item, index, register, onRemoveItem } = prop;
  const { colorMode } = useColorMode();
  const [notMobile] = useMediaQuery("(min-width: 780px)");

  const renderOptions = (opt: formData[]) => {
    return _.map(opt, (o, idx) => {
      const { name, value } = o;
      return (
        <option key={idx} value={value}>
          {name}
        </option>
      );
    });
  };

  const inputBorder = colorMode === "light" ? "#8895a7" : "#8895a7";

  return (
    <Box
      key={index}
      bg={colorMode === "light" ? "#e2e8ef" : "#141414"}
      width="full"
      align="center"
      mb={4}>
      <Stack
        padding={5}
        direction={["column", "row"]}
        spacing={[4, 10]}
        alignItems={["left", "center"]}
        justifyContent="space-between">
        <Box>
          <Input
            type={"text"}
            {...register(`fieldArray.${index}.name` as const, {
              maxLength: 20
            })}
            isRequired
            borderColor={inputBorder}
            placeholder="Field Name"
            defaultValue={item?.name}
          />
        </Box>
        <Box>
          <Select
            {...register(`fieldArray.${index}.type` as const)}
            borderColor={inputBorder}
            isRequired
            width={["full", 52]}
            placeholder="Field Type"
            defaultValue={item?.type}>
            {renderOptions(optionsArr)}
          </Select>
        </Box>
        <IconButton
          onClick={() => onRemoveItem(index)}
          variant="outline"
          size={notMobile ? "sm" : "md"}
          colorScheme="red"
          aria-label="Delete Field"
          icon={<RiDeleteBin6Line />}
        />
      </Stack>
    </Box>
  );
};

export default FormItem;
