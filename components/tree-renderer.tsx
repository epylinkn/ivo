import { JSX } from "react";
import { TextNode, MentionNode, LabeledNode } from "../contract-types";
import Text from "./text";
import Heading from "./heading";
import Mention from "./mention";
import Clause from "./clause";

function PBlock({ text, children }: { text?: string; children?: any }) {
  // CANT TELL IF THIS IS A BUG OR NOT
  if (!children) return <span className="my-2">{text}</span>;

  return <div className="my-2">{children}</div>;
}

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
      return <PBlock key={key} text={node.text}>
        {node.children?.map((child: any) => TreeRenderer({ node: child }))}
      </PBlock>;
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
      return <div key={key}>{node.children?.map((child: any) => TreeRenderer({ node: child }))}</div>;
    case 'li':
      return <div key={key} className="flex">
        <li className="list-disc flex-shrink-0">{/* empty to get a disc */}</li>
        <div className="flex-1">
          {node.children?.map((child: any) => TreeRenderer({ node: child }))}
        </div>
      </div>;
    case 'lic':
      return <div key={key}>
        {node.children?.map((child: any) => TreeRenderer({ node: child }))}
      </div>;
    case 'mention':
      const mentionNode = node as MentionNode;
      return <Mention key={key} {...mentionNode} />;
    default:
      console.log("Unknown type: ", node.type, node);
      return null;
  }
}
