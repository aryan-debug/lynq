"use client"
import { useCallback } from 'react';
import { ReactFlow, addEdge, Background, BackgroundVariant, ReactFlowProvider, useNodesState, useEdgesState, OnConnect, BuiltInNode, Node, NodeTypes, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { EditorNode } from '@/components/EditorNode';
import FloatingMenu from '@/components/FloatingMenu';
import Sidebar from '@/components/Sidebar';

const nodeTypes = { editorNode: EditorNode } satisfies NodeTypes;

function Flow() {
  const [nodes, _, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#111" variant={BackgroundVariant.Dots} />
        <FloatingMenu />
        <Sidebar />
      </ReactFlow>
    </div >
  );
}

export default function () {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}