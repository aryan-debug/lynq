import { ReactNode, useState } from 'react';
import "./styles/tooltip.css";

interface TooltipProps {
    children: ReactNode
    text: string
    position: "top" | "bottom" | "left" | "right"
    delay?: number
}


function Tooltip({
    children,
    text,
    position = 'top',
    delay = 300
}: TooltipProps) {
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
        "tooltip",
        position,
        isVisible ? "visible" : ""
    ].filter(Boolean).join(' ');

    return (
        <div
            className="tooltip-container"
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
        >
            {children}
            <div className={tooltipClasses}>
                {text}
                <div className={"tooltip-arrow"}></div>
            </div>
        </div>
    );
};

export default Tooltip;