import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { useRef } from "react";

interface Props {
    header: string;
    message: string;
    submitText: string;
    submitColor: string;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

export default function ModalContainer({ header, message, submitText, submitColor, isOpen, onClose, onSubmit }: Props) {

    const cancelRef = useRef(null);

    const handleSubmit = () => {
        onClose();
        onSubmit();
    }

    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            {header}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {message}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme={submitColor} onClick={handleSubmit} ml={3}>
                                {submitText}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}