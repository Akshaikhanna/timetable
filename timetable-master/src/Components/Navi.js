import React from "react";


function Navi() {


  return (
    <div>
      <nav className="navs">
        <div className="navs-container">
          <div className="navbar-brands">Timetable</div>
          <div className="nav-secondary">
            <a
              href="/admin/credentials"
              className="navs-link"
            >
              Admin
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navi;
