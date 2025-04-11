/**
 * Service d'authentification pour les appels API
 * Contient : connexion, récupération profil, mise à jour profil
 */

// 🔐 Connexion utilisateur
export async function loginUser(email, password) {
    const response = await fetch('http://localhost:3001/api/v1/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  }
  
  // 👤 Récupérer le profil utilisateur
  export async function fetchUserProfile(token) {
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }
  
  // ✏️ Mettre à jour prénom et nom de l'utilisateur
  export async function updateUserProfile(token, firstName, lastName) {
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName }),
    });
    return await response.json();
  }  