import { FormikErrors } from "formik";
import { FormControl, IInputProps, Input, Text } from "native-base";
import { forwardRef } from "react";

type DefaultInputProps = {
  label: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  errors?: FormikErrors<any>;
  name?: string;
} & IInputProps;

const DefaultInput = forwardRef((props: DefaultInputProps, ref: any) => {
  const {
    label,
    isRequired,
    isInvalid,
    errors,
    name = "",
    ...inputProps
  } = props;
  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid}>
      <FormControl.Label>
        <Text fontWeight="semibold" fontSize={"md"}>
          {label}
        </Text>
      </FormControl.Label>
      <Input
        ref={ref}
        bgColor="gray.100"
        rounded="md"
        borderWidth={0}
        fontSize="md"
        p={"2.5"}
        {...inputProps}
      />
      {errors && (
        <FormControl.ErrorMessage>
          <Text fontSize={"sm"}>{errors[name]?.toString() || ""}</Text>
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  );
});

export { DefaultInput };
