import { JSX } from "react";
import { TextNode, MentionNode, LabeledNode } from "../contract-types";
import Text from "./text";
import Heading from "./heading";
import Mention from "./mention";
import Clause from "./clause";

// The main rendering function for all node types
export function TreeRenderer({ node }: { node: LabeledNode }): JSX.Element | null {
  const key = `index-${node.index}-depth-${node.depth}`;

  if (node.text && node.type === undefined) {
    const textNode = node as TextNode;
    return <Text key={key} {...textNode} />;
  }

  switch (node.type) {
    case 'block':
      return <div key={key} className="my-4">{node.children?.map((child: any) => TreeRenderer({ node: child }))}</div>;
    case 'p':
      return <div key={key} className="my-2">{node.children?.map((child: any) => TreeRenderer({ node: child }))}</div>;
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      const level = node.type.replace("h", "");
      return <Heading key={key} level={level} tree={node.children} />;
    case 'clause': {
      return <Clause key={key} number={1} tree={node.children} />
    }
    case 'ul':
      return <div key={key} className="indent-4">{node.children?.map((child: any) => TreeRenderer({ node: child }))}</div>;
    case 'li':
      return <div key={key} className="indent-4">{node.children?.map((child: any) => TreeRenderer({ node: child }))}</div>;
    case 'lic':
      return <div key={key} className="indent-4">{node.children?.map((child: any) => TreeRenderer({ node: child }))}</div>;
    case 'mention':
      const mentionNode = node as MentionNode;
      return <Mention key={key} {...mentionNode} />;
    default:
      console.log("Unknown type: ", node.type, node);
      return null;
  }
}
