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
}

const ModalWrap = ({ isOpen, onClose, title, children }: ModalProps) => {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size={"3xl"}>
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
