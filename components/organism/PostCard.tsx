import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button } from "@chakra-ui/react";
import { Post } from "../../types";
import Link from "next/link";

export default function PostCard(post: Post) {
    return (
        <Link href={`/${post.slug}`}>
            <Card maxW="sm">
                <CardBody>
                    <Image src={post.image_url} alt="thumb nail" borderRadius="lg" h={200} />
                    <Stack mt="6" spacing="3">
                        <Heading size="lg">{post.title}</Heading>
                        <Text>{post.preview}</Text>
                        <Text color="gray.600" fontSize="sm">
                            @{post.author}
                        </Text>
                    </Stack>
                </CardBody>
            </Card>
        </Link>
    );
}
