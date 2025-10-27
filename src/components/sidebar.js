import React from "react";
import {
  Menu,
  X,
  MapPin,
  Award,
  IdCardLanyard,
  Network,
} from "lucide-react";

//Src
import Logo from "../asset/logo/logo.png";

const navItems = [
  { title: "Department", href: "/", icon: <Network size={16} /> },
  { title: "Employee", href: "/employee", icon: <IdCardLanyard size={16} /> },
  { title: "Tier", href: "/tier", icon: <Award size={16} /> },
  { title: "Location", href: "/location", icon: <MapPin size={16} /> },
];

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* Mobile top bar with toggle */}
      <div className="md:hidden flex items-center justify-between p-3 border-b border-border bg-background">
        <div className="flex items-center gap-5">
          <img src={Logo} className="w-7 h-7" />
          <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center text-sm font-bold text-primary">
            Opsnow
          </div>
        </div>

        <button
          aria-label="Open sidebar"
          className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring/50"
          onClick={() => setOpen(true)}
        >
          <Menu />
        </button>
      </div>

      {/* Overlay for mobile when sidebar open */}
      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          {/* Slide-in panel */}
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-background border-r border-border p-4 z-50 overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-5">
                <img src={Logo} className="w-7 h-7" />
                <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center text-sm font-bold text-primary">
                  Opsnow
                </div>
              </div>
              <button
                aria-label="Close sidebar"
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring/50"
                onClick={() => setOpen(false)}
              >
                <X />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-muted hover:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-ring/50"
                >
                  <span className="text-muted-foreground">{item.icon}</span>
                  <span>{item.title}</span>
                </a>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:z-20 md:w-72 md:flex md:flex-col md:pt-4 md:border-r md:border-border bg-background">
        <div className="px-4 pb-2">
          <div className="flex items-center gap-5 mb-6">
            <img src={Logo} className="w-7 h-7" />
            <div className="text-base rounded-md bg-muted flex items-center justify-center font-bold text-primary">
              Opsnow
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-muted hover:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-ring/50"
              >
                <span className="text-muted-foreground">{item.icon}</span>
                <span>{item.title}</span>
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
