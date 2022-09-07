import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';

const DismissKeyboardView = (Comp: any) => {
  return ({ children, ...props }: any) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props}>
        {children}
      </Comp>
    </TouchableWithoutFeedback>
  );
};
export default DismissKeyboardView(View)