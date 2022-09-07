import { Flex, ScrollView } from "native-base";
import { FC } from "react";
import NearbyCourier from "./NearbyCourier";

const Home: FC = () => {
  return (
    <ScrollView flex={1} bgColor={"white"}>
      <Flex flex={1} p={5}>
        <NearbyCourier />
      </Flex>
    </ScrollView>
  );
};

export default Home;
