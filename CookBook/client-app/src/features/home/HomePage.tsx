import { Button, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";


export default function HomePage() {
    return (
        <Center h='90vh'>
            <Button colorScheme='blackAlpha' size='lg' as={Link} to='/recipes' variant='outline'>
                Go to recipes!
            </Button>
        </Center>
    )
}