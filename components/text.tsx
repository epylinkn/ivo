import cn from 'classnames'
import React from 'react'

interface TextProps {
  text: string
  bold?: boolean
  underline?: boolean
}

export default function Text({ text, bold, underline }: TextProps) {
  const linebreaks = text.split('\n')

  return (
    <span className={cn(bold && 'font-bold', underline && 'underline')}>
      {linebreaks.map((line, idx) => (
        <React.Fragment key={idx}>
          {line === '' ? (
            <br className="my-2" />
          ) : (
            <span dangerouslySetInnerHTML={{ __html: line }} />
          )}
        </React.Fragment>
      ))}
    </span>
  )
}
