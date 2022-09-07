import { RightAlignedButton } from "@/components/DefaultButtons";
import DismissKeyboardView from "@/components/DismissKeyboardView";
import { AuthStackParams } from "@/navigation/Auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Flex,
  Heading,
  Icon,
  KeyboardAvoidingView,
  Text,
  VStack,
} from "native-base";
import { FC, useState } from "react";
import { Platform } from "react-native";
import Lottie from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { CompositeScreenProps } from "@react-navigation/native";
import { MainStackList } from "@/navigation/Main";

type Props = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParams, "ClientRegisterSuccess">,
  NativeStackScreenProps<MainStackList>
>;

const ClientRegisterSuccessScreen: FC<Props> = ({ navigation }) => {
  return (
    <KeyboardAvoidingView
      h={{
        base: "100%",
        lg: "auto",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <DismissKeyboardView>
        <Flex
          h="full"
          alignItems={"center"}
          justifyContent="space-between"
          py="8"
          px="4"
          bgColor={"white"}
        >
          <VStack
            space={4}
            justifyContent="center"
            alignItems="center"
            alignSelf={"center"}
            flex={1}
          >
            <Lottie
              source={require("../../../assets/app/anims/registersuccessdata.json")}
              autoPlay
              autoSize
              useNativeLooping
              enableMergePathsAndroidForKitKatAndAbove
              renderMode="AUTOMATIC"
              loop
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
            <Heading
              size="xl"
              fontWeight={"medium"}
              color={"black"}
              textAlign="center"
            >
              Gönderici kaydınız oluşturuldu!2
            </Heading>
            <Text
              fontSize={"xl"}
              textAlign="center"
              color={"gray.400"}
              fontWeight="medium"
            >
              Gönderici kaydınız başarıyla oluşturuldu. Eğer kurye olmak
              isterseniz dilediğiniz zaman Ayarlar kısmından kurye seçeneğine
              tıklayıp gerekli bilgileri doldurarak kurye olabilirsiniz.
            </Text>
          </VStack>
          <RightAlignedButton
            icon={
              <Icon
                as={Ionicons}
                name="ios-chevron-forward"
                size={"xl"}
                color={"white"}
              />
            }
            w="full"
            onPress={() => {
              navigation.replace("ClientApp");
            }}
          >
            Ana Ekrana Geç
          </RightAlignedButton>
        </Flex>
      </DismissKeyboardView>
    </KeyboardAvoidingView>
  );
};
export default ClientRegisterSuccessScreen;
