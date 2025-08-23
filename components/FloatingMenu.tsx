import { faFileLines, faSave } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "./Tooltip";
import { Panel, useReactFlow, useStoreApi } from "@xyflow/react";
import { useCallback } from "react";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";

function FloatingMenu() {
    const store = useStoreApi()
    const { addNodes, screenToFlowPosition, setNodes, setEdges, setViewport, toObject } = useReactFlow()

    const handleAddNode = useCallback(() => {
        const { domNode } = store.getState();
        const boundingRect = domNode?.getBoundingClientRect()
        if (boundingRect) {
            const newNode = { id: Date.now().toString(), position: { x: 0, y: 0 }, data: { label: 'Hello' }, type: "editorNode" };
            const center = screenToFlowPosition({
                x: boundingRect.x + boundingRect.width / 2,
                y: boundingRect.y + boundingRect.height / 2,
            })
            newNode.position = {
                x: center.x,
                y: center.y
            }
            addNodes([newNode])
        }
    }, [addNodes, screenToFlowPosition, store]);

    const saveWork = useCallback(() => {
        const flow = toObject();
        localStorage.setItem("test", JSON.stringify(flow));
    }, [toObject]);

    const restoreWork = useCallback(() => {
        const restoreFlow = async () => {
            let flow: any;
            const storedFlow = localStorage.getItem("test");
            if (storedFlow) {
                flow = JSON.parse(storedFlow);
            }
            if (flow) {
                const { x = 0, y = 0, zoom = 1 } = flow.viewport;
                setNodes(flow.nodes || []);
                setEdges(flow.edges || []);
                setViewport({ x, y, zoom });
            }
        };
        restoreFlow();
    }, [setNodes, setEdges, setViewport]);

    return <Panel className="floating-menu" position="bottom-center" style={{ backgroundColor: "white" }}>
        <Tooltip text="Add note" position="top">
            <FontAwesomeIcon icon={faFileLines} size={"2x"} onClick={handleAddNode}></FontAwesomeIcon>
        </Tooltip>
        <Tooltip text="Save" position="top">
            <FontAwesomeIcon icon={faSave} size={"2x"} onClick={saveWork}></FontAwesomeIcon>
        </Tooltip>
        <Tooltip text="Restore" position="top">
            <FontAwesomeIcon icon={faFileImport} size={"2x"} onClick={restoreWork}></FontAwesomeIcon>
        </Tooltip>
    </Panel>
}

export default FloatingMenu;