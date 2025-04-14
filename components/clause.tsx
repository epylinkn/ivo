interface ClauseProps {
  number: number;
  children: React.ReactNode
}

export default function Clause({ number, children }: ClauseProps) {
  return (
    <div className="relative my-2">
      <div className="absolute left-[-1rem]">{number}.</div>
      <div className="">
        {children}
      </div>
    </div>
  )
}
