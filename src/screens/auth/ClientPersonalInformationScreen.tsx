import { DefaultButton, LeftAlignedButton } from "@/components/DefaultButtons";
import { DefaultInput } from "@/components/DefaultInputs";
import DismissKeyboardView from "@/components/DismissKeyboardView";
import { AuthStackParams } from "@/navigation/Auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as FilePicker from "@/utils";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  Stack,
  Text,
  VStack,
  Pressable,
} from "native-base";
import { FC, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Keyboard, Platform, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MediaTypeOptions } from "expo-image-picker";
type Props = NativeStackScreenProps<
  AuthStackParams,
  "ClientPersonalInformation"
>;

const ClientPersonalInformationScreen: FC<Props> = ({ navigation }) => {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [profilePhotoPickerModal, setProfilePhotoPickerModal] = useState(false);
  const userInformation = useFormik({
    initialValues: {
      name: "",
      surname: "",
      birth_at: "27/12/1990",
      email: "",
      identity_no: "",
      profile_photo: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("İsim boş geçilemez"),
      surname: Yup.string().required("Soyisim boş geçilemez"),
      email: Yup.string()
        .required("E-Posta boş geçilemez")
        .email("E-Posta geçersiz"),
      identity_no: Yup.number()
        .min(10000000000, "TC Kimlik No geçersiz")
        .max(99999999999, "TC Kimlik No geçersiz")
        .required("TC Kimlik No boş geçilemez"),
    }),
    onSubmit(values, formikHelpers) {
      navigation.replace("ClientRegisterSuccess");
    },
  });

  const imagePickerOnPress = async (type: string) => {
    try {
      if (type === "camera") {
        const result = await FilePicker.pickImageFromCamera({
          mediaTypes: MediaTypeOptions.Images,
          aspect: [1, 1],
          quality: 0.1,
        });
        if (!result.cancelled) {
          userInformation.setFieldValue("profile_photo", result.uri);
        }
      } else if (type === "gallery") {
        const result = await FilePicker.pickImageFromGallery({
          mediaTypes: MediaTypeOptions.Images,
          aspect: [1, 1],
          quality: 1,
        });
        if (!result.cancelled) {
          userInformation.setFieldValue("profile_photo", result.uri);
          setProfilePhotoPickerModal(false);
          console.log(result.uri);
        }
      } else if (type === "file") {
        const result = await FilePicker.pickImageFromFile({
          type: ["image/jpeg", "image/png", "image/jpg"],
          multiple: false,
        });
        if (!result.cancelled) {
          userInformation.setFieldValue("profile_photo", result.uri);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <KeyboardAvoidingView
      h={{
        base: "auto",
        lg: "auto",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <DismissKeyboardView>
        <Modal
          isOpen={profilePhotoPickerModal}
          onClose={() => setProfilePhotoPickerModal(false)}
        >
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>
              <Text fontSize={"xl"} fontWeight="medium">
                Seçim Yap
              </Text>
            </Modal.Header>
            <Modal.Body>
              <VStack space={2}>
                <LeftAlignedButton
                  icon={
                    <Icon as={Ionicons} name="document-outline" size="xl" />
                  }
                  onPress={() => imagePickerOnPress("gallery")}
                >
                  Telefondan Seç
                </LeftAlignedButton>
                <LeftAlignedButton
                  icon={<Icon as={Ionicons} name="camera-outline" size="xl" />}
                >
                  Kamera ile çek
                </LeftAlignedButton>
              </VStack>
            </Modal.Body>
          </Modal.Content>
        </Modal>
        <Flex h="full" alignItems={"center"} py="4" px="2" bgColor={"white"}>
          <ScrollView bgColor={"white"}>
            <VStack space={2}>
              <Heading
                size="xl"
                fontWeight={"medium"}
                color={"black"}
                textAlign="center"
              >
                Lütfen bilgilerinizi doldurunuz
              </Heading>
              <Text
                fontSize={"xl"}
                textAlign="center"
                color={"gray.400"}
                fontWeight="medium"
              >
                ******** kanunu gereğince taşımacılık yaparken tarafların TC
                Kimlik No'ları gerekmektedir.
              </Text>
              <Stack space={2} mb="4">
                <HStack space={2}>
                  <Pressable
                    onPress={() => setProfilePhotoPickerModal(true)}
                    style={{ flex: 0.5 }}
                    _pressed={{
                      opacity: 0.5,
                    }}
                  >
                    <Flex flex={1}>
                      <Text fontWeight="semibold" fontSize={"md"} my="1">
                        Profil Fotografı
                      </Text>
                      {userInformation.values.profile_photo == null ? (
                        <Box
                          bgColor={"gray.100"}
                          flex={1}
                          rounded="lg"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Icon
                            as={Ionicons}
                            name="ios-camera-outline"
                            size="2xl"
                            color="gray.400"
                          />
                          <Text
                            fontSize="md"
                            fontWeight="semibold"
                            color="gray.400"
                          >
                            Fotograf Yükleyin
                          </Text>
                        </Box>
                      ) : (
                        <Flex
                          flex={1}
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Image
                            source={{
                              uri: userInformation.values.profile_photo,
                            }}
                            style={{
                              borderRadius: 100,
                              height: 100,
                              width: 100,
                            }}
                          />
                        </Flex>
                      )}
                    </Flex>
                  </Pressable>
                  <VStack flex={1}>
                    <Flex flex={1}>
                      <DefaultInput
                        name="name"
                        label="İsim"
                        isRequired
                        value={userInformation.values.name}
                        onChangeText={(val) =>
                          userInformation.setFieldValue("name", val)
                        }
                        isInvalid={
                          "name" in userInformation.errors &&
                          "name" in userInformation.touched
                        }
                        errors={userInformation.errors}
                      />
                      <DefaultInput
                        name="surname"
                        label="Soyisim"
                        isRequired
                        value={userInformation.values.surname}
                        onChangeText={(val) =>
                          userInformation.setFieldValue("surname", val)
                        }
                        isInvalid={
                          "surname" in userInformation.errors &&
                          "surname" in userInformation.touched
                        }
                        errors={userInformation.errors}
                      />
                    </Flex>
                  </VStack>
                </HStack>
                <DefaultInput
                  label="Doğum Tarihi"
                  placeholder="GG/AA/YYYY"
                  value={userInformation.values.birth_at}
                  showSoftInputOnFocus={false}
                  onPressIn={() => {
                    Keyboard.dismiss();
                    setDatePickerVisible(true);
                  }}
                />
                <DateTimePickerModal
                  isVisible={datePickerVisible}
                  locale="tr"
                  mode="date"
                  maximumDate={
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() - 18)
                    )
                  }
                  onCancel={() => {
                    setDatePickerVisible(false);
                  }}
                  onConfirm={(date) => {
                    setDatePickerVisible(false);
                    if (!date) return;
                    const [year, month, day] = date.toISOString().split("-");

                    const formattedDate = `${
                      day.split("T")[0]
                    }/${month}/${year}`;

                    userInformation.setFieldValue("birth_at", formattedDate);
                  }}
                />
                <DefaultInput
                  name="email"
                  label="E-Posta"
                  keyboardType="email-address"
                  isRequired
                  value={userInformation.values.email}
                  onChangeText={(val) =>
                    userInformation.setFieldValue("email", val)
                  }
                  isInvalid={
                    "email" in userInformation.errors &&
                    "email" in userInformation.touched
                  }
                  errors={userInformation.errors}
                />
                <DefaultInput
                  name="identity_no"
                  label="TC Kimlik No"
                  isRequired
                  maxLength={11}
                  keyboardType="number-pad"
                  value={userInformation.values.identity_no}
                  onChangeText={(val) =>
                    userInformation.setFieldValue("identity_no", val)
                  }
                  isInvalid={
                    "identity_no" in userInformation.errors &&
                    "identity_no" in userInformation.touched
                  }
                  errors={userInformation.errors}
                />
              </Stack>
              <DefaultButton
                onPress={() => {
                  userInformation.handleSubmit();
                }}
              >
                <Text color="white" fontSize="lg">
                  Devam Et
                </Text>
              </DefaultButton>
            </VStack>
          </ScrollView>
        </Flex>
      </DismissKeyboardView>
    </KeyboardAvoidingView>
  );
};
export default ClientPersonalInformationScreen;
