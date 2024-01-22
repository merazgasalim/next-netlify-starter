import { notFound } from "next/navigation";
import { asText } from "@prismicio/client";

import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { createClient } from "prismicio";
import { Container, Heading, List, ListItem, Text } from "@chakra-ui/react";
//import { components } from "@/slices";
import { minH } from "lib/constants";

export async function generateMetadata({ params }) {
  const client = createClient();
  const page = await client
    .getByUID("page", params.uid)
    .catch(() => notFound());
  const settings = await client.getSingle("settings");

  return {
    title: `${asText(page.data.title)} | ${asText(settings.data.siteTitle)}`,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title,
      images: [
        {
          url: page.data.meta_image.url,
        },
      ],
    },
  };
}

export default function Post({ post }) {
  return (
    <Container as={"main"} maxW="6xl" pt={20} minH={minH}>
      <PrismicNextImage
        field={post.data.thumb}
        style={{ maxHeight: "30vh", width: "auto", margin: "0 auto" }}
      />
      <PrismicRichText
        field={post.data.title}
        components={{
          heading1: ({ children }) => (
            <Heading as={"h1"} textAlign="center" mb={5}>
              {children}
            </Heading>
          ),
        }}
      />
      <PrismicRichText
        field={post.data.content}
        components={{
          heading2: ({ children }) => (
            <Heading as={"h2"} mb={2}>
              {children}
            </Heading>
          ),
          paragraph: ({ children }) => <Text mb={2}>{children} </Text>,
          list: ({ children }) => (
            <List spacing={2} textAlign="start" listStylePos={"inside"} mb={2}>
              {children}
            </List>
          ),
          listItem: ({ children }) => <ListItem>{children}</ListItem>,
          oList: ({ children }) => (
            <List
              spacing={2}
              textAlign="start"
              listStylePos={"inside"}
              listStyleType="number"
              mb={2}
            >
              {children}
            </List>
          ),
          oListItem: ({ children }) => <ListItem>{children}</ListItem>,
        }}
      />
    </Container>
  );
}

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const post = await client.getByUID("blog_post", params.uid, {});

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const posts = await client.getAllByType("blog_post", {});
  const paths = posts.map((post) => ({
    params: { uid: post.uid },
  }));

  return {
    paths: paths ? paths : [],
    fallback: false,
  };
}
