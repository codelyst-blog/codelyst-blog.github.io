import ContactTemplate from "../components/template/Contact";
import { Profile } from "../types";
import { NextPage } from "next/types";
import { getAllProfiles } from "../utils/profileApi";
import { useState } from "react";

const Contact: NextPage<{ profiles: Profile[] }> = (props: { profiles: Profile[] }) => {
    const [profiles, setProfiles] = useState<Profile[]>(props.profiles);

    return <ContactTemplate profiles={profiles} />;
};

export async function getStaticProps() {
    const profiles = getAllProfiles(["name", "preview", "image_url", "job", "github_url", "content", "slug"]);

    return {
        props: {
            profiles,
        },
    };
}

export default Contact;
