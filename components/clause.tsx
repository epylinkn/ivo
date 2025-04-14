interface ClauseProps {
  children: React.ReactNode
  label: string
}

export default function Clause({ label, children }: ClauseProps) {
  return (
    <div className="relative my-2 ml-8">
      <div className="absolute left-[-1.5rem]">{label}</div>
      <div className="">
        {children}
      </div>
    </div>
  )
}
