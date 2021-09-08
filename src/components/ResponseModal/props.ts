import { responseMap } from "types/response";

export type Props = {
  isOpen: boolean;
  responseData: responseMap[] | undefined;
  onOpen: () => void;
  onClose: () => void;
};
