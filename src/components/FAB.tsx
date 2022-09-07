import { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Box, Icon, Pressable, Text } from "native-base";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleColorMode } from "@/redux/colormode.slice";
const FAB: FC = () => {
  const colorModeState = useAppSelector(state => state.colorModeSlice.colorMode);
  const dispatch = useAppDispatch();
  return (
    <Pressable
      onPress={() => {
        dispatch(toggleColorMode())
      }}
      zIndex={999}
    >
      <Box
        position="absolute"
        bottom={24}
        right={12}
        w="16"
        h="16"
        rounded="full"
        bgColor="red.300"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Icon as={Ionicons} name="sunny" size="2xl" color="white" mt={1} />
        <Text color={"white"}>{colorModeState}</Text>
      </Box>
    </Pressable>
  );
};
export default FAB;
