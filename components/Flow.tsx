import { useCallback, useEffect, useMemo } from "react";
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
import { useProjectStore } from "@/stores/projectStore";

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
  const { onNodesChange, onEdgesChange, onConnect, activeFlowId } =
    useProjectStore();
  const { nodes, edges } = flowData;
  const isActive = flowId === activeFlowId;

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
          <FloatingMenu flowId={flowData.id} />
        </ReactFlow>
      </div>
    )
  );
}

export default Flow;
