"use client";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEdgeStore } from "@/app/lib/edgestore";
type props = {
  content?: string;
  docId: Id<"documents">;
};

function Editor({ content, docId }: props) {
  const { edgestore } = useEdgeStore();
  const updateNote = useMutation(api.documents.update);
  const onChange = (content: string) => {
    updateNote({
      documentId: docId,
      content: content,
    });
  };
  const handleUpload = async (file?: File) => {
    let res;
    if (file) {
      res = await edgestore.publicFiles.upload({ file });
    }
    return res!.url;
  };
  const editor: BlockNoteEditor = useBlockNote({
    editable: true,
    initialContent: content ? JSON.parse(content) : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
  });
  return (
    <div>
      <BlockNoteView editor={editor} theme={"light"} />
    </div>
  );
}

export default Editor;
