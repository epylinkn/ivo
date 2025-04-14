import { TreeRenderer } from '@/components/tree-renderer'
import { Node } from '@/contract-types'

const RANK_TO_STYLE: Record<number, (counter: number) => string> = {
  0: (counter: number) => `${counter + 1}.`, // 1, 2, 3
  1: (counter: number) => `(${String.fromCharCode(97 + counter)})`, // a, b, c
}
const labelClauses = (root: Node): Node => {
  const labelCounters: Record<number, number> = {}

  const newTree = { ...root }
  const dfs = (node: Node, parents: number) => {
    if (node.type === 'clause') {
      const method = RANK_TO_STYLE[parents]
      const counter = labelCounters[parents] || 0
      node.label = method(counter)

      labelCounters[parents] = counter + 1

      if (node.children) {
        node.children.forEach((child) => dfs(child, parents + 1))
      }
    } else {
      if (node.children) {
        node.children.forEach((child) => dfs(child, parents))
      }
    }
  }
  dfs(root, 0)

  return newTree
}

export default function Home() {
  const tree = require('../data/input.json')
  const labeledTree = labelClauses(tree[0])

  return (
    <div className='min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='text-foreground dark:text-background'>
        <TreeRenderer node={labeledTree} />
      </main>
    </div>
  )
}
