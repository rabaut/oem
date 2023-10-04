import { Source } from "@/components/source";
import { getSessionToken, openPopup } from "@/utils";
import { Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function Sources() {
  const [sources, setSources] = useState<any>([]);

  const connectSource = async () => {
    const token = await getSessionToken();
    openPopup(`http://localhost:5000/oem/sources/new?token=${token}`);
  };

  useEffect(() => {
    const getSources = async () => {
      const response = await fetch(
        "http://localhost:5000/api/v2/rest/sources",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      const sources = await response.json();

      setSources(sources ?? []);
    };

    getSources();
  }, []);

  return (
    <Flex flexDir="column" gap={6}>
      {sources.map((source) => (
        <Source key={source.id} {...source} />
      ))}
      {sources.length === 0 && <p>No sources connected</p>}

      <Button onClick={connectSource}>Connect a source</Button>
    </Flex>
  );
}
