import { NextSeo } from "next-seo";
import { VStack } from "@chakra-ui/react";

import Hero from "components/Hero";
import Partners from "components/Partners";
import Info from "components/Info";
import Benefits from "components/Benefits";
import Plans from "components/Plans";
import Offers from "components/Offers";
import FAQs from "components/FAQs";
import DeviceSupport from "components/DeviceSupport";

export default function Home() {
  return (
    <>
      <NextSeo
        title="TV STREAMS Home - TV STREAMS - Top Rated IPTV"
        description="Best IPTV Service Provider with Affordable Price 18000+ Channels Movies VOD 24/7 · Full HD TV Streaming Quality USA,Canada,UK,australia,new zeland and many other countries with free trial"
      />

      <Hero />
      <VStack
        as={"main"}
        pos={"relative"}
        top={{ base: -10, md: -12, lg: -14 }}
        spacing={{ base: 8, md: 12, lg: 16 }}
      >
        <Partners />
        <Info />
        <Benefits />
        <Plans />
        <Offers />
        <DeviceSupport />
        <FAQs />
      </VStack>
    </>
  );
}
