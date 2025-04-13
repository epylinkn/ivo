import { Node, LabeledNode } from "../contract-types";
import { TreeRenderer } from "./tree-renderer";

interface ContractTreeProps {
  tree: Node
}

// Basically, a labeledTree wrapper
export default function ContractTree({ tree }: ContractTreeProps) {
  const labeledTree = { ...tree, index: 0, depth: 0 } as LabeledNode;
  const dfs = (node: Node, index: number, depth: number) => {
    const labeledNode = node as LabeledNode;
    labeledNode.index = index;
    labeledNode.depth = depth;

    if (node.children) {
      const children = node.children as Node[];
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        dfs(child, i, depth + 1);
      }
    }
  };
  
  dfs(labeledTree, 0, 0);

  return <TreeRenderer node={labeledTree} />;
}
