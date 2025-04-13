import { JSX } from "react";
import ContractTree from "./contract-tree";

interface HeadingProps {
  level: string;
  tree: any;
}

export default function Heading({ level, tree }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag className="">
    {tree?.map((child: any, idx: number) => (
      <ContractTree key={idx} tree={child} index={idx} depth={child.depth + 1} />
    ))}
  </Tag>;
}
