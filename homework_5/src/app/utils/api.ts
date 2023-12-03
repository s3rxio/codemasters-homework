import { API_URL } from "../constants";

export function apiGet<Body>(breakpoint: string): Promise<Body> {
  return fetch(API_URL + breakpoint).then(
    response => response.json() as Promise<Body>,
  );
}

export function apiPost<BReq, Res>(
  breakpoint: string,
  body: BReq,
): Promise<Res> {
  return fetch(API_URL + breakpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then(response => response.json() as Promise<Res>);
}
