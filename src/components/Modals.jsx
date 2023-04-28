import {
  Button,
  useDisclosure,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Modals({ suggestion, setSuggestion }) {
  const [name, setName] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickSuggestion = (e) => {
    e.preventDefault();
    if (name === "") {
      alert("제안을 입력해 주세요!");
    } else {
      setSuggestion([...suggestion, name]);
      setName("");
      onClose();
    }
  };

  return (
    <>
      <button
        className="mr-2 text-textPrimary h-[52px] text-base w-full rounded-2xl font-medium cursor-pointer leading-normal shadow-sm  bg-gray-700 hover:bg-yellow-400 "
        onClick={onOpen}
      >
        제안하기
      </button>
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          motionPreset="slideInBottom"
          size={"lg"}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>What's Up?!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={onClickSuggestion}>
                <Input
                  placeholder="제안을 입력해주세요!"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <Button type="submit" mt={"15px"}>
                  제안하기
                </Button>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button ml={4} onClick={onClose} colorScheme="blue">
                닫기
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
}
