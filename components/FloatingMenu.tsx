import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "./Tooltip";
import { Panel, useReactFlow, useStoreApi } from "@xyflow/react";
import { useCallback } from "react";

function FloatingMenu() {
  const store = useStoreApi();
  const { addNodes, screenToFlowPosition } = useReactFlow();

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

  return (
    <Panel
      className="floating-menu"
      position="bottom-center"
      style={{ backgroundColor: "white" }}
    >
      <Tooltip text="Add note">
        <FontAwesomeIcon
          icon={faFileLines}
          size={"2x"}
          onClick={handleAddNode}
        ></FontAwesomeIcon>
      </Tooltip>
    </Panel>
  );
}

export default FloatingMenu;
