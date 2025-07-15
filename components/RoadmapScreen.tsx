import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Task, ProgressData } from '../types';
import { roadmapData } from '../data/roadmapData';
import UserFeedbackModal from './UserFeedbackModal';

const PROGRESS_KEY_PREFIX = 'progress_';

// --- Constants ---
const GATES_CONFIG = [
  { id: 1, name: 'Portão da Abertura (開門, Kaimon)', chakraRequired: 100, color: '#00ffc3' },
  { id: 2, name: 'Portão da Cura (休門, Kyūmon)', chakraRequired: 200, color: '#00aeff' },
  { id: 3, name: 'Portão da Vida (生門, Seimon)', chakraRequired: 300, color: '#f7ff9e' },
  { id: 4, name: 'Portão da Dor (傷門, Shōmon)', chakraRequired: 400, color: '#ffab40' },
  { id: 5, name: 'Portão do Limite (杜門, Tomon)', chakraRequired: 500, color: '#ff5c5c' },
  { id: 6, name: 'Portão da Visão (景門, Keimon)', chakraRequired: 600, color: '#00ffae' }, // Aura verde
  { id: 7, name: 'Portão da Insanidade/Maravilha (驚門, Kyōmon)', chakraRequired: 700, color: '#00bfff' }, // Aura azul
  { id: 8, name: 'Portão da Morte (死門, Shimon)', chakraRequired: 800, color: '#ff0033' } // Vapor vermelho-sangue
];

// --- Thematic constants for daily feedback ---
const DAY_COMPLETION_GIFS = [
    '/rocklee01.gif', // Dia 1
    '/rocklee01.gif', // Dia 2
    '/rocklee01.gif', // Dia 3
    '/rocklee01.gif', // Dia 4
    '/rocklee01.gif', // Dia 5
    '/rocklee01.gif', // Dia 6
    '/rocklee01.gif', // Dia 7
    '/rocklee01.gif', // Dia 8
    '/rocklee01.gif', // Dia 9
    '/rocklee01.gif', // Dia 10
    '/rocklee01.gif', // Dia 11
    '/rocklee01.gif', // Dia 12
    '/rocklee01.gif', // Dia 13
    '/rocklee01.gif'  // Dia 14
];

// --- Helper Components ---

interface UserPanelProps {
  currentUser: string;
  totalChakra: number;
  unlockedGates: number[];
  currentGate: number | null;
  progressPercentage: number;
  onLogout: () => void;
  onReset: () => void;
}

