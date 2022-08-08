import { Box, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";

interface Props {
    sortByName: () => void;
    sortByNewest: () => void;
    sortByOldest: () => void;
}

export default function RecipeFilters({ sortByName, sortByNewest, sortByOldest }: Props) {

    const sortMethods: string[] = [
        'Alphabetically',
        'The newest',
        'The oldest',
    ];

    const handleSortClick = (e: string) => {
        switch (e) {
            case sortMethods[0]:
                sortByName();
                break;
            case sortMethods[1]:
                sortByNewest();
                break;
            case sortMethods[2]:
                sortByOldest();
                break;
        }
    }

    return (
        <>
            <Stack bgColor='blackAlpha.400' borderRadius='lg' p='2'>
                <Text fontSize='2xl' color='whiteAlpha.600' textAlign='center'>
                    Choose a filtering method:
                </Text>
                <RadioGroup p='6' onChange={handleSortClick}>
                    <Stack>
                        {sortMethods.map(method => (
                            <Radio size='lg' colorScheme='gray' key={method} value={method}>
                                <Text fontSize='lg' color='whiteAlpha.600' textAlign='center'>
                                    {method}
                                </Text>
                            </Radio>
                        ))}
                    </Stack>
                </RadioGroup>
            </Stack>
        </>
    )
}