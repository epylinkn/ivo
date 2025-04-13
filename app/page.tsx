import { JSX } from "react";

interface Node {
  type?: string
  title?: string
  text?: string
  bold?: boolean
  children?: Node[]
}

interface MentionNode extends Node {
  type: 'mention'
  color: string
  id: string
  title: string
  value: string
  variableType: string
}

const renderNode = (node: Node): JSX.Element | null => {
  if (node.text && node.type === undefined) {
    return <Text text={node.text} bold={!!node.bold} />;
  }

  switch (node.type) {
    case 'block':
      return <div className="">{node.children?.map((child: any, idx: number) => renderNode(child))}</div>;
    case 'p':
      return <div className="">{node.children?.map((child: any, idx: number) => renderNode(child))}</div>;
    case 'h1':
      return <h1 className="">{node.children?.map((child: any, idx: number) => renderNode(child))}</h1>;
    case 'h2':
      return <h2 className="">{node.children?.map((child: any, idx: number) => renderNode(child))}</h2>;
    case 'h3':
      return <h3 className="">{node.children?.map((child: any, idx: number) => renderNode(child))}</h3>;
    case 'h4':
      return <h4 className="border">{node.children?.map((child: any, idx: number) => renderNode(child))}</h4>;
    case 'h5':
      return <h5 className="border">{node.children?.map((child: any, idx: number) => renderNode(child))}</h5>;
    case 'h6':
      return <h6 className="border">{node.children?.map((child: any, idx: number) => renderNode(child))}</h6>;
    case 'clause':
      return <div className="">{node.title} {node.children?.map((child: any, idx: number) => renderNode(child))}</div>;
    case 'ul':
      return <ul className="">{node.children?.map((child: any, idx: number) => renderNode(child))}</ul>;
    case 'li':
      return <li className="">{node.children?.map((child: any, idx: number) => renderNode(child))}</li>;
    case 'lic':
      return <li className="">{node.children?.map((child: any, idx: number) => renderNode(child))}</li>;
    case 'mention':
      const mentionNode = node as MentionNode;
      return <div className="inline-block" style={{ backgroundColor: mentionNode.color }}>{mentionNode.value}</div>;
    default: 
      console.log("Unknown type: ", node.type, node)
      return null;
  }
};

function Text({ text, bold }: { text: string, bold?: boolean }) {
  const textWithBreaks = text.replace(/\n/g, "<br/>"); // FIXME

  return <span className={bold ? "font-bold" : ""} dangerouslySetInnerHTML={{ __html: textWithBreaks }}></span>
}

export default function Home() {
  const tree = require("../data/input.json");

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <nav className="text-foreground dark:text-background">
        {/* <span className="text-3xl sm:text-4xl font-bold">Ivo Contract</span> */}
      </nav>

      <main className="text-foreground dark:text-background">
        {renderNode(tree[0])}
      </main>

      <footer className="flex gap-[24px] flex-wrap items-center justify-center">
        <span className="text-foreground dark:text-background">Made with 💗 by Anthony Bui.</span>
      </footer>
    </div>
  );
}
