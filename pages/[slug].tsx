import PostView from "../components/template/Post";
import { Post as PostType } from "../types";
import { getAllPosts, getPostBySlugs } from "../utils/api";

const Post = ({ post }: { post: PostType }) => {
    return <PostView {...post} />;
};

export async function getStaticProps({
    params,
}: {
    params: {
        slug: string;
    };
}) {
    const post = getPostBySlugs(params.slug, ["title", "preview", "image_url", "create_date", "content", "slug", "category", "author"]);

    return {
        props: {
            post: {
                ...post,
            },
        },
    };
}

export async function getStaticPaths() {
    const posts = getAllPosts(["slug"]);

    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            };
        }),
        fallback: false,
    };
}
export default Post;
