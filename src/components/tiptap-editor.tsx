import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Image } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { Underline } from "@tiptap/extension-underline";
import { createLowlight } from "lowlight";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { useCallback, useEffect, useRef } from "react";
import { TextAlign } from "@tiptap/extension-text-align";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";

import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/xml";

import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Image as ImageIcon,
  List,
  ListOrdered,
  Code,
  Link2,
  Undo2,
  Redo2,
  AlignLeft,
  AlignCenter,
  Strikethrough,
  UnderlineIcon,
  Heading3,
  AlignRight,
} from "lucide-react";

const lowlight = createLowlight();

lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", javascript);
lowlight.register("ts", typescript);

interface BlogEditorProps {
  content?: string;
  onUpdate?: (html: string) => void;
}

export default function BlogEditor({
  content = "",
  onUpdate,
}: BlogEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      CodeBlockLowlight.configure({ lowlight }),
      Placeholder.configure({
        placeholder: "Start writing your blog post...",
        emptyEditorClass: "is-editor-empty",
      }),
      Underline.configure(),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg border my-4",
        },
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          class: "text-blue-600 underline",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      // CharacterCount.configure({ limit: maxLength }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none h-[400px] overflow-y-auto",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onUpdate?.(html);
    },
  });

  const addImage = useCallback(async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        editor
          ?.chain()
          .focus()
          .setImage({ src: e.target?.result as string })
          .run();
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  }, [editor]);

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 px-2 py-1 bg-muted rounded-md border items-center">
        {/* Text Formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-md flex items-center gap-1 ${
            editor.isActive("bold")
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent"
          }`}
          aria-label="Bold"
          title="Bold (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-md flex items-center gap-1 ${
            editor.isActive("italic")
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent"
          }`}
          aria-label="Italic"
          title="Italic (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded-md flex items-center gap-1 ${
            editor.isActive("underline")
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent"
          }`}
          aria-label="Underline"
          title="Underline (Ctrl+U)"
        >
          <UnderlineIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded-md flex items-center gap-1 ${
            editor.isActive("strike")
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent"
          }`}
          aria-label="Strikethrough"
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        {/* Headings */}
        <div className="h-6 w-px bg-border mx-1" />
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`p-2 rounded-md flex items-center gap-1 ${
            editor.isActive("heading", { level: 1 })
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent"
          }`}
          aria-label="Heading 1"
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-2 rounded-md flex items-center gap-1 ${
            editor.isActive("heading", { level: 2 })
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent"
          }`}
          aria-label="Heading 2"
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`p-2 rounded-md flex items-center gap-1 ${
            editor.isActive("heading", { level: 3 })
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent"
          }`}
          aria-label="Heading 2"
          title="Heading 2"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        {/* Lists */}
        <div className="h-6 w-px bg-border mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-md flex items-center gap-1 ${
            editor.isActive("bulletList")
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent"
          }`}
          aria-label="Bullet List"
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-md flex items-center gap-1 ${
            editor.isActive("orderedList")
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent"
          }`}
          aria-label="Numbered List"
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        {/* Media */}
        <div className="h-6 w-px bg-border mx-1" />
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={addImage}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-md flex items-center gap-1 hover:bg-accent"
          aria-label="Insert Image"
          title="Insert Image"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        {/* Code & Links */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded-md flex items-center gap-1 ${
            editor.isActive("codeBlock")
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent"
          }`}
          aria-label="Code Block"
          title="Code Block"
        >
          <Code className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter URL");
            if (url) editor?.chain().focus().toggleLink({ href: url }).run();
          }}
          className={`p-2 rounded-md flex items-center gap-1 ${
            editor.isActive("link")
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent"
          }`}
          aria-label="Insert Link"
          title="Insert Link (Ctrl+K)"
        >
          <Link2 className="w-4 h-4" />
        </button>

        {/* Alignment */}
        <div className="h-6 w-px bg-border mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-2 rounded-md flex items-center gap-1 ${
            editor.isActive({ textAlign: "left" })
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent"
          }`}
          aria-label="Align Left"
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`p-2 rounded-md flex items-center gap-1 ${
            editor.isActive({ textAlign: "center" })
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent"
          }`}
          aria-label="Align Center"
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`p-2 rounded-md flex items-center gap-1 ${
            editor.isActive({ textAlign: "right" })
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent"
          }`}
          aria-label="Align Center"
          title="Align Center"
        >
          <AlignRight className="w-4 h-4" />
        </button>

        {/* Undo/Redo */}
        <div className="h-6 w-px bg-border mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 rounded-md flex items-center gap-1 hover:bg-accent disabled:opacity-50"
          disabled={!editor.can().undo()}
          aria-label="Undo"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 rounded-md flex items-center gap-1 hover:bg-accent disabled:opacity-50"
          disabled={!editor.can().redo()}
          aria-label="Redo"
          title="Redo (Ctrl+Y)"
        >
          <Redo2 className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content */}
      <div className="rounded-lg border p-4">
        <EditorContent editor={editor} />
      </div>

      {/* Character Count */}
    </div>
  );
}
