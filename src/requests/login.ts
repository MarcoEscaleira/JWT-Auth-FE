import { SERVER_URL } from "../constants/hosts";

export const refreshAccessToken = () =>
  fetch(`${SERVER_URL}/refresh_token`, {
    method: "POST",
    credentials: 'include'
  });
