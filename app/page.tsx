import { JSX } from "react";
import cn from "classnames";

interface Node {
  type?: string
  title?: string
  text?: string
  bold?: boolean
  children?: Node[]
}

interface MarkNode extends Node {
  type: 'mark'
  text: string
  bold?: boolean
  underline?: boolean
  // italicize?: boolean // Doesn't exist in input.json?
}

interface MentionNode extends Node {
  type: 'mention'
  color: string
  id: string
  title: string
  value: string
  variableType: string
}

let clauseIndex = 0

const renderNode = (node: Node): JSX.Element | null => {
  if (node.text && node.type === undefined) {
    const markNode = node as MarkNode;
    return <Mark {...markNode} />;
  }

  switch (node.type) {
    case 'block':
      return <div className="my-4">{node.children?.map((child: any, idx: number) => renderNode(child))}</div>;
    case 'p':
      return <div className="my-2">{node.children?.map((child: any, idx: number) => renderNode(child))}</div>;
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      const level = node.type.replace("h", "");
      return <Heading level={level} tree={node.children} />;
    case 'clause': {
      clauseIndex += 1
      return <Clause number={clauseIndex} tree={node.children} />
    }
    case 'ul':
      return <ul className="">{node.children?.map((child: any, idx: number) => renderNode(child))}</ul>;
    case 'li':
      return <li className="">{node.children?.map((child: any, idx: number) => renderNode(child))}</li>;
    case 'lic':
      return <li className="">{node.children?.map((child: any, idx: number) => renderNode(child))}</li>;
    case 'mention':
      const mentionNode = node as MentionNode;
      return <Mention {...mentionNode} />;
    default:
      console.log("Unknown type: ", node.type, node)
      return null;
  }
};

function Clause({ number, tree }: { number: number, tree: any }) {
  return (
    <div className="indent-4 relative my-2">
      <div className="absolute left-[-1rem]">{number}.</div>
      <div className="">
        {tree?.map((child: any, idx: number) => renderNode(child))}
      </div>
    </div>
  )
}

function Heading({ level, tree }: { level: string, tree: any }) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag className="">{tree?.map((child: any, idx: number) => renderNode(child))}</Tag>;
}

function Mention({ value, color, id, title, variableType }: { value: string, color: string, id: string, title: string, variableType: string }) {
  return <div
    data-id={id}
    data-title={title}
    data-variable-type={variableType}
    className="inline-block text-white px-2 py-1 rounded"
    style={{ backgroundColor: color }}>
    {value}
  </div>;
}

function Mark({ text, bold, underline }: { text: string, bold?: boolean, underline?: boolean }) {
  const textWithBreaks = text.replace(/\n/g, "<br/>"); // FIXME

  return <span className={cn(bold && "font-bold", underline && "underline")} dangerouslySetInnerHTML={{ __html: textWithBreaks }} />
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
