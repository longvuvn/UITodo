import React from "react";
import "../../styles/layout/Header.css"; // Import CSS vào
import { useLocation, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>("");

  // Hàm kiểm tra trạng thái đăng nhập từ localStorage
  const checkLogin = React.useCallback(() => {
    const userStr = localStorage.getItem("user");
    let user = null;
    if (userStr) {
      user = JSON.parse(userStr);
    }
    setIsLoggedIn(!!user?.token);
    setUsername(user?.user?.username || "");
  }, []);

  // Kiểm tra khi location thay đổi hoặc khi có event đăng nhập thành công
  React.useEffect(() => {
    checkLogin();
    window.addEventListener("loginSuccess", checkLogin);
    return () => window.removeEventListener("loginSuccess", checkLogin);
  }, [location, checkLogin]);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("user"); // Xóa user khỏi localStorage (bao gồm token)
    setIsLoggedIn(false); // Cập nhật trạng thái đăng nhập
    setUsername("");// Xóa username khỏi state
    navigate("/login"); // Chuyển hướng về trang đăng nhập
  };
  return (
    <header className="header">
      <h1 className="header-title">📝 Todo Management App</h1>
      <div className="header-buttons">
        {isLoggedIn ? (
          <>
            <span className="header-username">Xin chào {username}!</span>
            <button
              className="header-button logout-button"
              onClick={handleLogoutClick}
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <button
              className="header-button login-button"
              onClick={handleLoginClick}
            >
              Đăng nhập
            </button>
            <button
              className="header-button signup-button"
              onClick={handleSignupClick}
            >
              Đăng ký
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
