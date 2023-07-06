import {
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
} from "@chakra-ui/react";
import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  isCentered?: boolean;
  title: string;
  size?: string;
}

const ModalWrap = ({
  isOpen,
  onClose,
  title,
  size = "3xl",
  children,
}: ModalProps) => {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size={size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalWrap;
