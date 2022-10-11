/** @jsx h */

import blog, { h } from "blog";

import "https://esm.sh/prismjs@1.27.0/components/prism-typescript";
import "https://esm.sh/prismjs@1.27.0/components/prism-yaml";
import "https://esm.sh/prismjs@1.27.0/components/prism-python";

blog({
  title: "Dev Tips",
  description: "Snippets, tools, and techniques for development.",
  avatar: "./logo.png",
  avatarClass: "rounded-full",
  author: "Riley Tomasek",
  links: [
    { title: "Twitter", url: "https://twitter.com/rileytomasek" },
    { title: "GitHub", url: "https://github.com/rileytomasek" },
  ],
  port: 8012,
});
