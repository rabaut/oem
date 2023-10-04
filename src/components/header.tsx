import { Avatar, Flex, Image, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

export const Header: FC = () => {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    setName(sessionStorage.getItem("name") ?? "");
  }, []);

  return (
    <Flex
      as="header"
      justify="space-between"
      align="center"
      gap={6}
      p={4}
      bg="lightgray"
      borderBottom="1px"
    >
      <Flex gap={3} align="center">
        <Image src="/logo.png" height="32px" />{" "}
        <Text fontWeight="bold">Potato</Text>
      </Flex>

      {name && (
        <Flex gap={4} align="center">
          <Text fontWeight="bold">{name}</Text>
          <Avatar size="sm" />
        </Flex>
      )}
    </Flex>
  );
};
