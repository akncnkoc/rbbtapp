import { Flex, HStack, Text } from "native-base";
import { FC } from "react";
import HelmetIcon from "../../../../../assets/app/svg/helmet.svg";
const NearbyCourier: FC = () => {
  return (
    <Flex>
      <HStack direction="row" alignItems="center" space={4}>
        <HelmetIcon />
        <Text fontSize={"xl"} fontWeight="semibold">
          Yakındaki Kuryeler
        </Text>
      </HStack>
    </Flex>
  );
};
export default NearbyCourier;
