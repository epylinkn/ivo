import { TreeRenderer } from '@/components/tree-renderer'

export default function Home() {
  const tree = require('../data/input.json')

  return (
    <div className='min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='text-foreground dark:text-background'>
        <TreeRenderer node={tree[0]} />
      </main>
    </div>
  )
}
