import React from 'react';

interface UserFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  gateId: number;
  gateName: string;
  gateColor: string;
}

const UserFeedbackModal: React.FC<UserFeedbackModalProps> = ({ isOpen, onClose, gateId, gateName, gateColor }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[--background-dark] rounded-2xl p-8 max-w-md w-full border-4 border-green-400 shadow-[0_0_60px_20px_rgba(0,255,120,0.4)] animate-bounce-in">
        <div className="text-center mb-4">
          <img src="/rock_lee_8bits.gif" alt="Portão desbloqueado!" className="mx-auto w-40 h-40 mb-4 drop-shadow-[0_0_30px_#00ffae] animate-wiggle" />
          <h2 className="text-3xl font-extrabold mb-2 text-green-400 neon-text animate-pulse" style={{ textShadow: '0 0 18px #00ffae, 0 0 30px #00ffae' }}>
            Parabéns! Novo Portão Desbloqueado
          </h2>
          <div className="w-20 h-20 mx-auto rounded-full border-4 border-green-400 flex items-center justify-center text-3xl font-black mb-2 bg-black bg-opacity-70" style={{ color: '#00ffae', boxShadow: '0 0 40px #00ffae' }}>
            {gateId}
          </div>
          <div className="text-xl font-bold mb-3 text-green-300 animate-glow" style={{ textShadow: '0 0 14px #00ffae' }}>{gateName}</div>
          <button onClick={onClose} className="inline-block px-8 py-3 bg-green-400 text-black rounded-lg text-lg font-bold mt-2 hover:bg-green-300 shadow-[0_0_20px_#00ffae] transition-all animate-bounce">
            Continuar Treinamento!
          </button>
        </div>
      </div>
      <style>{`
        .neon-text { text-shadow: 0 0 18px #00ffae, 0 0 30px #00ffae, 0 0 60px #00ffae; }
        .animate-glow { animation: glow 1.5s ease-in-out infinite alternate; }
        @keyframes glow { 0% { text-shadow: 0 0 6px #00ffae; } 100% { text-shadow: 0 0 24px #00ffae, 0 0 40px #00ffae; } }
      `}</style>
    </div>
  );
};

export default UserFeedbackModal;
