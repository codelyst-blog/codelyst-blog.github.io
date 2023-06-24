import Header from "../../components/organism/Header";
import { Text, SimpleGrid, GridItem, Center, Heading, Tag, Flex, Image } from "@chakra-ui/react";
import PostCard from "../../components/organism/PostCard";
import { Post } from "../../types";
import Head from "next/head";
import { CATEGORY_LIST } from "../../constValiable";
import Banner from "../../public/image/banner.png";

const Home = (props: { posts: Post[]; onClickTag: Function }) => {
    return (
        <>
            <Head>
                <title>CodeLyst</title>
                <meta name="description" content="Codelyst 팀 블로그입니다." />
                <meta name="google-site-verification" content="G9K7apTa4HjEtsjnsZQ1Rc6uoG57I8eh2S0stJmx9NE" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Header />
                <Center>
                    <Flex width="90%" marginY={100} flexDirection="column">
                        <Center py="2rem">
                            <Image src={"../image/banner.png"} alt="thumb nail" borderRadius="lg" maxH={400} />
                        </Center>
                        <Center>
                            <Heading fontSize="2xl" py="2rem">
                                CATEGORIES.
                            </Heading>
                        </Center>
                        <Center gap={2} mb={2}>
                            {CATEGORY_LIST.slice(0, 4).map((category: string) => {
                                return (
                                    <GridItem key={category}>
                                        <Tag onClick={() => props.onClickTag(category)}>#{category}</Tag>
                                    </GridItem>
                                );
                            })}
                        </Center>
                        <Center gap={2}>
                            {CATEGORY_LIST.slice(4, CATEGORY_LIST.length).map((category: string) => {
                                return (
                                    <GridItem key={category}>
                                        <Tag onClick={() => props.onClickTag(category)}>#{category}</Tag>
                                    </GridItem>
                                );
                            })}
                        </Center>

                        <Center marginTop="2rem">
                            <Heading fontSize="2xl">Contributors</Heading>
                        </Center>
                        <Center gap="6" marginTop="1rem" marginBottom="2rem">
                            <Text fontSize="md">@kkiyya</Text>
                            <Text fontSize="md">@jimin</Text>
                            <Text fontSize="md">@otacu</Text>
                        </Center>

                        <Center>
                            <SimpleGrid gap={10} columns={{ sm: 1, md: 2 }}>
                                {props.posts.map((post) => {
                                    return (
                                        <GridItem key={post.create_date}>
                                            <PostCard {...post} />
                                        </GridItem>
                                    );
                                })}
                            </SimpleGrid>
                        </Center>
                    </Flex>
                </Center>
            </main>
        </>
    );
};

export default Home;
