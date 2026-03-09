function jsonContentHeaders(headers: any) {
  headers.append("Content-Type", "application/json");
  return headers;
}

function jwtHeaders(headers: any) {
  headers.append("Authorization", "bearer " + localStorage.getItem("JWT"));
  return headers;
}

function jsonContentJwtHeaders(headers: any) {
  return jwtHeaders(jsonContentHeaders(headers));
}

export { jsonContentHeaders, jwtHeaders, jsonContentJwtHeaders };
