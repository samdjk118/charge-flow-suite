const API_BASE = process.env.NEXT_PUBLIC_API_URL;

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccess(): Promise<string | null> {
  if (isRefreshing && refreshPromise) return refreshPromise;
  isRefreshing = true;

  refreshPromise = (async () => {
    try {
      const res = await fetch(`${API_BASE}/token/refresh/`, {
        method: 'POST',
        credentials: 'include', // send HttpOnly cookie
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        localStorage.removeItem('access_token');
        return null;
      }
      const data = await res.json();
      const access = data.access;
      if (access) {
        localStorage.setItem('access_token', access);
        return access;
      }
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export async function apiFetch(input: RequestInfo | string, init: RequestInit = {}, retry = true): Promise<any> {
  const url = typeof input === 'string' && !/^https?:\/\//.test(input) ? API_BASE + input : input;
  const access = localStorage.getItem('access_token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(init.headers || {}),
    ...(access ? { Authorization: `Bearer ${access}` } : {}),
  };

  const res = await fetch(url as string, {
    ...init,
    headers,
    credentials: init.credentials ?? 'include'
  });

  if (res.status === 401 && retry) {
    const newAccess = await refreshAccess();
    if (newAccess) {
      const headers2: HeadersInit = {
        'Content-Type': 'application/json',
        ...(init.headers || {}),
        Authorization: `Bearer ${newAccess}`,
      };
      const res2 = await fetch(url as string, {
        ...init,
        headers: headers2,
        credentials: init.credentials ?? 'include'
      });

      if (!res2.ok) {
        const txt = await res2.text();
        throw new Error(txt || `HTTP error ${res2.status}`);
      }
      if (res2.status === 204) return null;
      return res2.json();
    } else {
      localStorage.removeItem('access_token');
      throw new Error('Unauthorized');
    }
  }

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || `HTTP error ${res.status}`);
  }

  if (res.status === 204) return null;
  return res.json();
}