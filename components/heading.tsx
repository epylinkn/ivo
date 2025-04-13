import { JSX } from "react";
import { TreeRenderer } from "./tree-renderer";

interface HeadingProps {
  level: string;
  tree: any;
}

export default function Heading({ level, tree }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag className="">
    {tree?.map((child: any, idx: number) => (
      <TreeRenderer node={child} key={idx} />
    ))}
  </Tag>;
}
