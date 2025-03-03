// Replace the direct axios import with our custom instance.
import api from './axiosInstance';

export function generateContent(prompt, token) {
  return api.post(
    `/game/generate`,
    { prompt },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
}

export function saveGame(state, token) {
  return api.post(
    `/game/save`,
    { state },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
}

export function loadGame(token) {
  return api.get(`/game/load`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
