import { JSX } from "react";

interface Node {
  type?: string
  title?: string
  text?: string
  bold?: boolean
  children?: Node[]
}

const renderNode = (node: Node): JSX.Element | null => {
  console.log(node)
  if (node.text && node.type === undefined) {
    return <Text text={node.text} bold={!!node.bold} />;
  }

  switch (node.type) {
    case 'block':
      console.log("TODO: Implement 'title")
      return <div className="bg-indigo-500">{node.children?.map((child: any, idx: number) => renderNode(child))}</div>;
    case 'p':
      return <p className="bg-green-500">{node.children?.map((child: any, idx: number) => renderNode(child))}</p>;
    case 'h1':
      return <h1 className="border">{node.children?.map((child: any, idx: number) => renderNode(child))}</h1>;
  }


  return null
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
