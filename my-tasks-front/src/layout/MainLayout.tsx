import { Outlet, useLocation } from "react-router-dom";
import { NavBar } from "./components/NavBar";
  
function MainLayout() {
  const location = useLocation();
  const showNavBar =
    location.pathname === "/mytasks" ||
    location.pathname === "/mytasks/calendar" ||
    location.pathname === "/mytasks/admin"  
  ;

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      {showNavBar && <NavBar />}
      
      <div className="flex-1 w-full">
        <Outlet />
      </div>
    </main>
  );
}

export default MainLayout;
