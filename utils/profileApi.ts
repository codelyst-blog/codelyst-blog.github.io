import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const profilesDirectory = join(process.cwd(), "_profiles");

export function getProfileSlugs() {
    return fs.readdirSync(profilesDirectory);
}

export function getProfileBySlugs(slug: string, fields: string[] = []) {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(profilesDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);

    type Items = {
        [key: string]: string;
    };

    const items: Items = {};

    fields.forEach((field) => {
        if (field === "slug") {
            items[field] = realSlug;
        }
        if (field === "content") {
            items[field] = content;
        }
        if (typeof data[field] !== "undefined") {
            items[field] = data[field];
        }
    });
    return items;
}

export function getAllProfiles(fields: string[] = []) {
    const slugs = getProfileSlugs();
    const posts = slugs.map((slug) => getProfileBySlugs(slug, fields));
    return posts;
}
