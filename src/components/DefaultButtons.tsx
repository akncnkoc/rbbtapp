import {
  Box,
  Flex,
  HStack,
  IPressableProps,
  Pressable,
  Text,
  useColorModeValue,
} from "native-base";
import { forwardRef } from "react";

type AlignedButtonProps = {
  icon: React.ReactNode | React.ReactNode[] | string;
} & IPressableProps;

const RightAlignedButton = forwardRef((props: AlignedButtonProps, ref: any) => (
  <Pressable
    ref={ref}
    rounded="md"
    p={3}
    bgColor="black"
    _pressed={{
      bgColor: "gray.800",
    }}
    {...props}
  >
    <HStack justifyContent={"space-between"} alignItems="center">
      <Flex flex={1} alignItems="center">
        <Text fontSize={"xl"} color="white">
          {props.children?.toString()}
        </Text>
      </Flex>
      <Box>{props.icon}</Box>
    </HStack>
  </Pressable>
));

const LeftAlignedButton = forwardRef((props: AlignedButtonProps, ref: any) => (
  <Pressable
    ref={ref}
    bgColor="black"
    rounded="md"
    p={3}
    _pressed={{
      bgColor: "gray.800",
    }}
    {...props}
  >
    <HStack justifyContent={"space-between"} alignItems="center">
      <Box>{props.icon}</Box>
      <Flex flex={1} alignItems="center">
        <Text fontSize={"xl"} color="white">
          {props.children?.toString()}
        </Text>
      </Flex>
    </HStack>
  </Pressable>
));

const DefaultButton = forwardRef((props: IPressableProps, ref: any) => (
  <Pressable
    ref={ref}
    bgColor="black"
    rounded="md"
    p={3}
    _pressed={{
      bgColor: "gray.800",
    }}
    display="flex"
    alignItems="center"
    {...props}
  >
    {props.children}
  </Pressable>
));

export { RightAlignedButton, LeftAlignedButton, DefaultButton };
