export default function Paragraph({
  text,
  children,
}: {
  text?: string
  children?: React.ReactNode
}) {
  // FIXME: inline???  // CANT TELL IF THIS IS A BUG OR NOT
  if (!children) return <span className='my-2'>{text}</span>

  return <div className='my-2'>
    {text && <span>{text}</span>}
    {children}
  </div>
}
