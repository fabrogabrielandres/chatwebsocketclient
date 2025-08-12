import { useState } from "react";
import type { User } from "../Chat/Chat";

interface LoginFormProps {
  onLogin: (user: User) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isAuthenticated = async (username: string, password: string) => {
    const response = await fetch("http://localhost:3001/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const resp = await response.json();
    return resp;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resp = await isAuthenticated(username, password);
    console.log("user", resp);

    if (resp.user) {
      onLogin(resp.user);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};
