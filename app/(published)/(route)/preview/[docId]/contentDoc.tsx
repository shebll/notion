"use client";

import React from "react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

type props = {
  content?: string;
};
function ContentDoc({ content }: props) {
  const editor: BlockNoteEditor = useBlockNote({
    editable: false,
    initialContent: content ? JSON.parse(content) : undefined,
  });
  return (
    <div className="">
      <BlockNoteView editor={editor} theme={"light"} />
    </div>
  );
}

export default ContentDoc;
