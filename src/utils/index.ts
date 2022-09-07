import { Dimensions } from "react-native";
import * as Camera from 'expo-camera';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
const { width, height } = Dimensions.get("window");

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor: number = 0.5) =>
  size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };



export type ImagePickerResult = {
  cancelled: boolean;
  uri: string;
};

export const pickImageFromCamera = async (options?: ImagePicker.ImagePickerOptions): Promise<ImagePickerResult> => {
  await Camera.requestCameraPermissionsAsync();

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: options?.allowsEditing || true,
    quality: options?.quality || 0.5,
    aspect: options?.aspect,
    mediaTypes: options?.mediaTypes,
    presentationStyle: options?.presentationStyle,
    videoMaxDuration: options?.videoMaxDuration,
    videoQuality: options?.videoQuality,
    allowsMultipleSelection: options?.allowsMultipleSelection,
    base64: options?.base64,
    exif: options?.exif,
  });

  if (!result.cancelled) {
    return {
      uri: result.uri,
      cancelled: false,
    };
  }

  return {
    uri: '',
    cancelled: true,
  };
};

export const pickImageFromGallery = async (options?: ImagePicker.ImagePickerOptions): Promise<ImagePickerResult> => {
  await ImagePicker.getMediaLibraryPermissionsAsync();
  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: options?.allowsEditing || true,
    quality: options?.quality || 1,
    aspect: options?.aspect,
    mediaTypes: options?.mediaTypes,
    presentationStyle: options?.presentationStyle,
    videoMaxDuration: options?.videoMaxDuration,
    videoQuality: options?.videoQuality,
    allowsMultipleSelection: options?.allowsMultipleSelection,
    base64: options?.base64,
    exif: options?.exif,
  });

  if (!result.cancelled) {
    return {
      uri: result.uri,
      cancelled: false,
    };
  }

  return {
    uri: '',
    cancelled: true,
  };
};

export const pickImageFromFile = async (options?: DocumentPicker.DocumentPickerOptions): Promise<ImagePickerResult> => {
  const result = await DocumentPicker.getDocumentAsync({
    type: options?.type || 'application/octet-stream',
    multiple: options?.multiple,
    copyToCacheDirectory: true,
  });

  if (result.type === 'success') {
    return {
      uri: result.uri,
      cancelled: false,
    };
  }

  return {
    uri: '',
    cancelled: true,
  };
};

export function localUriToFileBlob(uri: string) {
  const localUri = uri.replace('file://', '');
  const fileName = localUri.split('/').pop() ?? '';
  const match = /\.(\w+)$/.exec(fileName);
  const type = match ? `image/${match[1]}` : `image`;

  return [JSON.parse(JSON.stringify({ uri: localUri, type, name: fileName })), fileName];
}