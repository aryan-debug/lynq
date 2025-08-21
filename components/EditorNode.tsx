import { Handle, Position, useReactFlow } from "@xyflow/react";
import { useState } from "react";
import Editor from "./Editor";
import "./styles/editor_node.css";

export function EditorNode({ id, data }: { id: string, data: { label?: string } }) {
    const [isEditing, setIsEditing] = useState(false);
    const { setNodes } = useReactFlow();

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleContentChange = (newContent: string) => {
        setNodes((nds) =>
            nds.map((node) =>
                node.id === id ? { ...node, data: { ...node.data, label: newContent } } : node
            )
        );
    };

    const handleDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEditing(true);
    };

    return (
        <div
            className="editor-node"
            style={{
                outline: isEditing ? '1.5px solid black' : '1px solid black',
            }}
            onDoubleClick={handleDoubleClick}
        >
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />

            <Editor
                content={data?.label || "Double-click to edit"}
                editable={isEditing}
                onSave={handleSave}
                onContentChange={handleContentChange}
            />
        </div>
    );
}