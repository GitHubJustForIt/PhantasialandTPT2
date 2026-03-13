// ============================================================
//  PHANTASIALAND-ROBLOX — AUTH SYSTEM
//  LocalStorage-based login / signup
// ============================================================

const Auth = (() => {
  const USERS_KEY = "pl_users";
  const SESSION_KEY = "pl_session";

  function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function getCurrentUser() {
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) return null;
    const users = getUsers();
    return users[session] ? { username: session, ...users[session] } : null;
  }

  function login(username, password) {
    const users = getUsers();
    const trimmed = username.trim().toLowerCase();
    if (!users[trimmed]) return { success: false, error: "User not found." };
    if (users[trimmed].password !== btoa(password)) return { success: false, error: "Incorrect password." };
    localStorage.setItem(SESSION_KEY, trimmed);
    return { success: true, user: { username: trimmed, ...users[trimmed] } };
  }

  function signup(username, password) {
    const users = getUsers();
    const trimmed = username.trim().toLowerCase();
    if (!trimmed || trimmed.length < 3) return { success: false, error: "Username must be at least 3 characters." };
    if (password.length < 6) return { success: false, error: "Password must be at least 6 characters." };
    if (users[trimmed]) return { success: false, error: "Username already taken." };
    users[trimmed] = { password: btoa(password), createdAt: new Date().toISOString() };
    saveUsers(users);
    localStorage.setItem(SESSION_KEY, trimmed);
    return { success: true, user: { username: trimmed } };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  function isLoggedIn() {
    return getCurrentUser() !== null;
  }

  return { login, signup, logout, getCurrentUser, isLoggedIn };
})();
