import { JSX } from 'react'
import { TextNode, MentionNode, Node } from '../contract-types'
import Text from './text'
import Heading from './heading'
import Mention from './mention'
import Clause from './clause'
import Paragraph from './paragraph'

export function TreeRenderer({
  node,
}: {
  node: Node
}): JSX.Element | null {
  // is a terminal text node
  if (node.type === undefined) {
    const textNode = node as TextNode
    return <Text {...textNode} />
  }
  
  const renderChildren = node.children?.map((child: any, idx: number) => {
    return <TreeRenderer key={idx} node={child} />
  }) || null

  switch (node.type) {
    // block nodes
    case 'block':
      return (
        <div className='my-4'>
          {renderChildren}
        </div>
      )
    case 'p':
      return (
        <Paragraph text={node.text}>
          {renderChildren}
        </Paragraph>
      )
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      const level = node.type.replace('h', '')
      return (
        <Heading level={level}>
          {renderChildren}
        </Heading>
      )

    // list nodes
    case 'clause': {
      return <Clause number={1}>
        {renderChildren}
      </Clause>
    }
    case 'ul':
      return (
        <div className="my-2">
          {renderChildren}
        </div>
      )
    case 'li':
      return (
        <div className='flex justify-between'>
          <li className='list-disc w-4'>{/* empty to get a disc */}</li>
          <div className='flex-1'>
            {renderChildren}
          </div>
        </div>
      )
      
    // inline
    case 'lic':
      return (
        <div>
          {renderChildren}
        </div>
      )
    case 'mention':
      const mentionNode = node as MentionNode
      return <Mention {...mentionNode} />
    default:
      console.log('Unknown type: ', node.type, node)
      return null
  }
}
