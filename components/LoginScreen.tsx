import React, { useState } from 'react';
import { User } from '../types';

interface LoginScreenProps {
  onLogin: (user: User) => boolean;
  onRegister: (user: User) => boolean;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Por favor, preencha o usuário e a senha.');
      return;
    }
    const user = { username, password };

    if (isRegisterMode) {
      const success = onRegister(user);
      if (success) {
        setIsRegisterMode(false); // Switch back to login mode
        setUsername(''); // Clear fields for login
        setPassword('');
      }
    } else {
      onLogin(user);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-2 sm:p-4 bg-[--background-dark] relative">
      {/* Background global */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/paisagemjaponesa01.gif" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full max-w-4xl mx-auto bg-[--card-background] rounded-2xl shadow-2xl border border-[--border-color] overflow-hidden flex flex-col lg:flex-row relative z-10 min-h-[70vh]">
        {/* Overlay green_leaf.gif apenas no container central */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="/green_leafiii.gif" 
            
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        {/* Lado esquerdo: Imagem temática */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col items-center justify-center bg-cover bg-center relative z-10 min-h-[220px]">
          <div className="relative flex flex-col items-center w-full">
            {/* Overlay green_leafiii.gif sobre a imagem do Rock Lee */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <img 
                src="/green_leafiii.gif" 
                alt="" 
                className="w-28 h-28 sm:w-48 sm:h-48 object-contain opacity-80 rounded-full"
              />
            </div>
            <img 
              src="/rock-lee-imagem01.png" 
              alt="Rock Lee"
              className="w-28 h-28 sm:w-48 sm:h-48 object-contain rounded-full pointer-events-none relative z-0"
            />
            <h2 className="text-lg sm:text-2xl font-bold text-[--aura-glow] mt-2 sm:mt-4 relative z-20 text-center">Dojo de Engenharia de Dados</h2>
            <p className="text-[--text-secondary] text-xs sm:text-base text-center mt-1 sm:mt-2 relative z-20">Abra os portões do conhecimento. Seu treinamento começa agora.</p>
          </div>
        </div>
        {/* Lado direito: Formulário de login/cadastro */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col justify-center relative z-10 min-h-[220px]">
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <h2 className="text-xl sm:text-3xl font-bold text-center text-white transition-all duration-300">
              {isRegisterMode ? 'Crie sua Conta no Dojo' : 'Acesse o Dojo'}
            </h2>
            <div>
              <label htmlFor="username" className="block text-xs sm:text-sm font-medium text-[--text-secondary]">
                Usuário
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-2 mt-1 text-[--text-primary] bg-[#0d1117] border-2 border-[--border-color] rounded-md focus:outline-none focus:ring-2 focus:ring-[--aura-glow] focus:border-transparent transition-all text-base sm:text-lg"
                placeholder="seu_nome_de_guerreiro"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-[--text-secondary]">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isRegisterMode ? "new-password" : "current-password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-2 mt-1 text-[--text-primary] bg-[#0d1117] border-2 border-[--border-color] rounded-md focus:outline-none focus:ring-2 focus:ring-[--aura-glow] focus:border-transparent transition-all text-base sm:text-lg"
                placeholder="********"
              />
            </div>
            <div className="flex flex-col space-y-2 sm:space-y-4 pt-2 sm:pt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 sm:py-3 font-semibold text-white bg-[--lee-green-jumpsuit] border-2 border-transparent rounded-md hover:opacity-90 transition-all duration-300 transform hover:scale-105 text-base sm:text-lg"
              >
                {isRegisterMode ? 'Cadastrar' : 'Entrar'}
              </button>
              <p className="text-center text-xs sm:text-sm text-[--text-secondary]">
                {isRegisterMode ? 'Já tem uma conta?' : 'Não tem uma conta?'}
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(!isRegisterMode)}
                  className="ml-1 font-semibold text-[--lee-orange-legwarmers] hover:underline focus:outline-none bg-transparent border-none"
                >
                  {isRegisterMode ? 'Faça o Login' : 'Cadastre-se'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;