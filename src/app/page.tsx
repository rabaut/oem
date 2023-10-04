"use client";

import { Box, Flex, Heading } from "@chakra-ui/react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Sources } from "@/components/sources";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default async function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      router.replace("/signup");
    }
  }, []);

  return (
    <>
      <Header />

      <Flex
        as="main"
        flex={1}
        flexDir="column"
        align="center"
        justify="center"
        gap={6}
      >
        <Heading>Sources</Heading>
        <Sources />
      </Flex>

      <Footer />
    </>
  );
}
