import SideBar from "./components/sidebar";
import { PageRoutePath } from "./config";

import { Routes, Route, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col sm:flex-row h-full">
      <SideBar />

      {/* Content area */}
      <div className="flex-1 flex-col md:ml-72 p-6 overflow-auto">
        <Routes>
          {PageRoutePath.map((val, idx) => (
            <Route path={val.BASE_URL} element={val.COMPONENT} />
          ))}
        </Routes>
      </div>
    </div>
  );
}

export default App;
