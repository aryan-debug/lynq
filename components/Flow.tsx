import { useCallback } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Node,
  NodeTypes,
  Edge,
} from "@xyflow/react";
import { EditorNode } from "@/components/EditorNode";
import FloatingMenu from "@/components/FloatingMenu";
import { Project, useProjectStore } from "@/stores/projectStore";

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
}

function Flow({ project, flowId, flowData }: FlowProps) {
  const { onNodesChange, onEdgesChange, onConnect, activeItemId } =
    useProjectStore();
  const { nodes, edges } = flowData;
  const isActive = flowId === activeItemId;

  const handleNodesChange = useCallback(
    (changes: Parameters<typeof onNodesChange>[2]) => {
      onNodesChange(project.id, flowId, changes);
    },
    [project.id, flowId, onNodesChange],
  );

  const handleEdgesChange = useCallback(
    (changes: Parameters<typeof onEdgesChange>[2]) => {
      onEdgesChange(project.id, flowId, changes);
    },
    [project.id, flowId, onEdgesChange],
  );

  const handleConnect = useCallback(
    (connection: Parameters<typeof onConnect>[2]) => {
      onConnect(project.id, flowId, connection);
    },
    [project.id, flowId, onConnect],
  );

  return (
    isActive && (
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          onConnect={handleConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background
            color="#111"
            variant={BackgroundVariant.Dots}
            id={flowId}
          />
          <FloatingMenu projectId={project.id} flowId={flowData.id} />
        </ReactFlow>
      </div>
    )
  );
}

export default Flow;
