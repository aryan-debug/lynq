'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react';
import "./styles/editor.css";

interface EditorProps {
    content: string;
    editable: boolean;
    onSave: () => void;
    onContentChange: (content: string) => void;
}

function Editor({ content, editable, onSave, onContentChange }: EditorProps) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content,
        editable: editable,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: "editor",
            }
        },
        onUpdate: ({ editor }) => onContentChange(editor.getHTML())
    });

    useEffect(() => {
        if (editor) {
            editor.setEditable(editable);
            if (editable) {
                editor.commands.focus('end');
            }
        }
    }, [editable, editor]);

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (editable) {
            e.stopPropagation();
            if (e.key === 'Escape') {
                onSave();
            }
        }
    };

    return (
        <div
            className={editable ? "nodrag nowheel editing" : "display-mode"}
            onPointerDown={editable ? (e) => e.stopPropagation() : undefined}
            onKeyDown={handleKeyDown}
            onBlur={editable ? onSave : undefined}
        >
            <EditorContent editor={editor} />
        </div>
    );
}

export default Editor;