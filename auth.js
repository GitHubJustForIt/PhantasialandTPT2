// ═══════════════════════════════════════════════════════════
//  PHANTASIALAND-ROBLOX  —  AUTH SYSTEM
//  LocalStorage-based login / signup. No backend needed.
// ═══════════════════════════════════════════════════════════

const Auth = (() => {
  const USERS_KEY   = "pl_users";
  const SESSION_KEY = "pl_session";

  const getUsers  = ()  => JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  const saveUsers = (u) => localStorage.setItem(USERS_KEY, JSON.stringify(u));

  function getCurrentUser() {
    const s = localStorage.getItem(SESSION_KEY);
    if (!s) return null;
    const u = getUsers();
    return u[s] ? { username: s, ...u[s] } : null;
  }

  function login(username, password) {
    const users = getUsers();
    const key   = username.trim().toLowerCase();
    if (!users[key])                            return { success: false, error: "Account not found." };
    if (users[key].password !== btoa(password)) return { success: false, error: "Incorrect password." };
    localStorage.setItem(SESSION_KEY, key);
    return { success: true, user: { username: key } };
  }

  function signup(username, password) {
    const users = getUsers();
    const key   = username.trim().toLowerCase();
    if (key.length < 3)  return { success: false, error: "Username must be at least 3 characters." };
    if (password.length < 6) return { success: false, error: "Password must be at least 6 characters." };
    if (users[key])      return { success: false, error: "Username already taken." };
    users[key] = { password: btoa(password), createdAt: new Date().toISOString() };
    saveUsers(users);
    localStorage.setItem(SESSION_KEY, key);
    return { success: true, user: { username: key } };
  }

  function logout()     { localStorage.removeItem(SESSION_KEY); }
  function isLoggedIn() { return !!getCurrentUser(); }

  return { login, signup, logout, getCurrentUser, isLoggedIn };
})();
