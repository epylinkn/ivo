import cn from "classnames";

interface TextProps {
  text: string;
  bold?: boolean;
  underline?: boolean;
}

export default function Text({ text, bold, underline }: TextProps) {
  const textWithBreaks = text.replace(/\n/g, "<br/>"); // FIXME

  return <span className={cn(bold && "font-bold", underline && "underline")} dangerouslySetInnerHTML={{ __html: textWithBreaks }} />
}
