import Markdown, { RenderRules } from "react-native-markdown-display";
import { ScrollViewProps, View } from "react-native";
import { ScrollView } from "react-native";
import { Text as AppText } from "~/components/ui/text";
import { useScreenMode } from "~/lib/useScreenMode";
import useScreenSize from "~/helpers/useScreenSize";
import { bottomNavHeight } from "~/lib/constants/sizes";
import React from "react";

const copy = `
# h1 Heading 8-)
## h2 Heading 8-)
### h3 Heading 8-)

**Bold text**, *italic text*, and ~~strikethrough~~

This is a paragraph of text that should be rendered normally.  
Here's another paragraph with line breaks.

This is a new paragraph.

> Blockquote

- List item 1
- List item 2
- List item 3

\`inline code\`

\`\`\`js
const a = 5;
console.log(a);
\`\`\`

| Name     | Age | Occupation     |
|----------|-----|----------------|
| Alice    | 25  | Engineer       |
| Bob      | 30  | Designer       |
| Charlie  | 28  | Product Manager |
`;

const rules: RenderRules = {
  paragraph: (node, children, _parent, styles) => (
    <AppText key={node.key} style={styles.paragraph}>
      {children}
    </AppText>
  ),
  heading1: (node, children, _parent, styles) => (
    <AppText key={node.key} style={[styles.heading, styles.heading1]}>
      {children}
    </AppText>
  ),
  heading2: (node, children, _parent, styles) => (
    <AppText key={node.key} style={[styles.heading, styles.heading2]}>
      {children}
    </AppText>
  ),
  heading3: (node, children, _parent, styles) => (
    <AppText key={node.key} style={[styles.heading, styles.heading3]}>
      {children}
    </AppText>
  ),
  strong: (node, children, _parent, styles) => (
    <AppText key={node.key} style={styles.strong}>
      {children}
    </AppText>
  ),
  em: (node, children, _parent, styles) => (
    <AppText key={node.key} style={styles.em}>
      {children}
    </AppText>
  ),
  s: (node, children, _parent, styles) => (
    <AppText key={node.key} style={styles.strikethrough}>
      {children}
    </AppText>
  ),
  blockquote: (node, children, _parent, styles) => {
    const { colors } = useScreenMode();

    return (
      <View key={node.key} style={[styles.blockquote, { backgroundColor: colors.background }]}>
        <AppText style={[styles.blockquote, { backgroundColor: colors.background }]}>{children}</AppText>
      </View>
    );
  },
  bullet_list: (node, children, _parent, styles) => (
    <View key={node.key} style={{ marginVertical: 4 }}>
      {children}
    </View>
  ),
  list_item: (node, children, _parent, styles) => (
    <View key={node.key} style={{ flexDirection: "row", marginVertical: 2 }}>
      <AppText style={styles.listItemBullet}>• </AppText>
      <AppText style={styles.listItem}>{children}</AppText>
    </View>
  ),
  code_inline: (node, children, _parent, styles) => (
    <AppText key={node.key} style={styles.codeInline}>
      {children}
    </AppText>
  ),
  fence: (node, _children, _parent, styles) => (
    <View key={node.key} style={styles.codeBlock}>
      <AppText style={styles.codeBlockText}>{node.content}</AppText>
    </View>
  ),
  table: (node, children) => (
    <View key={node.key} className="border border-border">
      {children}
    </View>
  ),
  thead: (node, children, _parent, styles) => (
    <View key={node.key} style={styles.thead} className="flex-row bg-background">
      {children}
    </View>
  ),
  tbody: (node, children) => <View key={node.key}>{children}</View>,
  tr: (node, children) => (
    <View key={node.key} className="flex-row bg-background flex-1">
      {children}
    </View>
  ),
  th: (node, children) => {
    return (
      <View key={node.key} className="bg-background flex-1 p-2 border border-border">
        <AppText style={{ fontWeight: "bold" }}>{children}</AppText>
      </View>
    );
  },
  td: (node, children) => (
    <View key={node.key} className="bg-background flex-1 p-2 border border-border">
      <AppText>{children}</AppText>
    </View>
  ),
};

export type InformationProps = Omit<ScrollViewProps, "children"> & {
  children: string
}

const Information: React.FunctionComponent<InformationProps> = ({children, ...props}) => {
  return (
    <ScrollView {...props}>
      <Markdown rules={rules}>{children}</Markdown>
    </ScrollView>
  );
};

export default Information;
