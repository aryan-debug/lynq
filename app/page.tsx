"use client"

import { useCallback, useState } from 'react';
import { ReactFlowProvider, Node, Edge } from '@xyflow/react';
import Flow, { FlowData } from '@/components/Flow';
import Sidebar from '@/components/Sidebar';
import '@xyflow/react/dist/style.css';

function MainApp() {
  const [flows, setFlows] = useState<FlowData[]>([
    { id: 'flow1', name: 'People', nodes: [], edges: [] },
    { id: 'flow2', name: 'Events', nodes: [], edges: [] }
  ]);
  const [activeFlowId, setActiveFlowId] = useState('flow1');

  const handleFlowChange = useCallback((id: string, nodes: Node[], edges: Edge[]) => {
    setFlows(prev => prev.map(flow =>
      flow.id === id ? { ...flow, nodes, edges } : flow
    ));
  }, []);

  const handleFlowSelect = useCallback((id: string) => {
    setActiveFlowId(id);
  }, []);

  const addFlow = useCallback(() => {
    setFlows([...flows, { id: `flow${flows.length + 1}`, name: `${flows.length + 1}`, nodes: [], edges: [] }])
  }, [flows])

  const changeFlowName = useCallback((id: string, newName: string) => {
    setFlows(prev => prev.map(flow =>
      flow.id === id ? { ...flow, name: newName } : flow
    ));
  }, [])


  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {flows.map(flow => (
        <ReactFlowProvider key={flow.id}>
          <Flow
            flowId={flow.id}
            flowData={flow}
            onFlowChange={handleFlowChange}
            isActive={activeFlowId === flow.id}
          />
        </ReactFlowProvider>
      ))}

      <Sidebar
        flows={flows}
        activeFlowId={activeFlowId}
        onSelectFlow={handleFlowSelect}
        onAddFlow={addFlow}
        onChangeFlowName={changeFlowName}
      />
    </div>
  );
}

export default MainApp;