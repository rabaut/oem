import { getSessionToken, openPopup } from "@/utils";
import { Button, Flex, Heading, Image } from "@chakra-ui/react";

export function Source({
  id,
  name,
  icon,
}: {
  id: string;
  name: string;
  icon: string;
}) {
  const viewSource = async () => {
    const token = await getSessionToken();
    openPopup(`http://localhost:5000/oem/sources/${id}?token=${token}`);
  };

  return (
    <Flex align="center" gap={4}>
      <Image src={icon} width="32px" />
      <Heading size="sm">{name}</Heading>
      <Button onClick={viewSource} size="sm">
        Configure
      </Button>
    </Flex>
  );
}
