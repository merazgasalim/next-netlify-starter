import Link from "next/link";

import { Container, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { minH } from "lib/constants";

import { createClient } from "prismicio";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { asText } from "@prismicio/client";

//import { components } from "@/slices";

export default function Blog({ blogHomePage }) {
  return (
    <Container as={"main"} maxW="6xl" pt={20} minH={minH} >
      <Heading as={"h2"} pb={5} textAlign="center">
        Blog
      </Heading>
      <VStack justify="flex-start" align={"flex-start"}>
        {blogHomePage.results.map((blog) => (
          <HStack key={blog.id} textAlign="left">
            <Link href={`/blog/${blog.uid}`}>
              <PrismicNextImage
                field={blog.data.thumb}
                style={{
                  maxHeight: "200px",
                  minWidth: "300px",
                  width: "auto",
                }}
                fallbackAlt=""
              />
            </Link>
            <VStack>
              <PrismicRichText
                field={blog.data.title}
                components={{
                  heading1: ({ children }) => (
                    <Heading
                      as={"h3"}
                      textAlign="left"
                      fontSize={"xl"}
                      w={"full"}
                    >
                      <Link href={`/blog/${blog.uid}`}> {children}</Link>
                    </Heading>
                  ),
                }}
              />
              <Text noOfLines={5}>{asText(blog.data.content)}</Text>
            </VStack>
          </HStack>
        ))}
      </VStack>
    </Container>
  );
}

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const blogHomePage = await client.getByType("blog_post", {
    orderings: {
      field: "document.last_publication_date",
      direction: "desc",
    },
    // pageSize: 4,
    // page: 1,
  });

  return {
    props: {
      blogHomePage,
    },
  };
}
