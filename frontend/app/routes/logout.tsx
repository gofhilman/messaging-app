import { postLogout } from "~/api/authApi";
import type { Route } from "./+types/logout";
import { redirect } from "react-router";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const toastId = formData.get("toastId");
  postLogout();
  return redirect(`/login?logout=${toastId}`);
}