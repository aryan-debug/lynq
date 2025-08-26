import { useState, useRef, useEffect } from "react";

interface EditableHeadingProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function EditableHeading({
  value,
  onChange,
  className = "",
  style = {},
  tag = "h4",
}: EditableHeadingProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleClick = () => {
    setIsEditing(true);
    setTempValue(value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onChange(tempValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      onChange(tempValue);
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setTempValue(value);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempValue(e.target.value);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const HeadingTag = tag;

  return (
    <div>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={tempValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={className}
          name="lynqName"
          style={{
            ...style,
            border: "none",
            outline: "none",
            background: "transparent",
            font: "inherit",
            fontSize: "inherit",
            fontWeight: "inherit",
            fontFamily: "inherit",
            color: "inherit",
            textAlign: "inherit",
          }}
        />
      ) : (
        <HeadingTag
          onClick={handleClick}
          className={className}
          style={{
            ...style,
            cursor: "pointer",
          }}
        >
          {value ? value : "Enter a name"}
        </HeadingTag>
      )}
    </div>
  );
}

export default EditableHeading;
