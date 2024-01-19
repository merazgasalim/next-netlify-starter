import { useEffect, useState, useMemo } from "react";
import { IconButton } from "@chakra-ui/react";
import { IoIosArrowUp } from "react-icons/io";
import { throttle } from "lodash";
import { useRouter } from "next/router";
const ScrollUp = () => {
  const { locale } = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const handelScroll = (e) => {
    if (!window.scrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };
  const throttledHandelScroll = useMemo(
    () =>
      throttle(handelScroll, 500, {
        leading: true,
        trailing: true,
      }),
    []
  );
  useEffect(() => {
    document.addEventListener("scroll", throttledHandelScroll);
    return () => {
      document.removeEventListener("scroll", throttledHandelScroll);
      throttledHandelScroll.cancel();
    };
  }, [throttledHandelScroll]);

  return (
    <IconButton
      isRound
      colorScheme="brand"
      aria-label="scroll to top"
      size="sm"
      icon={<IoIosArrowUp size={24} />}
      position="fixed"
      right={locale === "ar" ? "auto" : isVisible ? 1 : -99999999999999}
      left={locale === "ar" ? (isVisible ? 1 : -99999999999999) : "auto"}
      bottom={2}
      zIndex={2}
      onClick={() => window.scrollTo(0, 0)}
    />
  );
};

export default ScrollUp;
