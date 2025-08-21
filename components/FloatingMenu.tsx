import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/floating_menu.css";
import Tooltip from "./Tooltip";

function FloatingMenu() {
    return <div className="floating-menu">
        <Tooltip text="Add note" position="top">
            <FontAwesomeIcon icon={faFileLines} size={"2x"}></FontAwesomeIcon>
        </Tooltip>
    </div>
}

export default FloatingMenu;