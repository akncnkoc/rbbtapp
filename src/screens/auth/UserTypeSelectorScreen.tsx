import { DefaultButton } from "@/components/DefaultButtons";
import DismissKeyboardView from "@/components/DismissKeyboardView";
import { AuthStackParams } from "@/navigation/Auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Box,
  Flex,
  Heading,
  HStack,
  KeyboardAvoidingView,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { FC, useState } from "react";
import { Image, Platform } from "react-native";
import ClientIcon from "../../../assets/app/svg/client.svg";
import CourierIcon from "../../../assets/app/svg/courier.svg";
type Props = NativeStackScreenProps<AuthStackParams, "UserTypeSelector">;

const UserTypeSelectorScreen: FC<Props> = ({ navigation }) => {
  const [userType, setUserType] = useState(0);

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
          justifyContent="center"
          py="8"
          px="4"
          bgColor={"white"}
        >
          <VStack space={4}>
            <Heading
              size="xl"
              fontWeight={"medium"}
              color={"black"}
              textAlign="center"
            >
              Lütfen hangisi olarak devam etmek istediğinizi seçiniz
            </Heading>
            <Text
              fontSize={"xl"}
              textAlign="center"
              color={"gray.400"}
              fontWeight="medium"
            >
              Telefon numaranız onaylandı. Şimdi lütfen uygulamayı hangi amaçla
              kullanacağınızı seçiniz. Dilerseniz daha sonra iki seçim arasında
              geçiş yapabilirsiniz.
            </Text>
            <HStack space={2} p="8">
              {["Gönderici", "Taşıyıcı"].map((item, index) => (
                <Flex flex={1} key={item}>
                  <Pressable onPress={() => setUserType(index)}>
                    <Flex
                      alignItems="center"
                      p="2"
                      rounded="lg"
                      borderWidth={2}
                      borderColor={index == userType ? "success.500" : "white"}
                    >
                      <Box
                        bgColor="gray.100"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        p="4"
                        w="full"
                        minH="32"
                        rounded="lg"
                        mb={2}
                      >
                        {index == 0 ? (
                          <ClientIcon
                            style={{
                              transform: [{ rotateY: "180deg" }],
                            }}
                          />
                        ) : (
                          <CourierIcon
                            style={{
                              transform: [{ rotateY: "180deg" }],
                            }}
                          />
                        )}
                      </Box>
                      <Text fontSize={"xl"} fontWeight="500">
                        {item}
                      </Text>
                    </Flex>
                  </Pressable>
                </Flex>
              ))}
            </HStack>
            <DefaultButton
              onPress={() => {
                !userType
                  ? navigation.push("ClientPersonalInformation")
                  : navigation.push("CourierPersonalInformation");
              }}
            >
              <Text color="white" fontSize="lg">
                Devam Et
              </Text>
            </DefaultButton>
          </VStack>
        </Flex>
      </DismissKeyboardView>
    </KeyboardAvoidingView>
  );
};
export default UserTypeSelectorScreen;
