import { Panel, ReactFlow, MiniMap } from '@xyflow/react';
import { useMemo, useState, useEffect, useRef } from 'react';
import './styles/sidebar.css';
import { FlowData, nodeTypes } from './Flow';
import { Inter } from 'next/font/google';
import { slide as Menu } from 'react-burger-menu';
import EditableHeading from './EditableHeading';

interface SidebarProps {
    flows: FlowData[];
    activeFlowId: string;
    onSelectFlow: (id: string) => void;
    onAddFlow: () => void;
    onChangeFlowName: (id: string, name: string) => void;
}

const lato = Inter({
    weight: "400"
})

function Sidebar({ flows, activeFlowId, onSelectFlow, onAddFlow, onChangeFlowName }: SidebarProps) {
    const [isClient, setIsClient] = useState(false);
    const huesCacheRef = useRef<Record<string, number>>({});

    useEffect(() => {
        setIsClient(true);
    }, []);

    const flowHues = useMemo(() => {
        if (!isClient) return {};

        // Keep existing hues and only generate new ones for flows that don't have them
        const newHues = { ...huesCacheRef.current };

        flows.forEach(flow => {
            if (!(flow.id in newHues)) {
                newHues[flow.id] = Math.floor(Math.random() * 361);
            }
        });

        // Remove hues for flows that no longer exist
        const currentFlowIds = new Set(flows.map(f => f.id));
        Object.keys(newHues).forEach(id => {
            if (!currentFlowIds.has(id)) {
                delete newHues[id];
            }
        });

        huesCacheRef.current = newHues;
        return newHues;
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
                        <div onClick={(e) => e.stopPropagation()}>
                            <EditableHeading
                                value={flow.name}
                                onChange={(newName) => onChangeFlowName(flow.id, newName)}
                                className="minimap-title"
                                style={{ marginBottom: "5px", textAlign: "center" }}
                                tag="h4"
                            />
                        </div>
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
                                <MiniMap
                                    pannable={true}
                                    zoomable={true}
                                    position='bottom-left'
                                    style={{
                                        margin: 0,
                                        background: isClient ? `hsla(${flowHues[flow.id]}, 72%, 70%, 1)` : 'hsla(0, 72%, 70%, 1)',
                                        borderRadius: "5px",
                                        cursor: "pointer"
                                    }}
                                />
                            </ReactFlow>
                        </div>
                    </div>
                ))}
                <button className="add-button" role="button" onClick={onAddFlow}>Add Lynq</button>
                <div style={{ height: 32 }}></div>
            </Menu >
        </Panel >
    );
}

export default Sidebar;