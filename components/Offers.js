import "swiper/css";
import "swiper/css/effect-cube";

import Image from "next/image";
import {
  SimpleGrid,
  Flex,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCube } from "swiper";

import { HiAcademicCap } from "react-icons/hi";
import { RiParentFill } from "react-icons/ri";
import { MdOutlineReduceCapacity } from "react-icons/md";
import { GiTeamIdea } from "react-icons/gi";
import { FaSchool } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Feature = ({ text, icon, iconBg, currentIndex, nbr = 0 }) => {
  return (
    <Stack
      direction={"row"}
      align={"center"}
      bg={currentIndex === nbr ? iconBg : "transparent"}
      py={2}
      transition="all 1.5s ease"
    >
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text
        fontSize={{ base: "sm", sm: "md", md: "lg" }}
        color={useColorModeValue("gray.700", "gray.300")}
      >
        {text}
      </Text>
    </Stack>
  );
};

export default function TargetAudience() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });
  useEffect(() => {
    if (inView) setCurrentIndex(0);
  }, [inView]);
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      spacing={{ base: 0, md: 10 }}
      ref={ref}
      as={"section"}
      maxW="6xl"
    >
      <Stack spacing={4}>
        <Heading>Subscribe To Our Service</Heading>

        <Text color={"gray.500"} fontSize={"lg"}>
          We are a premium IPTV subscription providers with many years of
          experience. Our IPTV service offers you the best image quality thanks
          to our powerful and stable servers without interference, which will
          guarantee you the best quality of live TV and VOD. Spend the best
          moments with your friends and family and watch your favorite programs
          and series back up to 72 hours.
        </Text>
        <Stack
          spacing={0}
          divider={
            <StackDivider
              borderColor={useColorModeValue("gray.100", "gray.700")}
            />
          }
        >
          <Feature
            icon={<Icon as={HiAcademicCap} color={"yellow.500"} w={5} h={5} />}
            iconBg={useColorModeValue("yellow.100", "yellow.900")}
            text={"TV SHOWS"}
            nbr={0}
            currentIndex={currentIndex}
          />
          <Feature
            icon={
              <Icon
                as={MdOutlineReduceCapacity}
                color={"green.500"}
                w={5}
                h={5}
              />
            }
            iconBg={useColorModeValue("green.100", "green.900")}
            text={"SPORTS"}
            nbr={1}
            currentIndex={currentIndex}
          />
          <Feature
            icon={<Icon as={RiParentFill} color={"purple.500"} w={5} h={5} />}
            iconBg={useColorModeValue("purple.100", "purple.900")}
            text={"MOVIES"}
            nbr={2}
            currentIndex={currentIndex}
          />
          <Feature
            icon={<Icon as={GiTeamIdea} color={"blue.500"} w={5} h={5} />}
            iconBg={useColorModeValue("blue.100", "blue.900")}
            text={"DOCUMENTARIES"}
            nbr={3}
            currentIndex={currentIndex}
          />
        </Stack>
      </Stack>
      {inView && (
        <VStack
          justify={"center"}
          p={4}
          as={motion.div}
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: {
              type: "spring",
              bounce: 0.4,
              duration: 1,
            },
          }}
          viewport={{ once: true, amount: 0 }}
        >
          <Swiper
            effect={"cube"}
            cubeEffect={{
              shadow: false,
              slideShadows: false,
            }}
            modules={[Autoplay, EffectCube]}
            spaceBetween={0}
            slidesPerView={1}
            onActiveIndexChange={(swiper) => setCurrentIndex(swiper.realIndex)}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            speed={1500}
            style={{
              maxWidth: "100%",
              alignSelf: "center",
            }}
          >
            <SwiperSlide>
              <Image
                src="/images/tv_show.jpg"
                alt="tv_show"
                width={640}
                height={427}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/images/SPORTS.jpg"
                alt="SPORTS"
                width={640}
                height={427}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/images/Movies.jpg"
                alt="Movies"
                width={640}
                height={427}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/images/DOCUMENTARIES.jpg"
                alt="DOCUMENTARIES"
                width={640}
                height={427}
              />
            </SwiperSlide>
          </Swiper>
        </VStack>
      )}
    </SimpleGrid>
  );
}
