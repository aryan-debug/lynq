"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import EditableField from "./EditableField";
import { TimelineEvent, useProjectStore } from "@/stores/projectStore";
import { useShallow } from "zustand/react/shallow";

interface TimelineEventComponentProps {
  timelineId: string;
  event: TimelineEvent;
  index: number;
  draggedItem: number | null;
  dragOverIndex: number | null;
  onDragStart: (index: number) => void;
  onDragEnter: (index: number) => void;
  onDragLeave: () => void;
  onDrop: (dropIndex: number) => void;
  onDragEnd: () => void;
}

function TimelineEventComponent({
  timelineId,
  event,
  index,
  draggedItem,
  dragOverIndex,
  onDragStart,
  onDragEnter,
  onDragLeave,
  onDrop,
  onDragEnd,
}: TimelineEventComponentProps) {
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [editField, setEditField] = useState<keyof TimelineEvent | null>(null);

  const activeProjectId = useProjectStore((state) => state.activeProjectId);

  const { removeEvent, onEventEdit } = useProjectStore(
    useShallow((state) => ({
      removeEvent: state.removeEvent,
      onEventEdit: state.onEventEdit,
    })),
  );

  const handleEditStart = (id: number | string, field: keyof TimelineEvent) => {
    if (field !== "id") {
      setEditingId(id);
      setEditField(field);
    }
  };

  const handleEditEnd = () => {
    setEditingId(null);
    setEditField(null);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    onDragStart(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDragEnter(index);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDragLeave();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDrop(index);
  };

  return (
    <div
      className={`timeline-item ${index % 2 === 0 ? "left" : "right"} ${
        dragOverIndex === index ? "drag-over" : ""
      } ${draggedItem === index ? "dragging" : ""}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="timeline-date-container">
        <EditableField
          event={event}
          field="date"
          isEditing={editingId === event.id && editField === "date"}
          onEditStart={handleEditStart}
          onEditEnd={handleEditEnd}
          onEdit={onEventEdit}
          timelineId={timelineId}
        />
      </div>
      <div className="timeline-dot"></div>
      <div
        className="timeline-content"
        draggable
        onDragStart={handleDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="drag-handle">⋮⋮</div>
        <button
          onClick={() => removeEvent(activeProjectId, timelineId, event.id)}
          className="remove-button"
          title="Remove item"
          aria-label="Remove timeline item"
        >
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        <EditableField
          event={event}
          field="title"
          isEditing={editingId === event.id && editField === "title"}
          onEditStart={handleEditStart}
          onEditEnd={handleEditEnd}
          onEdit={onEventEdit}
          timelineId={timelineId}
        />
        <EditableField
          event={event}
          field="subtitle"
          isEditing={editingId === event.id && editField === "subtitle"}
          onEditStart={handleEditStart}
          onEditEnd={handleEditEnd}
          onEdit={onEventEdit}
          timelineId={timelineId}
        />
        <EditableField
          event={event}
          field="detail"
          isTextArea
          isEditing={editingId === event.id && editField === "detail"}
          onEditStart={handleEditStart}
          onEditEnd={handleEditEnd}
          onEdit={onEventEdit}
          timelineId={timelineId}
        />
      </div>
    </div>
  );
}

export default TimelineEventComponent;
