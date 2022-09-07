import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, SafeAreaView, useWindowDimensions } from "react-native";
import { Box, Flex, HStack, Icon, Text, VStack } from "native-base";
import Carousel from "react-native-snap-carousel";
import { FC, useState } from "react";
import {RightAlignedButton} from "@/components/DefaultButtons";
import { Ionicons } from "@expo/vector-icons";
import { MainStackList } from "@/navigation/Main";
type Props = NativeStackScreenProps<MainStackList, "Introduction">;

type IntroTextType = {
  title: string;
  text: string;
  image: string;
};

const Introduction: FC<Props> = ({navigation}) => {
  const [currentState, setCurrentState] = useState(0);

  const introTexts: IntroTextType[] = [
    {
      title: "Kolayca Gönderi Oluştur 1",
      text: "Basit ve kullanışlı arayüzümüz sayesinde kayıt olduktan hemen sonra ilk gönderini kolayca oluşturabilirsin.",
      image: require("../../../assets/app/intro/intro1.png"),
    },
    {
      title: "Kolayca Gönderi Oluştur 2",
      text: "Basit ve kullanışlı arayüzümüz sayesinde kayıt olduktan hemen sonra ilk gönderini kolayca oluşturabilirsin.",
      image: require("../../../assets/app/intro/intro1.png"),
    },
    {
      title: "Kolayca Gönderi Oluştur 3",
      text: "Basit ve kullanışlı arayüzümüz sayesinde kayıt olduktan hemen sonra ilk gönderini kolayca oluşturabilirsin.",
      image: require("../../../assets/app/intro/intro1.png"),
    },
    {
      title: "Kolayca Gönderi Oluştur 4",
      text: "Basit ve kullanışlı arayüzümüz sayesinde kayıt olduktan hemen sonra ilk gönderini kolayca oluşturabilirsin.",
      image: require("../../../assets/app/intro/intro1.png"),
    },
  ];

  const renderCarouselItem = ({ item, index }: any) => {
    return (
      <VStack alignItems="center" space={2} px="8">
        <Image source={item.image} />
        <Text fontSize={"3xl"} fontWeight="medium">
          {item.title}
        </Text>
        <Text fontSize={"xl"} textAlign="center" color="gray.500">
          {item.text}
        </Text>
      </VStack>
    );
  };

  return (
    <SafeAreaView>
      <Carousel
        data={introTexts}
        renderItem={renderCarouselItem}
        sliderWidth={useWindowDimensions().width}
        itemWidth={useWindowDimensions().width}
        autoplay
        autoplayInterval={3000}
        enableMomentum
        onBeforeSnapToItem={(slideIndex) => setCurrentState(slideIndex)}
      />
      <HStack justifyContent={"center"} mt="4" space={2}>
        {[0, 1, 2, 3].map((item) => (
          <Box
            key={item}
            w="2"
            h="2"
            rounded={"full"}
            bgColor={currentState == item ? "black" : "gray.300"}
          ></Box>
        ))}
      </HStack>
      <Flex mx={8} my={4}>
        <RightAlignedButton
          icon={
            <Icon
              as={Ionicons}
              name="ios-chevron-forward"
              size={"xl"}
              color={"white"}
            />
          }
          onPress={() => navigation.replace('Auth')}
        >
          Kayıt Ol & Giriş Yap
        </RightAlignedButton>
      </Flex>
    </SafeAreaView>
  );
};

export default Introduction;
