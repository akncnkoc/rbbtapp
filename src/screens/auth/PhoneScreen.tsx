import { DefaultButton } from "@/components/DefaultButtons";
import DismissKeyboardView from "@/components/DismissKeyboardView";
import { AuthStackParams } from "@/navigation/Auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Box,
  Flex,
  Heading,
  Icon,
  KeyboardAvoidingView,
  Text,
  View,
  VStack,
} from "native-base";
import { FC, useState } from "react";
import { Image, Platform } from "react-native";
import ReactNativePhoneInput from "react-native-phone-input";
type Props = NativeStackScreenProps<AuthStackParams, "Phone">;

const PhoneScreen: FC<Props> = ({ navigation }) => {
  const [phone, setPhone] = useState("");

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
              Cep telefonu numaranızı giriniz
            </Heading>
            <Text
              fontSize={"xl"}
              textAlign="center"
              color={"gray.400"}
              fontWeight="medium"
            >
              Telefon numaranızı doğrulamak için 6 haneli bir kod göndereceğiz.
            </Text>
            <ReactNativePhoneInput
              style={{
                width: "100%",
                padding: 10,
                backgroundColor: "#F6F9FA",
                borderRadius: 6,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.15,
                shadowRadius: 1.0,
                elevation: 5,
                marginBottom: 10,
              }}
              pickerItemStyle={{
                height: 350,
              }}
              initialCountry="tr"
              cancelTextStyle={{
                padding: 10,
                backgroundColor: "black",
                color: "white",
                borderRadius: 16,
              }}
              confirmTextStyle={{
                padding: 10,
                backgroundColor: "black",
                color: "white",
                borderRadius: 16,
              }}
              autoFormat
              textProps={{
                placeholder: "Numaranızı giriniz...",
              }}
              onChangePhoneNumber={(displayValue) =>
                setPhone(displayValue)
              }
            />
            <DefaultButton onPress={() => navigation.push("Code", { phone })}>
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
export default PhoneScreen;
