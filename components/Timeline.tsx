"use client";
import React, { useState, useRef } from "react";
import styles from "@/styles/timeline.module.css";
import TimelineEventComponent from "./TimelineItem";
import { useProjectStore } from "@/stores/projectStore";
import { useShallow } from "zustand/react/shallow";
import { Timeline as TimelineType } from "@/types/project";

interface TimelineProps {
  timelineId: string;
}

function Timeline({ timelineId }: TimelineProps) {
  const activeProjectId = useProjectStore((state) => state.activeProjectId);
  const activeItemId = useProjectStore((state) => state.activeItemId);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragCounter = useRef<number>(0);

  const { projects, addEvent, setEvents } = useProjectStore(
    useShallow((state) => ({
      projects: state.projects,
      addEvent: state.addEvent,
      setEvents: state.setEvents,
    })),
  );

  const activeProject = projects.find(
    (project) => project.id === activeProjectId,
  );
  const activeItem = activeProject?.items.find(
    (item) => item.id === activeItemId,
  );

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragEnter = (index: number) => {
    dragCounter.current++;
    if (draggedItem !== null && index !== draggedItem) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (dropIndex: number) => {
    dragCounter.current = 0;

    if (draggedItem === null || draggedItem === dropIndex) {
      setDragOverIndex(null);
      return;
    }

    const events = (activeItem as TimelineType).events;
    const draggedContent = events[draggedItem];
    const newEvents = [...events];

    newEvents.splice(draggedItem, 1);

    const adjustedIndex = draggedItem < dropIndex ? dropIndex - 1 : dropIndex;
    newEvents.splice(adjustedIndex, 0, draggedContent);

    setEvents(activeProjectId, timelineId, newEvents);
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
    dragCounter.current = 0;
  };

  return (
    activeItemId === timelineId && (
      <div className={styles.timelineContainer}>
        <div className={styles.timeline}>
          <div className={styles.timelineLine}></div>
          {(activeItem as TimelineType).events.map((event, index) => (
            <TimelineEventComponent
              key={event.id}
              timelineId={timelineId}
              event={event}
              index={index}
              draggedItem={draggedItem}
              dragOverIndex={dragOverIndex}
              onDragStart={handleDragStart}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
            />
          ))}
        </div>
        <div className={styles.floatingMenu}>
          <button
            onClick={() => addEvent(activeProjectId, timelineId)}
            className="add-button"
            title="Add a new timeline item"
            aria-label="Add new timeline item"
          >
            +
          </button>
        </div>
      </div>
    )
  );
}

export default Timeline;
