export default async function throwError(res: any) {
  const errorData = await res.json();
  throw new Response(JSON.stringify(errorData.error.message), {
    status: res.status,
  });
}
