import { Flex, Text } from "@chakra-ui/react";
import { FC } from "react";

export const Footer: FC = () => (
  <Flex as="header" align="center" justify="center" width="100%" gap={6} p={3}>
    <Text>The future is potato</Text>
  </Flex>
);
