import { Timeline, useProjectStore } from "@/stores/projectStore";
import EditableHeading from "../EditableHeading";
import "../styles/projectsPanel.css";

interface TimelineContainerProps {
  item: Timeline;
}

function TimelineContainer({ item }: TimelineContainerProps) {
  const { activeItemId, setActiveItemId } = useProjectStore();

  return (
    <div
      onClick={() => setActiveItemId(item.id)}
      className={`minimap-container ${activeItemId === item.id ? "active" : ""}`}
    >
      <EditableHeading
        value={item.name}
        onChange={() => {}}
        className="minimap-title"
        style={{ marginBottom: "5px", textAlign: "center" }}
        tag="h4"
      />
    </div>
  );
}

export default TimelineContainer;
