import { AddIcon, ArrowBackIcon, CalendarIcon } from "@chakra-ui/icons";
import { Text, Button, ButtonGroup, Flex, Icon, HStack } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";



export default function NavBar() {


    return (
        <>
            <Flex minWidth='max-content' alignItems='center' gap='2' p='2' bgColor='blackAlpha.800' shadow='lg'>
                <ButtonGroup gap='2' p='2'>
                    <HStack as={Link} to='/recipes' color='whiteAlpha.800'>
                        <Icon as={CalendarIcon} />
                        <Text fontSize='lg'>
                            CookBook App
                        </Text>
                    </HStack>
                    <Button
                        leftIcon={<AddIcon />} color='whiteAlpha.700' size='md' as={Link} to='/recipes/manage' variant='link'>
                        Create new recipe
                    </Button>
                    <Button
                        leftIcon={<ArrowBackIcon />} color='whiteAlpha.700' size='md' as={Link} to='/' variant='link'>
                        Back to start
                    </Button>
                </ButtonGroup>
            </Flex>
            <Outlet />
        </>
    )
}