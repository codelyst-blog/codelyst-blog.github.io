import { Center, Flex, Heading, Image, Spacer, Tag, Text } from "@chakra-ui/react";
import { Post } from "../../types";
import Header from "../organism/Header";
import MarkDownView from "../organism/MarkDownView";
import { NextSeo } from 'next-seo';
import "github-markdown-css/github-markdown-light.css";

const PostView = (post: Post) => {
    return (
        <>
            <NextSeo
            title={post.title}
            description={post.preview}
            openGraph={{
                title: post.title,
                locale: "ko_KR", 
                description: post.preview,
                siteName: 'CodeLyst',
                type: 'article',
                article: {
                    publishedTime: post.create_date+'T12:00:00Z',
                    section: post.category,
                    tags: [],
                  },
                images: [
                    {
                      url: post.image_url,
                      alt: post.title,
                    },
                ],
              }}
            />
            <Header/>
            
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
