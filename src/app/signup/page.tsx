"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import {
  Button,
  Card,
  Flex,
  Heading,
  Input,
  Image,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const HIGHTOUCH_API_TOKEN = "eb18e512-d108-45e2-a0b6-5bdf130f2273";

const createWorkspace = async (name: string) => {
  const response = await fetch("http://localhost:5000/api/v2/rest/workspaces", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${HIGHTOUCH_API_TOKEN}`,
    },
    body: JSON.stringify({
      name,
    }),
  });

  const json = await response.json();

  return json.id;
};

const createAPIKey = async (workspaceId: string) => {
  const response = await fetch("http://localhost:5000/api/v2/rest/api-keys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${HIGHTOUCH_API_TOKEN}`,
      "X-Workspace-Id": workspaceId,
    },
    body: JSON.stringify({
      name: "OEM Key",
    }),
  });

  const json = await response.json();

  return json.token;
};

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState<string>("");

  const signup = async () => {
    const workspaceId = await createWorkspace(name);
    const token = await createAPIKey(workspaceId);
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("token", token);
    router.push("/");
  };

  return (
    <>
      <Header />

      <Flex as="main" flex={1} align="center" justify="center" bg="#efefef">
        <Card
          gap={4}
          p={10}
          as="form"
          onSubmit={(event) => {
            event.preventDefault();
            signup();
          }}
        >
          <Box mx="auto" mb={10}>
            <Image src="/logo.png" height="64px" width="auto" />
          </Box>
          <Heading mb={4} size="md">
            Sign up
          </Heading>
          <Input
            placeholder="Acme company"
            autoFocus
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Button type="submit">Create account</Button>
        </Card>
      </Flex>

      <Footer />
    </>
  );
}
