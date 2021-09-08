import { IconButton, useColorMode } from "@chakra-ui/react";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

const ThemeControl = () => {
  const { colorMode, toggleColorMode } = useColorMode(); // changes the color mode when the button is toggled

  return (
    <IconButton
      aria-label="theme toggle"
      icon={colorMode === "light" ? <RiMoonFill /> : <RiSunLine />}
      onClick={toggleColorMode}
    />
  );
};

export default ThemeControl;
