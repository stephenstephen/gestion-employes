import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

// 1. Définition des types
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

// 2. Création de l'instance
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000, // 10s timeout
});

// 3. Intercepteur de requête (typage amélioré)
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});


// 4. Intercepteur de réponse (gestion centralisée des erreurs)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('Non autorisé - Redirection vers /login');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Accès refusé');
          break;
        case 404:
          console.error('Ressource non trouvée');
          break;
        case 500:
          console.error('Erreur serveur');
          break;
        default:
          console.error(`Erreur ${error.response.status}`);
      }
    }
    return Promise.reject(error);
  }
);

export default api;