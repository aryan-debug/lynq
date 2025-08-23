import { useState, useEffect } from 'react';
import { Panel } from '@xyflow/react';
import './styles/sidebar.css';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [buttonPosition, setButtonPosition] = useState(20);
    const [showCloseIcon, setShowCloseIcon] = useState(false);

    const toggleSidebar = () => {
        if (isOpen) {
            setShowCloseIcon(false);
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    };

    useEffect(() => {
        if (isOpen) {
            const buttonTimer = setTimeout(() => {
                setButtonPosition(240);
            }, 53);

            const iconTimer = setTimeout(() => {
                setShowCloseIcon(true);
            }, 20);

            return () => {
                clearTimeout(buttonTimer);
                clearTimeout(iconTimer);
            };
        } else {
            setButtonPosition(20);
        }
    }, [isOpen]);

    return (
        <>
            <Panel position="top-left" style={{ zIndex: 1000 }}>
                <button
                    onClick={toggleSidebar}
                    className="hamburger-button"
                    style={{ left: `${buttonPosition}px` }}
                >
                    <div className={`hamburger-icon ${showCloseIcon ? 'active' : ''}`}>
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                    </div>
                </button>
            </Panel>

            <div className={`sidebar-container ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <div className="sidebar-content">
                    <h3 className="sidebar-title">Menu</h3>

                    <div className="menu-items">
                        <button className="menu-item">
                            Node Templates
                        </button>

                        <button className="menu-item">
                            Export Options
                        </button>

                        <button className="menu-item">
                            Settings
                        </button>

                        <button className="menu-item">
                            Help & Documentation
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    onClick={toggleSidebar}
                    className="sidebar-backdrop"
                />
            )}
        </>
    );
}

export default Sidebar;