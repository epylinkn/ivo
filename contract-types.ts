export interface Node {
  type?: string;
  title?: string;
  text?: string;
  bold?: boolean;
  children?: Node[];
}

export interface LabeledNode extends Node {
  index: number;
  depth: number;
}

export interface TextNode extends LabeledNode {
  type: 'text';
  text: string;
  bold?: boolean;
  underline?: boolean;
}

export interface MentionNode extends LabeledNode {
  type: 'mention';
  color: string;
  id: string;
  title: string;
  value: string;
  variableType: string;
}
