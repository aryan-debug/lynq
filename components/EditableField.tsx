"use client";
import React, { useState, useEffect } from "react";
import { TimelineEvent, useProjectStore } from "@/stores/projectStore";

interface EditableFieldProps {
  event: TimelineEvent;
  field: keyof TimelineEvent;
  timelineId: string;
  isTextArea?: boolean;
  isEditing: boolean;
  onEditStart: (id: number | string, field: keyof TimelineEvent) => void;
  onEditEnd: () => void;
  onEdit: (
    projectId: string,
    itemId: string,
    eventId: string,
    field: keyof TimelineEvent,
    value: string,
  ) => void;
}

function EditableField({
  event,
  field,
  timelineId,
  isTextArea = false,
  isEditing,
  onEditStart,
  onEditEnd,
  onEdit,
}: EditableFieldProps) {
  const activeProjectId = useProjectStore((state) => state.activeProjectId);
  const [value, setValue] = useState<string>(String(event[field]));

  useEffect(() => {
    setValue(String(event[field]));
  }, [event[field]]);

  if (isEditing) {
    const Component = isTextArea ? "textarea" : "input";
    return (
      <Component
        type="text"
        value={value}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => setValue(e.target.value)}
        onBlur={() => {
          onEdit(activeProjectId, timelineId, event.id, field, value);
          onEditEnd();
        }}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === "Enter" && !isTextArea) {
            onEdit(activeProjectId, timelineId, event.id, field, value);
            onEditEnd();
          }
          if (e.key === "Escape") {
            setValue(String(event[field]));
            onEditEnd();
          }
        }}
        autoFocus
        className={`edit-input ${isTextArea ? "edit-textarea" : ""}`}
      />
    );
  }

  return (
    <div
      onClick={() => onEditStart(event.id, field)}
      className="editable-field"
    >
      {field === "date" ? (
        <span className="timeline-date">{event[field]}</span>
      ) : field === "title" ? (
        <h3 className="timeline-title">{event[field]}</h3>
      ) : field === "subtitle" ? (
        <h4 className="timeline-subtitle">{event[field]}</h4>
      ) : (
        <p className="timeline-detail">{event[field]}</p>
      )}
    </div>
  );
}

export default EditableField;
