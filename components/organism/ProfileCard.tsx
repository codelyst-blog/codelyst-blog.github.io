import { Card, Image, Stack, CardBody, Heading, Text, CardFooter, Button } from "@chakra-ui/react";

type Profile = {
    image_url: string;
    name: string;
    job: string;
    preview: string;
    github_url: string;
};

const ProfileCard = ({ image_url, name, job, preview, github_url }: Profile) => {
    return (
        <Card direction={{ base: "column", sm: "row" }} width={"70%"} overflow="hidden" variant="outline" p={"1rem 1rem 0 1rem"}>
            <Image objectFit="cover" boxSize="150px" src={image_url} alt="profile_image" borderRadius="full" alignSelf={"center"} />
            <Stack>
                <CardBody>
                    <Heading size="md">{name}</Heading>
                    <Text>{job}</Text>
                    <Text py="2" fontSize={"0.8rem"}>
                        {preview}
                    </Text>
                </CardBody>

                <CardFooter>
                    <Button variant="solid" colorScheme="gray" onClick={() => window.open(github_url)}>
                        Github
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
};

export default ProfileCard;
