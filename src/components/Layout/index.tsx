import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import Footer from "components/Footer";
import Header from "components/Header";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Box
        minH={"90vh"}
        margin="0 auto"
        maxWidth={800}
        transition="0.5s ease-out">
        <Box margin="8">
          <Header />
          <Box as="main" marginY={22}>
            {children}
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
