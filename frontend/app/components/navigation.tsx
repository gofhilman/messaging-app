import { Earth, MessagesSquare, SquareUser, Users } from "lucide-react"
import { NavLink } from "react-router"

const navList = [
  {
    name: "Chats",
    uri: "/chats",
    icon: <MessagesSquare className="lg:h-10 lg:w-10" />,
  },
  {
    name: "People",
    uri: "/users",
    icon: <Users className="lg:h-10 lg:w-10" />,
  },
  {
    name: "Global",
    uri: "/global",
    icon: <Earth className="lg:h-10 lg:w-10" />,
  },
  {
    name: "Me",
    uri: "/me",
    icon: <SquareUser className="lg:h-10 lg:w-10" />,
  },
]

export default function Navigation() {
  return (
    <nav className="border-t bg-sidebar p-3 lg:top-0 lg:right-auto lg:h-dvh lg:w-50 lg:border-t-0 lg:border-r lg:p-5">
      <ul className="flex justify-around lg:flex-col lg:items-start lg:gap-6 lg:pt-24">
        {navList.map(({ name, uri, icon }, id) => (
          <li key={id}>
            <NavLink
              to={uri}
              className={({ isActive, isPending }) =>
                `flex flex-col items-center justify-center gap-0.5 p-2 transition-all lg:flex-row lg:gap-3 ${isPending ? "animate-scale-pulse" : ""} ${isActive ? "scale-125 text-primary" : "text-muted-foreground"}`
              }
            >
              {icon}
              <p className="text-xs lg:text-xl lg:font-semibold">{name}</p>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
