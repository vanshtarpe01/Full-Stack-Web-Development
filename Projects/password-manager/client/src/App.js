import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./App.css";

const emptyForm = { website: "", username: "", password: "" };
const AUTH_KEY = "pm_isLoggedIn";
const VALID_USERNAME = "adminvansh";
const VALID_PASSWORD = "admin@2006";

function IconButton({ title, onClick, variant = "default", children }) {
  const className =
    variant === "danger" ? "pm-iconBtn pm-iconBtn--danger" : "pm-iconBtn";
  return (
    <button type="button" className={className} onClick={onClick} title={title}>
      {children}
    </button>
  );
}

function EyeIcon({ open }) {
  return open ? (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="pm-icon">
      <path
        fill="currentColor"
        d="M12 5c-5.8 0-10 6-10 7s4.2 7 10 7 10-6 10-7-4.2-7-10-7Zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"
      />
      <path
        fill="currentColor"
        d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="pm-icon">
      <path
        fill="currentColor"
        d="M2.1 3.51 3.5 2.1l18.4 18.4-1.41 1.41-2.34-2.34A11.6 11.6 0 0 1 12 20C6.2 20 2 14 2 12c0-1.05 1.1-2.85 2.9-4.5L2.1 3.51Zm6.03 6.03A4.99 4.99 0 0 0 12 17a5 5 0 0 0 3.46-8.58l-1.55-1.55A3 3 0 0 1 9.3 11.5l-1.17-1.17ZM12 4c5.8 0 10 6 10 8 0 1.08-1.12 2.92-2.98 4.58l-3.03-3.03A4.99 4.99 0 0 0 10.5 6.02L8.22 3.74A11.7 11.7 0 0 1 12 4Z"
      />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="pm-icon">
      <path
        fill="currentColor"
        d="M3 17.25V21h3.75L17.8 9.95l-3.75-3.75L3 17.25Zm18-11.5a1 1 0 0 0 0-1.41l-1.34-1.34a1 1 0 0 0-1.41 0l-1.13 1.13 3.75 3.75L21 5.75Z"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="pm-icon">
      <path
        fill="currentColor"
        d="M6 7h12l-1 14H7L6 7Zm3-3h6l1 2H8l1-2Z"
      />
    </svg>
  );
}

