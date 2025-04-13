interface MentionProps {
  value: string;
  color: string;
  id: string;
  title: string;
  variableType: string;
}

export default function Mention({ value, color, id, title, variableType }: MentionProps) {
  return (
    <div
      data-id={id}
      data-title={title}
      data-variable-type={variableType}
      className="inline-block text-white px-2 py-1 rounded"
      style={{ backgroundColor: color }}>
      {value}
    </div>
  );
}
