const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(path, options = {}) {
  const res = await fetch(`${API}${path}`, options);
  const text = await res.text();
  try {
    const data = text ? JSON.parse(text) : {};
    if (!res.ok) throw new Error(data.message || res.statusText || "Request failed");
    return data;
  } catch (err) {
    // if JSON.parse fails, throw generic error
    if (!res.ok) throw new Error(res.statusText || "Request failed");
    return {};
  }
}

export const getNews = () => request('/api/news');
export const getNewsById = (id) => request(`/api/news/${id}`);
export const createNews = (payload) => request('/api/news', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });

export const getPrograms = () => request('/api/programs');
export const getProgramById = (id) => request(`/api/programs/${id}`);
export const createProgram = (payload) => request('/api/programs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });

export const submitContact = (payload) => request('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
export const subscribeNewsletter = (payload) => request('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });

export default { API };