function EditCredentialModal({ isOpen, initialValue, onClose, onSubmit }) {
  const [value, setValue] = useState(initialValue ?? emptyForm);
  const [localError, setLocalError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setValue(initialValue ?? emptyForm);
    setLocalError("");
    setIsSaving(false);
  }, [isOpen, initialValue]);

  if (!isOpen) return null;

  function handleChange(e) {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLocalError("");

    const website = value.website.trim();
    const username = value.username.trim();
    const password = value.password;

    if (!website || !username || !password) {
      setLocalError("All fields are required.");
      return;
    }

    try {
      setIsSaving(true);
      await onSubmit({ website, username, password });
      onClose();
    } catch (err) {
      setLocalError(
        err?.response?.data?.message || err?.message || "Failed to update."
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="pm-modalOverlay">
      <div className="pm-modal pm-modal--pop">
        <div className="pm-modalHeader">
          <div className="pm-modalTitle">Edit Credential</div>
          <button type="button" className="pm-linkBtn" onClick={onClose}>
            Close
          </button>
        </div>

        {localError ? <div className="pm-alert pm-alert--error">{localError}</div> : null}

        <form onSubmit={handleSubmit} className="pm-form">
          <input
            name="website"
            placeholder="Website"
            value={value.website}
            onChange={handleChange}
            className="pm-input"
            autoFocus
          />
          <input
            name="username"
            placeholder="Username / Email"
            value={value.username}
            onChange={handleChange}
            className="pm-input"
          />
          <input
            name="password"
            placeholder="Password"
            value={value.password}
            onChange={handleChange}
            className="pm-input"
          />

          <div className="pm-row">
            <button type="submit" className="pm-btn pm-btn--primary" disabled={isSaving}>
              {isSaving ? "Saving..." : "Update"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="pm-btn"
              disabled={isSaving}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [credentials, setCredentials] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem(AUTH_KEY) === "true"
  );
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editInitial, setEditInitial] = useState(emptyForm);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const stats = useMemo(() => {
    return { count: credentials.length };
  }, [credentials.length]);

  async function fetchCredentials() {
    const res = await axios.get("/api/credentials");
    setCredentials(res.data);
  }

  useEffect(() => {
    if (!isLoggedIn) return;
    fetchCredentials().catch((e) =>
      setError(e.response?.data?.message || e.message)
    );
  }, [isLoggedIn]);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleLoginChange(e) {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    setLoginError("");

    const u = loginForm.username.trim();
    const p = loginForm.password;

    if (!u || !p) {
      setLoginError("Please enter username and password.");
      return;
    }

    if (u === VALID_USERNAME && p === VALID_PASSWORD) {
      localStorage.setItem(AUTH_KEY, "true");
      setIsLoggedIn(true);
      setLoginForm({ username: "", password: "" });
      setLoginError("");
      setError("");
      return;
    }

    setLoginError("Invalid username or password.");
  }

  function handleLogout() {
    localStorage.removeItem(AUTH_KEY);
    setIsLoggedIn(false);
    setCredentials([]);
    setForm(emptyForm);
    setError("");
    setLoginError("");
    setIsEditOpen(false);
    setEditId(null);
    setEditInitial(emptyForm);
  }

  function startEdit(item) {
    setEditId(item._id);
    setEditInitial({
      website: item.website ?? "",
      username: item.username ?? "",
      password: item.password ?? ""
    });
    setIsEditOpen(true);
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await axios.post("/api/credentials", form);
      setForm(emptyForm);
      await fetchCredentials();
    } catch (e2) {
      setError(e2.response?.data?.message || e2.message);
    }
  }

  async function handleDelete(id) {
    setError("");
    try {
      await axios.delete(`/api/credentials/${id}`);
      await fetchCredentials();
    } catch (e2) {
      setError(e2.response?.data?.message || e2.message);
    }
  }

  return (
    <div className="pm-page">
      <header className="pm-navbar">
        <div className="pm-navbarInner">
          <div className="pm-brand">
            <div className="pm-brandTitle">Password Manager</div>
            {isLoggedIn ? (
              <div className="pm-brandSub">{stats.count} saved</div>
            ) : (
              <div className="pm-brandSub">Please login to continue</div>
            )}
          </div>

          {isLoggedIn ? (
            <button onClick={handleLogout} className="pm-btn">
              Logout
            </button>
          ) : null}
        </div>
      </header>

      <main className="pm-container">

        {isLoggedIn ? (
          <>
            {error ? <div className="pm-alert pm-alert--error">{error}</div> : null}

            <section className="pm-panel">
              <div className="pm-panelTitle">Add new credential</div>

              <form onSubmit={handleSubmit} className="pm-form pm-form--grid3">
              <input
                name="website"
                placeholder="Website (e.g. github.com)"
                value={form.website}
                onChange={handleChange}
                className="pm-input"
              />
              <input
                name="username"
                placeholder="Username / Email"
                value={form.username}
                onChange={handleChange}
                className="pm-input"
              />
              <input
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="pm-input"
              />

              <div className="pm-row">
                <button type="submit" className="pm-btn pm-btn--primary">
                  Add
                </button>
              </div>
            </form>
            </section>

            <div className="pm-sectionHeader">
              <div className="pm-sectionTitle">Saved Credentials</div>
            </div>

            {credentials.length === 0 ? (
              <div className="pm-empty">
                <div className="pm-emptyTitle">No credentials found</div>
                <div className="pm-emptySub">
                  Add your first credential using the form above.
                </div>
              </div>
            ) : (
              <div className="pm-grid">
                {credentials.map((item) => (
                  <div key={item._id} className="pm-card">
                    <div className="pm-cardTop">
                      <div className="pm-cardWebsite">{item.website}</div>
                      <div className="pm-cardActions">
                        <IconButton title="Edit" onClick={() => startEdit(item)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          title="Delete"
                          variant="danger"
                          onClick={() => handleDelete(item._id)}
                        >
                          <TrashIcon />
                        </IconButton>
                      </div>
                    </div>

                    <div className="pm-kv">
                      <div className="pm-k">Username</div>
                      <div className="pm-v">{item.username}</div>
                    </div>

                    <div className="pm-kv">
                      <div className="pm-k">Password</div>
                      <div className="pm-v pm-passwordRow">
                        <span className="pm-password">
                          {visiblePasswords[item._id] ? item.password : "••••••••"}
                        </span>
                        <button
                          type="button"
                          className="pm-chip"
                          onClick={() =>
                            setVisiblePasswords((prev) => ({
                              ...prev,
                              [item._id]: !prev[item._id]
                            }))
                          }
                        >
                          <EyeIcon open={!!visiblePasswords[item._id]} />
                          {visiblePasswords[item._id] ? "Hide" : "Show"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : null}
      </main>

      <EditCredentialModal
        isOpen={isLoggedIn && isEditOpen}
        initialValue={editInitial}
        onClose={() => setIsEditOpen(false)}
        onSubmit={async (nextValue) => {
          if (!editId) return;
          await axios.put(`/api/credentials/${editId}`, nextValue);
          await fetchCredentials();
        }}
      />

      {!isLoggedIn ? (
        <div className="pm-modalOverlay">
          <div className="pm-modal pm-modal--pop">
            <div className="pm-modalHeader">
              <div className="pm-modalTitle">Login</div>
            </div>

            {loginError ? (
              <div className="pm-alert pm-alert--error">{loginError}</div>
            ) : null}

            <form onSubmit={handleLoginSubmit} className="pm-form">
              <input
                name="username"
                placeholder="Username"
                value={loginForm.username}
                onChange={handleLoginChange}
                className="pm-input"
                autoFocus
              />
              <input
                name="password"
                placeholder="Password"
                type="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                className="pm-input"
              />

              <button type="submit" className="pm-btn pm-btn--primary">
                Login
              </button>
            </form>

            {/* <div className="pm-hint">
              Username: <b>{VALID_USERNAME}</b> | Password: <b>{VALID_PASSWORD}</b>
            </div> */}
          </div>
        </div>
      ) : null}
    </div>
  );
}
