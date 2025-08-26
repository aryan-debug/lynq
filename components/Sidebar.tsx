import { Panel, ReactFlow, MiniMap } from '@xyflow/react';
import { useMemo, useState, useEffect } from 'react';
import './styles/sidebar.css';
import { FlowData, nodeTypes } from './Flow';
import { Inter } from 'next/font/google';
import { slide as Menu } from 'react-burger-menu';

interface SidebarProps {
    flows: FlowData[];
    activeFlowId: string;
    onSelectFlow: (id: string) => void;
}

const lato = Inter({
    weight: "400"
})

function Sidebar({ flows, activeFlowId, onSelectFlow }: SidebarProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const flowHues = useMemo(() => {
        if (!isClient) return {};
        return flows.reduce((acc, flow) => {
            acc[flow.id] = Math.floor(Math.random() * 361);
            return acc;
        }, {} as Record<string, number>);
    }, [flows.map(f => f.id).join(','), isClient]);

    return (
        <Panel position="top-left" className={`sidebar-panel ${lato.className}`}>
            <Menu noOverlay className='sidebar'>
                {flows.map(flow => (
                    <div
                        key={flow.id}
                        className={`minimap-container ${activeFlowId === flow.id ? 'active' : ''}`}
                        onClick={() => onSelectFlow(flow.id)}
                    >
                        <h4 className="minimap-title" style={{ marginBottom: "5px", textAlign: "center" }}>{flow.name}</h4>
                        <div className="minimap-wrapper" style={{ width: 200, height: 150 }}>
                            <ReactFlow
                                nodes={flow.nodes}
                                edges={flow.edges}
                                nodeTypes={nodeTypes}
                                fitView
                                proOptions={{ hideAttribution: true }}
                                nodesDraggable={false}
                                nodesConnectable={false}
                                elementsSelectable={false}
                                zoomOnScroll={false}
                                panOnDrag={false}
                                zoomOnPinch={false}
                                zoomOnDoubleClick={false}
                                panOnScroll={false}
                            >
                                <MiniMap pannable={true} zoomable={true} position='bottom-left' style={{ margin: 0, background: isClient ? `hsla(${flowHues[flow.id]}, 72%, 70%, 1)` : 'hsla(0, 72%, 70%, 1)', borderRadius: "5px", cursor: "pointer" }} />
                            </ReactFlow>
                        </div>
                    </div>
                ))}
            </Menu >
        </Panel >
    );
}

export default Sidebar;