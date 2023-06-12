import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useState, useEffect } from "react";
import remarkGfm from "remark-gfm";
interface MarkdownViewProps {
    post: string;
}

const MarkdownView = ({ post }: MarkdownViewProps) => {
    const [style, setStyle] = useState({});
    useEffect(() => {
        import("react-syntax-highlighter/dist/esm/styles/hljs").then((mod) => setStyle(mod.default));
    });

    return (
        <ReactMarkdown
            components={{
                code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                        <SyntaxHighlighter language={match[1]} PreTag="div" {...props} style={style} remarkPlugins={[remarkGfm]}>
                            {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                },
            }}
        >
            {post}
        </ReactMarkdown>
    );
};

export default MarkdownView;