const UserPanel: React.FC<UserPanelProps> = ({ currentUser, totalChakra, unlockedGates, currentGate, progressPercentage, onLogout, onReset }) => {
  const gateConfig = currentGate ? GATES_CONFIG[currentGate - 1] : null;
  const nextGateConfig = currentGate && currentGate < GATES_CONFIG.length ? GATES_CONFIG[currentGate] : null;
  const chakraToNext = nextGateConfig ? nextGateConfig.chakraRequired - totalChakra : 0;

  // Mapeamento das imagens dos portões
  const gateImages = {
    1: '/portao02.png',
    2: '/portao02.png',
    3: '/portao03.png',
    4: '/portao04.png',
    5: '/portao05.png',
    6: '/portao05.png',
    7: '/portao05.png',
    8: '/portao05.png',
  };

  // Efeitos visuais por portão
  let gateEffectClass = '';
  let gateOverlay = null;
  if (currentGate >= 3 && currentGate <= 5) {
    // Pele avermelhada intensa
    gateEffectClass = 'filter saturate-200 brightness-110 hue-rotate-[-20deg]';
    gateOverlay = (
      <div className="absolute inset-0 rounded-xl pointer-events-none" style={{background: 'rgba(255,0,0,0.18)'}}></div>
    );
  } else if (currentGate === 6) {
    // Aura verde
    gateEffectClass = 'shadow-[0_0_60px_20px_#00ffae] animate-pulse';
    gateOverlay = (
      <div className="absolute inset-0 rounded-xl pointer-events-none animate-green-aura"></div>
    );
  } else if (currentGate === 7) {
    // Aura azul
    gateEffectClass = 'shadow-[0_0_60px_20px_#00bfff] animate-pulse';
    gateOverlay = (
      <div className="absolute inset-0 rounded-xl pointer-events-none animate-blue-aura"></div>
    );
  } else if (currentGate === 8) {
    // Vapor vermelho-sangue
    gateEffectClass = 'shadow-[0_0_80px_30px_#ff0033] animate-pulse';
    gateOverlay = (
      <div className="absolute inset-0 rounded-xl pointer-events-none animate-red-vapor"></div>
    );
  }

  return (
    <header className="sticky top-0 z-20 p-2 sm:p-4 mb-4 sm:mb-8 bg-[--background-dark] bg-opacity-80 backdrop-blur-sm border-b border-[--border-color]">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
        <div className="text-center sm:text-left w-full sm:w-auto">
          <h1 className="text-lg sm:text-2xl font-bold">
            Bem-vindo, <span className="text-[--lee-orange-legwarmers]">{currentUser}</span>!
          </h1>
          {gateConfig && (
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-2 relative">
              <div className="w-8 h-8 rounded-full border-2 border-[--aura-glow] flex items-center justify-center text-base sm:text-xl font-bold" style={{ backgroundColor: gateConfig.color }}>
                {currentGate}
              </div>
              <span className="text-[--text-secondary] font-bold text-xs sm:text-base">{gateConfig.name}</span>
              {/* Imagem do portão ao lado com efeito visual */}
              {currentGate && gateImages[currentGate] && (
                <div className="relative ml-0 sm:ml-8 mt-2 sm:mt-0">
                  <img 
                    src={gateImages[currentGate]} 
                    alt={`Portão ${currentGate}`}
                    className={`h-24 w-auto sm:h-48 rounded-xl shadow-2xl border-4 border-[--aura-glow] bg-black bg-opacity-40 ${gateEffectClass}`}
                  />
                  {gateOverlay}
                </div>
              )}
            </div>
          )}
          <p className="text-base sm:text-lg font-bold text-[--aura-glow] mt-2" style={{ textShadow: '0 0 5px var(--aura-glow)' }}>
            Chakra Total: {totalChakra}
          </p>
          {nextGateConfig ? (
            <p className="text-xs sm:text-sm text-[--lee-green-jumpsuit] mt-1 animate-pulse">
              Faltam <b>{chakraToNext}</b> Chakra para desbloquear o próximo portão: <b>{nextGateConfig.name}</b>!
            </p>
          ) : (
            <p className="text-xs sm:text-sm text-[--lee-orange-legwarmers] mt-1 animate-bounce">
              Você já abriu todos os portões! Parabéns!
            </p>
          )}
        </div>
        <div className="w-full sm:w-1/3 mt-4 sm:mt-0">
          <div className="w-full bg-[--card-background] rounded-full h-3 sm:h-4 border border-[--border-color]">
            <div className="h-full rounded-full progress-bar-inner" style={{ 
              width: `${progressPercentage}%`, 
              background: gateConfig && nextGateConfig 
                ? `linear-gradient(90deg, ${gateConfig.color}, ${nextGateConfig.color})` 
                : gateConfig?.color 
            }}></div>
          </div>
          <p className="text-[--text-secondary] mt-1 sm:mt-2 text-xs sm:text-base">{totalChakra} Chakra / {nextGateConfig?.chakraRequired || gateConfig?.chakraRequired} Chakra</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 mt-4 sm:mt-0">
          <button onClick={onReset} className="px-2 sm:px-4 py-1 sm:py-2 font-semibold text-red-500 bg-transparent border-2 border-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-300 text-xs sm:text-base">
            Resetar Progresso
          </button>
          <button onClick={onLogout} className="px-2 sm:px-4 py-1 sm:py-2 font-semibold text-[--lee-orange-legwarmers] bg-transparent border-2 border-[--lee-orange-legwarmers] rounded-md hover:bg-[--lee-orange-legwarmers] hover:text-white transition-colors duration-300 text-xs sm:text-base">
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

interface TaskCardProps {
    task: Task;
    isCompleted: boolean;
    justCompleted: boolean;
    onToggle: (taskId: string) => void;
}
const TaskCard: React.FC<TaskCardProps> = ({ task, isCompleted, onToggle, justCompleted }) => {
    const difficultyConfig = {
        'Fácil': 'bg-[--lee-green-jumpsuit] text-white',
        'Médio': 'bg-[--lee-orange-legwarmers] text-white',
        'Difícil': 'bg-[var(--skin-glow)] text-black font-bold',
    };
    const difficultyClass = difficultyConfig[task.difficulty] || 'bg-gray-700 text-gray-200';
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={`
                p-2 sm:p-4 bg-[--card-background] border border-[--border-color] rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4
                transition-all duration-300 ease-in-out relative
                ${isCompleted 
                    ? 'opacity-50 grayscale-[50%]' 
                    : 'hover:transform hover:-translate-y-1 hover:scale-[1.02] hover:animate-[pulse-glow_2s_infinite]'
                }
                ${justCompleted ? 'animate-[task-complete-fx_0.6s_ease-out]' : ''}
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative">
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => onToggle(task.id)}
                    className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 rounded bg-gray-700 border-gray-500 text-[--aura-glow] focus:ring-offset-0 focus:ring-2 focus:ring-[--aura-glow] cursor-pointer"
                />
            </div>
            <div className="flex-1 w-full sm:w-auto">
                <h3 className={`font-semibold text-sm sm:text-base ${isCompleted ? 'line-through text-[--text-secondary]' : 'text-[--text-primary]'}`}>{task.title}</h3>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm mt-1">
                    <span className="bg-opacity-50 bg-gray-600 px-1.5 sm:px-2 py-0.5 rounded-full">{task.topic}</span>
                    <span className={`font-semibold px-1.5 sm:px-2 py-0.5 rounded-full ${difficultyClass}`}>{task.difficulty}</span>
                    <span className="text-[--aura-glow] font-bold text-xs sm:text-sm">{task.xp} XP</span>
                </div>
            </div>
            <div className="relative flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                {isHovered && (
                    <img
                        src="/rock-lee-gaara.gif"
                        alt="Rock Lee Gaara"
                        className="w-16 h-16 sm:w-24 sm:h-24 pointer-events-none"
                        key={task.id + '-hover'}
                    />
                )}
                <a href={task.link} target="_blank" rel="noopener noreferrer" className="text-[--text-secondary] hover:text-[--aura-glow] hover:underline transition-colors text-xs sm:text-sm">
                    Ver recurso
                </a>
            </div>
        </div>
    );
};


interface DaySectionProps {
    day: number;
    tasks: Task[];
    completedTasks: string[];
    isLocked: boolean;
    isUnlocking: boolean;
    isFullyCompleted: boolean;
    justCompletedTaskId: string | null;
    onToggleTask: (taskId: string) => void;
    gateColor: string;
    completionGifUrl: string;
}
const DaySection: React.FC<DaySectionProps> = ({ day, tasks, completedTasks, isLocked, isUnlocking, onToggleTask, isFullyCompleted, justCompletedTaskId, gateColor, completionGifUrl }) => {
    const animationClass = isUnlocking ? 'animate-[gate-open-animation_1s_ease-in-out]' : '';
    const borderColor = `${gateColor}40`; // Adds 25% opacity to the hex color for the border

    return (
        <section 
            className={`relative p-3 sm:p-6 bg-[#10141a] rounded-xl border transition-all duration-700 ease-in-out ${isLocked ? 'grayscale blur-[1px] pointer-events-none' : ''} ${animationClass}`}
            style={{ borderColor }}
        >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4" style={{ color: gateColor, textShadow: `0 0 8px ${gateColor}`}}>Dia {day}</h2>
            <div className="space-y-2 sm:space-y-3">
                {tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        isCompleted={completedTasks.includes(task.id)}
                        onToggle={onToggleTask}
                        justCompleted={justCompletedTaskId === task.id}
                    />
                ))}
            </div>
            {isFullyCompleted && (
                <div 
                    className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none z-10 flex items-center justify-center bg-black bg-opacity-70"
                    style={{ animation: 'gif-fade-out 2s ease-out forwards' }}
                >
                    <img 
                        // O GIF para este dia é passado via props.
                        src={completionGifUrl}
                        alt="Dia concluído!"
                        className="w-full max-w-md h-auto object-contain"
                    />
                </div>
            )}
        </section>
    );
};

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ResetModal: React.FC<ResetModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="bg-[--background-dark] rounded-lg p-6 max-w-md w-full border-2 border-red-500">
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto rounded-full border-2 border-red-500 flex items-center justify-center text-2xl font-bold text-red-500">
              ❌
            </div>
          </div>
          <h2 className="text-xl font-bold text-red-500 mb-2">Atenção!</h2>
          <p className="text-[--text-secondary] mb-4">Tem certeza que deseja resetar seu progresso? Todos os seus checks serão removidos.</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[--card-background] border-2 border-[--border-color] rounded-lg hover:bg-[--border-color] transition-colors duration-300"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
              Resetar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Screen Component ---

interface RoadmapScreenProps {
  currentUser: string;
  onLogout: () => void;
}

const RoadmapScreen: React.FC<RoadmapScreenProps> = ({ currentUser, onLogout }) => {
    const [completedTasks, setCompletedTasks] = useState<string[]>([]);
    const [justUnlockedDay, setJustUnlockedDay] = useState<number | null>(null);
    const [justCompletedTaskId, setJustCompletedTaskId] = useState<string | null>(null);
    const [dayFullyCompleted, setDayFullyCompleted] = useState<number | null>(null);
    const [lastGate, setLastGate] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);

    const progressKey = `${PROGRESS_KEY_PREFIX}${currentUser}`;

    // useMemo e cálculos derivados devem vir ANTES dos useEffect
    const days = useMemo(() => {
        const groupedByDay: { [key: number]: Task[] } = {};
        for (const task of roadmapData) {
            if (!groupedByDay[task.day]) {
                groupedByDay[task.day] = [];
            }
            groupedByDay[task.day].push(task);
        }
        return Object.entries(groupedByDay).map(([day, tasks]) => ({
            day: parseInt(day),
            tasks,
        }));
    }, []);

    const dayCompletionStatus = useMemo(() => {
        return days.map(({ day, tasks }) => {
            const completedCount = tasks.filter(task => completedTasks.includes(task.id)).length;
            const totalTasks = tasks.length;
            const isCompletedForUnlock = totalTasks > 0 && (completedCount / totalTasks) > 0.75;
            return { day, isCompletedForUnlock };
        });
    }, [days, completedTasks]);

    const totalChakra = useMemo(() => {
        return roadmapData
            .filter(task => completedTasks.includes(task.id))
            .reduce((sum, task) => sum + task.xp, 0);
    }, [completedTasks]);

    const progressPercentage = (completedTasks.length / roadmapData.length) * 100;

    const unlockedGates = useMemo(() => {
        const unlockedGates = [];
        for (let i = 0; i < GATES_CONFIG.length; i++) {
            const gate = GATES_CONFIG[i];
            const isUnlocked = totalChakra >= gate.chakraRequired;
            if (isUnlocked) {
                unlockedGates.push(gate.id);
            }
        }
        return unlockedGates;
    }, [totalChakra]);

    const currentGate = useMemo(() => {
        return unlockedGates.length > 0 ? unlockedGates[unlockedGates.length - 1] : null;
    }, [unlockedGates]);

    // Agora sim, os useEffect podem usar currentGate
    useEffect(() => {
        const savedProgress = localStorage.getItem(progressKey);
        if (savedProgress) {
            setCompletedTasks(JSON.parse(savedProgress));
        }
    }, [progressKey]);

    useEffect(() => {
      // Recupera do localStorage o último portão para o qual o feedback foi mostrado
      const lastFeedbackGate = Number(localStorage.getItem('lastFeedbackGate') || '0');
      if (currentGate && currentGate !== lastGate && currentGate > lastFeedbackGate) {
        setShowFeedback(true);
        setLastGate(currentGate);
        localStorage.setItem('lastFeedbackGate', String(currentGate));
      }
    }, [currentGate, lastGate]);

    const handleToggleTask = useCallback((taskId: string) => {
        const isCompleting = !completedTasks.includes(taskId);
        const newCompletedTasks = isCompleting
            ? [...completedTasks, taskId]
            : completedTasks.filter(id => id !== taskId);

        setCompletedTasks(newCompletedTasks);
        localStorage.setItem(progressKey, JSON.stringify(newCompletedTasks));
        
        if (isCompleting) {
            setJustCompletedTaskId(taskId);
            setTimeout(() => setJustCompletedTaskId(null), 600); 

            const task = roadmapData.find(t => t.id === taskId);
            if (task) {
                const dayOfTask = task.day;
                const tasksForThisDay = roadmapData.filter(t => t.day === dayOfTask);
                const allTasksForDayCompleted = tasksForThisDay.every(t => newCompletedTasks.includes(t.id));
                
                if (allTasksForDayCompleted) {
                    setDayFullyCompleted(dayOfTask);
                    setTimeout(() => setDayFullyCompleted(null), 2000); 
                }
            }
        }
    }, [completedTasks, progressKey]);

    const handleFeedbackClose = useCallback(() => setShowFeedback(false), []);

    const handleReset = useCallback(() => {
        setShowResetModal(true);
    }, []);

    const handleResetConfirm = useCallback(() => {
        localStorage.removeItem(progressKey);
        setCompletedTasks([]);
        setShowResetModal(false);
    }, [progressKey]);

    const handleResetCancel = useCallback(() => {
        setShowResetModal(false);
    }, []);

    return (
        <div className="min-h-screen bg-[--background-dark]">
            <UserPanel 
                currentUser={currentUser} 
                totalChakra={totalChakra} 
                unlockedGates={unlockedGates} 
                currentGate={currentGate} 
                progressPercentage={progressPercentage} 
                onLogout={onLogout}
                onReset={handleReset}
            />
            <UserFeedbackModal
                isOpen={showFeedback}
                onClose={handleFeedbackClose}
                gateId={currentGate || 1}
                gateName={typeof currentGate === 'number' && currentGate > 0 ? GATES_CONFIG[currentGate-1].name : ''}
                gateColor={typeof currentGate === 'number' && currentGate > 0 ? GATES_CONFIG[currentGate-1].color : '#00ffae'}
            />
            <ResetModal
                isOpen={showResetModal}
                onClose={handleResetCancel}
                onConfirm={handleResetConfirm}
            />
            <main className="container mx-auto p-2 sm:p-4">
                <div className="space-y-4 sm:space-y-8">
                    {days.map(({ day, tasks }, index) => {
                        const isLocked = index > 0 ? !dayCompletionStatus[index - 1].isCompletedForUnlock : false;
                        const gateColor = GATES_CONFIG[Math.min(index, GATES_CONFIG.length - 1)].color;
                        return (
                           <DaySection
                                key={day}
                                day={day}
                                tasks={tasks}
                                completedTasks={completedTasks}
                                isLocked={isLocked}
                                isUnlocking={justUnlockedDay === day}
                                onToggleTask={handleToggleTask}
                                isFullyCompleted={dayFullyCompleted === day}
                                justCompletedTaskId={justCompletedTaskId}
                                gateColor={gateColor}
                                completionGifUrl={DAY_COMPLETION_GIFS[index] || DAY_COMPLETION_GIFS[0]}
                            />
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default RoadmapScreen;

<style>{`
@keyframes green-aura {
  0% { box-shadow: 0 0 40px 10px #00ffae; }
  50% { box-shadow: 0 0 80px 30px #00ffae; }
  100% { box-shadow: 0 0 40px 10px #00ffae; }
}
.animate-green-aura { animation: green-aura 2s infinite alternate; }
@keyframes blue-aura {
  0% { box-shadow: 0 0 40px 10px #00bfff; }
  50% { box-shadow: 0 0 80px 30px #00bfff; }
  100% { box-shadow: 0 0 40px 10px #00bfff; }
}
.animate-blue-aura { animation: blue-aura 2s infinite alternate; }
@keyframes red-vapor {
  0% { box-shadow: 0 0 40px 10px #ff0033, 0 0 0 0 #ff0033; opacity: 0.7; }
  50% { box-shadow: 0 0 120px 60px #ff0033, 0 0 40px 20px #ff0033; opacity: 1; }
  100% { box-shadow: 0 0 40px 10px #ff0033, 0 0 0 0 #ff0033; opacity: 0.7; }
}
.animate-red-vapor { animation: red-vapor 2.5s infinite alternate; }
`}</style>