import React from 'react';
import "../../styles/Footer.css"

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2023 Todo App. All rights reserved.</p>
                <div className="footer-contact">
                    <span>Contact: </span>
                    <a href="mailto:vunguyenlong707@gmail.com">vunguyenlong707@gmail.com</a> |
                    <a href="tel:+84855154595" style={{ marginLeft: 8 }}>0855154595</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;