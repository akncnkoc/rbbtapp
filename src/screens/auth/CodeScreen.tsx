import { DefaultButton } from "@/components/DefaultButtons";
import DismissKeyboardView from "@/components/DismissKeyboardView";
import { AuthStackParams } from "@/navigation/Auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Flex, Heading, KeyboardAvoidingView, Text, VStack } from "native-base";
import { FC, useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import {StyleSheet} from 'react-native'
type Props = NativeStackScreenProps<AuthStackParams, "Code">;

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 48,
    fontSize: 24,
    backgroundColor: "#F6F9FA",
    textAlign: "center",
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.0,
    elevation: 5,
    fontFamily: 'Dosis_500Medium'
  }
});

const CELL_COUNT = 6;

const CodeScreen: FC<Props> = ({
  navigation,
  route: {
    params: { phone },
  },
}) => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
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
              Cep telefonunuza gelen kodu giriniz
            </Heading>
            <Text
              fontSize={"xl"}
              textAlign="center"
              color={"gray.400"}
              fontWeight="medium"
            >
              Lütfen mesajlarınızı kontrol edin ve {phone} numarasına
              gönderdiğimiz kodu girin.
            </Text>
            <CodeField
              ref={ref}
              {...props}
              // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[styles.cell]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
            <Text
              fontSize={"xl"}
              textAlign="center"
              color={"gray.500"}
              fontWeight="medium"
            >
              Kodun gelmesi zaman alabilir eğer hiç kod almadıysanız lütfen{" "}
              <TouchableOpacity>
                <Text
                  underline
                  fontSize={"lg"}
                  color={"black"}
                  fontWeight="medium"
                >
                  Tekrar Kod Gönder
                </Text>
              </TouchableOpacity>
              'e basın.
            </Text>
            <DefaultButton onPress={() => navigation.replace("UserTypeSelector")}>
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
export default CodeScreen;
