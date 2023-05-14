import { useTheme } from "next-themes";
import MDEditor, { type EditorProps } from "md-editor-rt";
import "md-editor-rt/lib/style.css";

export const Editor = (props: EditorProps) => {
  const { theme } = useTheme();

  return (
    <MDEditor
      theme={theme as "light" | "dark"}
      language="en-US"
      previewTheme="github"
      {...props}
    />
  );
};
