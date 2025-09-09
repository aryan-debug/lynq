import { ReactNode, useState } from "react";
import styles from "@/styles/tooltip.module.css";

interface TooltipProps {
  children: ReactNode;
  text: string;
  delay?: number;
}

function Tooltip({ children, text, delay = 300 }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>();

  const showTooltip = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  const tooltipClasses = [
    `${styles.tooltip}`,
    styles.top,
    isVisible ? styles.visible : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={styles.tooltipContainer}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      <div className={tooltipClasses}>
        {text}
        <div className={styles.tooltipArrow}></div>
      </div>
    </div>
  );
}

export default Tooltip;
