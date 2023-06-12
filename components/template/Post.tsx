import { Center, Flex, Heading, Image, Spacer, Tag, Text } from "@chakra-ui/react";
import { Post } from "../../types";
import Header from "../organism/Header";
import MarkDownView from "../organism/MarkDownView";
import "github-markdown-css/github-markdown-light.css";

const PostView = (post: Post) => {
    return (
        <>
            <Header />
            <Center>
                <Flex width={"90%"} maxW={700} flexDirection={"column"} my={100}>
                    <Center mb={50}>
                        <Flex direction={"column"} gap={2}>
                            <Heading>{post.title}</Heading>
                            <Flex gap={2}>
                                <Spacer />
                                <Tag>#{post.category}</Tag>
                                <Tag>@{post.author}</Tag>
                            </Flex>
                        </Flex>
                    </Center>
                    <Image src={post.image_url} alt="thumb nail" borderRadius="lg" maxH={400} />
                    <Flex direction="column" my={100}>
                        <div className="markdown-body">
                            <MarkDownView post={post.content} />
                        </div>
                    </Flex>
                </Flex>
            </Center>
        </>
    );
};

export default PostView;
