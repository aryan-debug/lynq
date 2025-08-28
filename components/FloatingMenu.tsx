import { faFileLines, faSave } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "./Tooltip";
import { Panel, useReactFlow, useStoreApi } from "@xyflow/react";
import { useCallback } from "react";

function FloatingMenu({
  projectId,
  flowId,
}: {
  projectId: string;
  flowId: string;
}) {
  const store = useStoreApi();
  const {
    addNodes,
    screenToFlowPosition,
    setNodes,
    setEdges,
    setViewport,
    toObject,
  } = useReactFlow();

  const handleAddNode = useCallback(() => {
    const { domNode } = store.getState();
    const boundingRect = domNode?.getBoundingClientRect();
    if (boundingRect) {
      const newNode = {
        id: Date.now().toString(),
        position: { x: 0, y: 0 },
        data: { label: "Hello" },
        type: "editorNode",
      };
      const center = screenToFlowPosition({
        x: boundingRect.x + boundingRect.width / 2,
        y: boundingRect.y + boundingRect.height / 2,
      });
      newNode.position = {
        x: center.x,
        y: center.y,
      };
      addNodes([newNode]);
    }
  }, [addNodes, screenToFlowPosition, store]);

  const saveWork = useCallback(() => {
    const flow = toObject();
    localStorage.setItem(`${projectId}-${flowId}`, JSON.stringify(flow));
  }, [toObject, flowId]);

  const restoreWork = useCallback(() => {
    const restoreFlow = async () => {
      let flow: any;
      const storedFlow = localStorage.getItem(`${projectId}-${flowId}`);
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
  }, [setNodes, setEdges, setViewport, flowId]);

  return (
    <Panel
      className="floating-menu"
      position="bottom-center"
      style={{ backgroundColor: "white" }}
    >
      <Tooltip text="Add note" position="top">
        <FontAwesomeIcon
          icon={faFileLines}
          size={"2x"}
          onClick={handleAddNode}
        ></FontAwesomeIcon>
      </Tooltip>
      <Tooltip text="Save" position="top">
        <FontAwesomeIcon
          icon={faSave}
          size={"2x"}
          onClick={saveWork}
        ></FontAwesomeIcon>
      </Tooltip>
      <Tooltip text="Restore" position="top">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width={28}
          onClick={restoreWork}
        >
          <path
            fill="currentColor"
            d="M128 48l112 0 0 88c0 39.8 32.2 72 72 72l88 0 0 240c0 8.8-7.2 16-16 16l-256 0c-8.8 0-16-7.2-16-16l0-48-48 0 0 48c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-261.5c0-17-6.7-33.3-18.7-45.3L306.7 18.7C294.7 6.7 278.5 0 261.5 0L128 0C92.7 0 64 28.7 64 64l0 192 48 0 0-192c0-8.8 7.2-16 16-16zM288 67.9l92.1 92.1-68.1 0c-13.3 0-24-10.7-24-24l0-68.1zM0 328c0 13.3 10.7 24 24 24l222.1 0-31 31c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l72-72c9.4-9.4 9.4-24.6 0-33.9l-72-72c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l31 31-222.1 0c-13.3 0-24 10.7-24 24z"
          />
        </svg>
      </Tooltip>
    </Panel>
  );
}

export default FloatingMenu;
