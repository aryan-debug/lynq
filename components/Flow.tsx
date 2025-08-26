import { useCallback, useEffect } from 'react';
import { ReactFlow, addEdge, Background, BackgroundVariant, useNodesState, useEdgesState, OnConnect, Node, NodeTypes, Edge } from '@xyflow/react';
import { EditorNode } from '@/components/EditorNode';
import FloatingMenu from '@/components/FloatingMenu';

export const nodeTypes = { editorNode: EditorNode } satisfies NodeTypes;

export interface FlowData {
    id: string;
    name: string;
    nodes: Node[];
    edges: Edge[];
}

interface FlowProps {
    flowId: string;
    flowData: FlowData;
    onFlowChange: (id: string, nodes: Node[], edges: Edge[]) => void;
    isActive: boolean;
}



function Flow({ flowId, flowData, onFlowChange, isActive }: FlowProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>(flowData.nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(flowData.edges);

    useEffect(() => {
        onFlowChange(flowData.id, nodes, edges);
    }, [nodes, edges, flowData.id, onFlowChange]);

    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((edges) => addEdge(connection, edges)),
        [setEdges]
    );

    return (
        isActive && <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
            >
                <Background color="#111" variant={BackgroundVariant.Dots} id={flowId} />
                <FloatingMenu flowId={flowData.id} />
            </ReactFlow>
        </div>
    );
}

export default Flow;