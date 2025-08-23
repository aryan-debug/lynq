import { Handle, NodeResizer, Position, useReactFlow } from "@xyflow/react";
import { useState } from "react";
import Editor from "./Editor";
import "./styles/editor_node.css";


export function EditorNode({ id, data, selected }: { id: string, data: { label?: string }, selected: boolean }) {
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

    return (<>
        <NodeResizer minWidth={50} minHeight={30} isVisible={selected} />
        <div
            className="editor-node"
            style={{
                outline: isEditing ? '1.5px solid black' : '1px solid black',
            }}
            onDoubleClick={handleDoubleClick}
        >
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />

            <Editor
                content={data?.label || "Double-click to edit"}
                editable={isEditing}
                onSave={handleSave}
                onContentChange={handleContentChange}
            />
        </div>
    </>
    );
}