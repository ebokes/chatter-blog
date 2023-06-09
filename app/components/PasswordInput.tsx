"use client";

import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { IconType } from "react-icons";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface PasswordInputProps {
  icon?: ReactElement<IconType>;
}

export default function PasswordInput({}: PasswordInputProps) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Enter password"
        required
        name="password"
        // onChange={handleChange}
      />
      <InputRightElement width="4.5rem">
        <Button
          h="1.75rem"
          size="sm"
          onClick={handleClick}
          mr="-15.5px"
          variant="ghost"
          _hover={{ variant: "ghost" }}
          _active={{ variant: "ghost" }}
        >
          {show ? <FiEye size={"20px"} /> : <FiEyeOff size={"20px"} />}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
