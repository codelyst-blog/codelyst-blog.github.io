import Header from "../organism/Header";
import ProfileCard from "../organism/ProfileCard";
import { Center, Heading } from "@chakra-ui/react";
import { Profile } from "../../types";
const Contact = ({ profiles }: { profiles: Profile[] }) => {
    return (
        <>
            <Header />
            <Center marginTop={100} paddingY={"2rem"}>
                <Heading>CONTACT</Heading>
            </Center>
            <Center flexDir={"column"} gap={5}>
                {profiles.map((item, key) => (
                    <ProfileCard {...item} key={key} />
                ))}
            </Center>
        </>
    );
};

export default Contact;
