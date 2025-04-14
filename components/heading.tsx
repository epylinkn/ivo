import { JSX } from 'react'

interface HeadingProps {
  level: string
  children: React.ReactNode
}

export default function Heading({ level, children }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  return <Tag>{children}</Tag>
}
