import { useProjectStore } from "@/stores/projectStore";
import EditableHeading from "../EditableHeading";
import styles from "@/styles/timeline.module.css";
import { Timeline } from "@/types/project";

interface TimelineContainerProps {
  item: Timeline;
}

function TimelineContainer({ item }: TimelineContainerProps) {
  const { activeItemId, setActiveItemId } = useProjectStore();

  return (
    <div
      onClick={() => setActiveItemId(item.id)}
      className={`${styles.minimapContainer} ${activeItemId === item.id ? styles.active : ""}`}
    >
      <EditableHeading
        value={item.name}
        onChange={() => {}}
        className={styles.minimapTitle}
        style={{ marginBottom: "5px", textAlign: "center" }}
        tag="h4"
      />
    </div>
  );
}

export default TimelineContainer;
