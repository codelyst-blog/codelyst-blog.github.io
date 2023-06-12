import { NextPage } from "next/types";
import HomeView from "../components/template/Home";
import { Post } from "../types";
import { getAllPosts } from "../utils/api";
import { useState } from "react";

const Home: NextPage<{ posts: Post[] }> = (props: { posts: Post[] }) => {
    const [posts, setPosts] = useState(props.posts);

    const setCategoryPosts = (category: string) => {
        setPosts(filterCategory(category, props.posts));
    };

    return <HomeView posts={posts} onClickTag={setCategoryPosts} />;
};

const filterCategory = (category: string, posts: Post[]) => {
    return posts.filter((post) => post.category === category);
};

export async function getStaticProps() {
    const posts = getAllPosts(["title", "author", "preview", "image_url", "slug", "category"]);

    return {
        props: {
            posts,
        },
    };
}

export default Home;
