import {
  Links,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useFetcher,
} from "react-router"

import type { Route } from "./+types/root"
import "./app.css"
import { ThemeProvider } from "./components/theme-provider"
import LoadingAnimation from "./components/loading-animation"
import { Toaster } from "./components/ui/sonner"
import { getMe } from "./api/authApi"
import { useEffect } from "react"

export async function clientLoader() {
  return await getMe()
}

export function HydrateFallback() {
  return <LoadingAnimation />
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Links />
      </head>
      <body className="overflow-hidden">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App({ loaderData }: Route.ComponentProps) {
  const { me } = loaderData
  const fetcher = useFetcher()
  const submitFetcher = () =>
    fetcher.submit(null, {
      action: "me/online",
      method: "post",
    })

  useEffect(() => {
    if (me.username === "guest") return
    submitFetcher()
    const id = setInterval(submitFetcher, 50_000) // load for every 50 sec
    return () => clearInterval(id)
  }, [me.username])

  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
