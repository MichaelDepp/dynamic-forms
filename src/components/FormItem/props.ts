import { UseFormRegister } from "react-hook-form";
import { formArrays } from "types/formArray";

type formData = {
  name: string;
  type: string;
};

export type Props = {
  index: number;
  item: formData;
  register: UseFormRegister<formArrays>;
  onRemoveItem: (index: number) => void;
};
