import { TreeRenderer } from "./tree-renderer";

interface ClauseProps {
  number: number;
  tree: any;
}

export default function Clause({ number, tree }: ClauseProps) {
  return (
    <div className="indent-4 relative my-2">
      <div className="absolute left-[-1rem]">{number}.</div>
      <div className="">
        {tree?.map((child: any, idx: number) => (
          <TreeRenderer node={child} />
        ))}
      </div>
    </div>
  )
}
