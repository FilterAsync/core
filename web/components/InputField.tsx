import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Textarea,
} from "@chakra-ui/core";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
    label,
    textarea,
    size: _,
    ...props
}) => {
    let InputOrTextarea = Input;
    if (textarea) {
        InputOrTextarea = Textarea;
    }
    const [field, { error }] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <InputOrTextarea {...field} {...props} id={field.name} />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : undefined}
        </FormControl>
    );
};

// gtg
// oh btw do npm i @chakra-ui/core
//ok
// btw i dont understand this typescript code
// it might be a problem if i dont understand it
// i'm lazy 
// most of them are types for intellisense
// why is intellisense so important tho
// do u want to continue later
// i can commit all the changes we did rn
// ok
// hold on
// do  npm i @chakra-ui/core
// i already did ok
// it still gives error
// yeah yeah because i can't code without intellisense