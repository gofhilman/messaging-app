import { Earth, MessagesSquare, SquareUser, Users } from "lucide-react"
import { NavLink } from "react-router"

const navList = [
  {
    name: "Chats",
    uri: "/chats",
    icon: <MessagesSquare />,
  },
  {
    name: "People",
    uri: "/users",
    icon: <Users />,
  },
  {
    name: "Global",
    uri: "/global",
    icon: <Earth />,
  },
  {
    name: "Me",
    uri: "/me",
    icon: <SquareUser />,
  },
]

export default function Navigation() {
  return (
    <nav className="fixed inset-x-0 -bottom-0.5 z-10 border-t bg-sidebar p-3 md:top-0 md:right-auto md:h-screen md:w-24 md:border-t-0 md:border-r">
      <ul className="flex justify-around md:flex-col md:items-center md:gap-6 md:pt-24">
        {navList.map(({ name, uri, icon }, id) => (
          <li key={id}>
            <NavLink
              to={uri}
              className={({ isActive, isPending }) =>
                `flex flex-col items-center justify-center gap-0.5 p-2 transition-all ${isPending ? "animate-scale-pulse" : ""} ${isActive ? "scale-125 text-primary" : "text-muted-foreground"}`
              }
            >
              {icon}
              <p className="text-xs">{name}</p>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
