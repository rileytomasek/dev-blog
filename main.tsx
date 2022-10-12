/** @jsx h */

import blog, { h } from "blog";

import "https://esm.sh/prismjs@1.27.0/components/prism-typescript";
import "https://esm.sh/prismjs@1.27.0/components/prism-yaml";
import "https://esm.sh/prismjs@1.27.0/components/prism-python";

blog({
  title: "Dev Tips",
  description: "Snippets, tools, and techniques for development.",
  author: "Riley Tomasek",
  favicon: "https://assets.rile.yt/favicons/favicon.svg",
  avatar: "https://assets.rile.yt/logos/circle-128.svg",
  avatarClass: "rounded-full",
  ogImage: "https://assets.rile.yt/api/default",
  links: [
    { title: "Twitter", url: "https://twitter.com/rileytomasek" },
    { title: "GitHub", url: "https://github.com/rileytomasek" },
  ],
  style: `.markdown-body ul { list-style: disc !important; } .markdown-body ol { list-style: decimal !important; }`,
  port: 8012,
});
