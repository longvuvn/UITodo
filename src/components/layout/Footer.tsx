import React from 'react';
import "../../styles/layout/Footer.css";
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3 className="footer-title">Todo App</h3>
                    <p className="footer-description">
                        Quản lý công việc hiệu quả với ứng dụng Todo của chúng tôi.
                        Dễ dàng theo dõi, sắp xếp và hoàn thành các nhiệm vụ.
                    </p>
                </div>

                <div className="footer-section">
                    <h3 className="footer-title">Liên kết</h3>
                    <ul className="footer-links">
                        <li><Link to="/TaskManagement">Quản lý công việc</Link></li>
                        <li><Link to="/category">Danh mục</Link></li>
                        <li><Link to="/reports">Thống kê</Link></li>
                        <li><Link to="/profile">Hồ sơ</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3 className="footer-title">Liên hệ</h3>
                    <ul className="footer-contact-info">
                        <li>
                            <i className="fas fa-envelope"></i>
                            <a href="mailto:vunguyenlong707@gmail.com">vunguyenlong707@gmail.com</a>
                        </li>
                        <li>
                            <i className="fas fa-phone"></i>
                            <a href="tel:+84855154595">0855154595</a>
                        </li>
                        <li>
                            <i className="fas fa-map-marker-alt"></i>
                            <span>Thành phố Hồ Chí Minh, Việt Nam</span>
                        </li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3 className="footer-title">Theo dõi chúng tôi</h3>
                    <div className="footer-social">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {currentYear} Todo App. Tất cả các quyền đã được bảo lưu.</p>
            </div>
        </footer>
    );
}

export default Footer;