import Department from "./pages/department";
import Employee from "./pages/employee";
import Location from "./pages/location";
import Tier from "./pages/tier";

export const PageRoutePath = [
  {
    BASE_URL: "/",
    COMPONENT: <Department />,
  },
  {
    BASE_URL: "/employee",
    COMPONENT: <Employee />,
  },
  {
    BASE_URL: "/location",
    COMPONENT: <Location />,
  },
  {
    BASE_URL: "/tier",
    COMPONENT: <Tier />,
  },
];
