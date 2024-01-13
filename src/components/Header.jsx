// Header.jsx

import React from "react";

const Header = ({ toggleSidebar }) => {
  return (
    <header style={{ padding: "10px", background: "#333", color: "#fff" }}>
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
      {/* Add other header content */}
    </header>
  );
};

export default Header;
