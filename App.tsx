
import React, { useState, useEffect, useCallback } from 'react';
import { User, ProgressData } from './types';
import LoginScreen from './components/LoginScreen';
import RoadmapScreen from './components/RoadmapScreen';

const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleRegister = useCallback((user: User): boolean => {
    // Note: Storing passwords in localStorage is not secure.
    // This is for demonstration purposes in a local project only.
    const usersData = localStorage.getItem(USERS_KEY);
    const users: User[] = usersData ? JSON.parse(usersData) : [];

    if (users.some(u => u.username === user.username)) {
      alert('Usuário já existe!');
      return false;
    }

    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    alert('Cadastro realizado com sucesso! Faça o login.');
    return true;
  }, []);

  const handleLogin = useCallback((user: User): boolean => {
    const usersData = localStorage.getItem(USERS_KEY);
    const users: User[] = usersData ? JSON.parse(usersData) : [];

    const foundUser = users.find(u => u.username === user.username && u.password === user.password);

    if (foundUser) {
      localStorage.setItem(CURRENT_USER_KEY, foundUser.username);
      setCurrentUser(foundUser.username);
      return true;
    } else {
      alert('Usuário ou senha incorretos!');
      return false;
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setCurrentUser(null);
  }, []);
  
  return (
    <div className="min-h-screen bg-[--background-dark] text-[--text-primary]">
      {currentUser ? (
        <RoadmapScreen currentUser={currentUser} onLogout={handleLogout} />
      ) : (
        <LoginScreen onLogin={handleLogin} onRegister={handleRegister} />
      )}
      {/* Rodapé fixo */}
      <footer style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        background: 'rgba(20, 20, 20, 0.85)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.25rem 0',
        zIndex: 50,
        fontFamily: 'inherit',
        fontSize: '0.95rem',
        letterSpacing: '0.02em',
      }}
      className="sm:text-base text-xs">
        <span style={{marginRight: '0.5rem'}}>feito por jordy.dev ™</span>
        <img src="/rocklee-rock-lee-fight.gif" alt="Rock Lee lutando" style={{height: '28px', width: 'auto', borderRadius: '8px', boxShadow: '0 0 8px #00ffc3'}} className="sm:h-10 h-7" />
      </footer>
    </div>
  );
};

export default App;
