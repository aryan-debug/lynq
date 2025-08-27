import { useCallback, useEffect } from "react";
import {
  ReactFlow,
  addEdge,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  OnConnect,
  Node,
  NodeTypes,
  Edge,
} from "@xyflow/react";
import { EditorNode } from "@/components/EditorNode";
import FloatingMenu from "@/components/FloatingMenu";
import { Project } from "@/app/page";

export const nodeTypes = { editorNode: EditorNode } satisfies NodeTypes;

export interface FlowData {
  id: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
}

interface FlowProps {
  project: Project;
  flowId: string;
  flowData: FlowData;
  onFlowChange: (
    projectId: string,
    flowId: string,
    nodes: Node[],
    edges: Edge[],
  ) => void;
  isActive: boolean;
}

function Flow({
  project,
  flowId,
  flowData,
  onFlowChange,
  isActive,
}: FlowProps) {
  const [nodes, , onNodesChange] = useNodesState<Node>(flowData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(flowData.edges);

  useEffect(() => {
    onFlowChange(project.id, flowData.id, nodes, edges);
  }, [nodes, edges, flowData.id, onFlowChange]);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges],
  );

  return (
    isActive && (
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background
            color="#111"
            variant={BackgroundVariant.Dots}
            id={flowId}
          />
          <FloatingMenu flowId={flowData.id} />
        </ReactFlow>
      </div>
    )
  );
}

export default Flow;
