import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Shield, 
  Lock, 
  ArrowRight, 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  Maximize, 
  Search, 
  Bell, 
  LockKeyhole, 
  Settings, 
  FileVideo, 
  Sliders, 
  Users, 
  Database, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Upload, 
  MoreVertical, 
  Sparkles, 
  Compass, 
  FileText, 
  HelpCircle, 
  History, 
  Download, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Eye,
  Settings2,
  Check,
  Smartphone,
  Cpu,
  Tv,
  ListFilter,
  DollarSign,
  Palette,
  Type,
  FileSpreadsheet
} from 'lucide-react';

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface Comment {
  id: string;
  timecode: string;
  author: string;
  role: string;
  avatar: string;
  text: string;
  timestamp: string;
  resolved: boolean;
  replies?: Array<{
    author: string;
    avatar: string;
    text: string;
  }>;
}

interface FileAsset {
  name: string;
  size: string;
  uploadedBy: string;
  duration: string;
  format: string;
  status: 'READY' | 'ERROR' | 'TRANSCODING';
  thumbnailUrl: string;
}

// ==========================================
// FALLBACK METADATA & STATIC DATA
// ==========================================
const FIGMA_LINK = "https://www.figma.com/design/2QZXPAYFtO3FJtqjqHxaVC/sellemi-omar-streaming-client?node-id=0-1&t=BsYyAYuVkq2csAmf-1";
const GITHUB_LINK = "https://github.com/sellemi-omar/cinephase-workspace";

const CLOR_MAPS = [
  { name: 'Primary Premium Gold', hex: '#f2ca50', type: 'Primary / Brand Accent', usage: 'High-level calls to action, premium authentication, secure nodes state.' },
  { name: 'Sable Fixed Dim', hex: '#e9c349', type: 'Accent Variant', usage: 'Interactive states, hover animations, secondary highlighting.' },
  { name: 'Dark Surface Canvas', hex: '#0A0A0A', type: 'Base canvas', usage: 'Deep ambient slate canvas minimizing editing fatigue.' },
  { name: 'Surface Container Low', hex: '#1c1b1b', type: 'Card Background', usage: 'Low-elevation cards, inner side rails, navigation headers.' },
  { name: 'Surface Container High', hex: '#2a2a2a', type: 'Interactive Input', usage: 'Interactive form backgrounds, search inputs, active menus.' },
  { name: 'Technical Film Blue', hex: '#a7caf0', type: 'Secondary Accent', usage: 'Render progress metrics, active timelines, safe streams indicators.' },
  { name: 'MFA Error Red', hex: '#ffb4ab', type: 'System Error', usage: 'Failed transcode, missing hardware auth alerts.' },
];

const TYPOGRAPHY_CHOICES = [
  {
    family: 'Hanken Grotesk',
    role: 'Titre & Identité',
    choice: 'Élégant, contemporain, design suisse géométrique.',
    explanation: 'Utilisé pour de grands titres immersifs de films de post-production et les titres de marque. Transmet l\'autorité d\'un studio haut de gamme.'
  },
  {
    family: 'Inter',
    role: 'Texte d\'interface & Controls',
    choice: 'Hautement lisible, neutre, adapté à toutes les résolutions.',
    explanation: 'Choisi pour toutes les données de formulaires, les commentaires des clients et les titres secondaires. Assure un confort de lecture maximal sur fond noir.'
  },
  {
    family: 'JetBrains Mono',
    role: 'Métadonnées techniques',
    choice: 'Monospace technique, précis, ingénierie informatique.',
    explanation: 'Garantit l\'alignement exact des indicatrices temporelles (Timecodes), des débits binaires, adresses IP cryptées et tailles de fichiers post-produits.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'auth' | 'dashboard' | 'player'>('auth');
  const [showDocModal, setShowDocModal] = useState<boolean>(false);
  const [appRole, setAppRole] = useState<'admin' | 'prod' | 'standard'>('admin');
  
  // Custom toast notification simulation
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-slate-100 font-sans antialiased relative">
      
      {/* Dynamic Toast System */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#254969] border border-[#a7caf0] text-[#cee5ff] rounded-lg px-4 py-3 shadow-[0_0_20px_rgba(167,202,240,0.15)] flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-yellow-300 shrink-0" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* HEADER BAR FOR MASTER SYSTEM SECTIONS */}
      <div className="sticky top-0 z-50 bg-neutral-900/90 backdrop-blur-md border-b border-zinc-800 px-4 py-2 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-[#f2ca50] to-[#e9c349] flex items-center justify-center text-black font-extrabold shadow-[0_0_10px_rgba(242,202,80,0.3)]">
            C
          </div>
          <div className="hidden sm:block">
            <span className="font-semibold text-white tracking-widest text-xs uppercase block">CONSOLE DE GESTION</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-[10px] text-zinc-400 font-mono">SERVEUR SÉCURISÉ ACTIF</span>
            </div>
          </div>
        </div>

        {/* SIMULATED ROLE SELECTOR */}
        <div className="flex items-center gap-1.5 bg-zinc-950/85 border border-zinc-850 rounded-lg p-1">
          <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase px-1.5 hidden xl:inline">ACCRÉDITATION SIMULÉE :</span>
          <button 
            onClick={() => { setAppRole('admin'); showToast("🔓 Accréditation changée : ADMIN (Accès Global)"); }}
            className={`px-2 py-1 rounded text-[10px] font-mono tracking-wider font-semibold transition-all ${appRole === 'admin' ? 'bg-[#f2ca50] text-[#241a00] font-bold shadow-sm' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
          >
            ADMIN
          </button>
          <button 
            onClick={() => { setAppRole('prod'); showToast("💼 Accréditation changée : CHARGÉ DE PRODUCTION (Upload & Transcode)"); }}
            className={`px-2 py-1 rounded text-[10px] font-mono tracking-wider font-semibold transition-all ${appRole === 'prod' ? 'bg-[#254969] text-[#cee5ff] border border-[#a7caf0]/30 font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
          >
            PRODUCER
          </button>
          <button 
            onClick={() => { setAppRole('standard'); showToast("👀 Accréditation changée : STANDARD (Visionnage & Commentaires)"); }}
            className={`px-2 py-1 rounded text-[10px] font-mono tracking-wider font-semibold transition-all ${appRole === 'standard' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
          >
            STANDARD
          </button>
        </div>

        {/* SYSTEM NAVIGATION SELECTOR */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button 
            onClick={() => { setActiveTab('auth'); showToast("Accès au portail Authentification (MFA inclus)"); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide flex items-center gap-1 transition-all ${activeTab === 'auth' ? 'bg-[#f2ca50] text-[#241a00] font-bold shadow-[0_0_10px_rgba(242,202,80,0.2)]' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
          >
            <Lock className="w-3.5 h-3.5" />
            1. Connexion (Secure Gate)
          </button>
          
          <button 
            onClick={() => { setActiveTab('dashboard'); showToast("Navigation vers le dashboard bento de production"); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide flex items-center gap-1 transition-all ${activeTab === 'dashboard' ? 'bg-[#f2ca50] text-[#241a00] font-bold shadow-[0_0_10px_rgba(242,202,80,0.2)]' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
          >
            <Sliders className="w-3.5 h-3.5" />
            2. Dashboard Console
          </button>

          <button 
            onClick={() => { setActiveTab('player'); showToast("Visite du Lecteur Collaboratif"); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide flex items-center gap-1 transition-all ${activeTab === 'player' ? 'bg-[#f2ca50] text-[#241a00] font-bold shadow-[0_0_10px_rgba(242,202,80,0.2)]' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
          >
            <Play className="w-3.5 h-3.5" />
            3. Lecteur & Commentaires
          </button>

          <div className="h-5 w-px bg-zinc-800 hidden sm:block"></div>

          <button 
            onClick={() => { setShowDocModal(true); showToast("Ouverture de la synthèse & devis de facturation PDF..."); }}
            className="px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide flex items-center gap-1.5 bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 active:scale-95 transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            Devis &amp; Synthèse PDF
          </button>
        </div>
      </div>

      {/* RENDER DYNAMIC COMPONENT BASE TABS */}
      <div className="flex-1">
        {activeTab === 'auth' && <AuthView showToast={showToast} setActiveTab={setActiveTab} />}
        {activeTab === 'dashboard' && <DashboardView showToast={showToast} setShowDocModal={setShowDocModal} appRole={appRole} setActiveTab={setActiveTab} />}
        {activeTab === 'player' && <PlayerView showToast={showToast} />}
      </div>

      {/* DOCUMENTATION & INVOICE MODAL BACKED FOR PDF SAVER */}
      {showDocModal && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md overflow-y-auto p-4 md:p-8 flex justify-center items-start">
          <div className="relative w-full max-w-7xl bg-[#0A0A0A] border border-zinc-850 rounded-2xl shadow-2xl p-4 md:p-6 my-8 animate-fade-in print:p-0 print:m-0 print:border-0 print:bg-white print:shadow-none">
            {/* Modal dismisser */}
            <button 
              onClick={() => setShowDocModal(false)}
              className="absolute top-4 right-4 z-50 px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-red-500 rounded-lg text-xs font-mono text-zinc-400 hover:text-white transition-all cursor-pointer print:hidden"
            >
              Fermer (Echap)
            </button>
            <SpecSystemAndInvoice showToast={showToast} closeMod={() => setShowDocModal(false)} />
          </div>
        </div>
      )}

      {/* PORTAL FOOTER */}
      <footer className="bg-neutral-950 border-t border-zinc-800 py-8 px-6 text-sm text-zinc-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-[#f2ca50] fill-[#f2ca50]/20" />
              <span className="font-bold tracking-widest text-[#f2ca50] text-lg font-headline">CINEPHASE</span>
            </div>
            <p className="text-xs text-zinc-500 font-mono">PLATEFORME MULTIPRESTATAIRE SÉCURISÉE MULTI-COULEURS</p>
          </div>

          {/* Useful development references */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 lg:gap-8 text-xs font-mono">
            <a 
              href={FIGMA_LINK} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-zinc-900 border border-zinc-800 hover:border-[#f2ca50] text-zinc-300 hover:text-white px-3 py-2 rounded flex items-center gap-1.5 transition-all"
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
              <span>MAQUETTE FIGMA REFERENCE</span>
              <ExternalLink className="w-3 h-3 text-zinc-500" />
            </a>

            <a 
              href={GITHUB_LINK} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-zinc-900 border border-zinc-800 hover:border-sky-400 text-zinc-300 hover:text-white px-3 py-2 rounded flex items-center gap-1.5 transition-all"
            >
              <Cpu className="w-3.5 h-3.5 text-sky-400" />
              <span>DÉPÔT GITHUB SOURCE</span>
              <ExternalLink className="w-3 h-3 text-zinc-500" />
            </a>


          </div>
          
          <div className="text-center md:text-right text-xs text-zinc-500">
            <p>© 2026 Cinephase Workspace</p>
            <p className="text-[10px] font-mono mt-1 text-zinc-600">Conçu et développé par Sellemi Omar - Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ==========================================
// 1. VIEW: IDENTITY GATEWAYS (LOGIN / MFA)
// ==========================================
function AuthView({ showToast, setActiveTab }: { showToast: (msg: string) => void, setActiveTab: (tab: any) => void }) {
  const [authStep, setAuthStep] = useState<'login' | 'mfa'>('login');
  const [email, setEmail] = useState('sell.omar@cinephase-studios.com');
  const [password, setPassword] = useState('••••••••••••••••••••');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  const handleOtpChange = (val: string, index: number) => {
    if (isNaN(Number(val))) return;
    const nextDigits = [...otpDigits];
    nextDigits[index] = val;
    setOtpDigits(nextDigits);

    // Auto focus next
    if (val !== '' && index < 5) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && otpDigits[index] === '' && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const executeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Identifiants validés. Lancement de la vérification MFA.");
    setAuthStep('mfa');
  };

  const executeVerify = () => {
    setIsVerifying(true);
    showToast("Vérification de la clé OTP matérielle...");
    
    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);
      showToast("🔐 MFA Réussi ! Initialisation de la session.");
      
      setTimeout(() => {
        setActiveTab('dashboard');
      }, 1200);
    }, 1800);
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center p-6 bg-gradient-to-b from-black to-zinc-950 overflow-hidden">
      
      {/* Cinematic Server Room Background image (Low Opacity) resembling Figma mockup atmosphere */}
      <div className="absolute inset-0 opacity-15 pointer-events-none transition-all duration-1000">
        <img 
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop" 
          alt="Server room background" 
          className="w-full h-full object-cover scale-105 filter blur-3xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-[480px]">
        {/* Branding header in Golden Theme */}
        <div className="flex flex-col items-center mb-10 text-center animate-fade-in">
          <div className="mb-3 flex items-center gap-3">
            <Shield className="w-12 h-12 text-[#f2ca50] fill-[#f2ca50]/20 animate-pulse drop-shadow-[0_0_15px_rgba(242,202,80,0.4)]" />
            <h1 className="font-headline text-3xl font-extrabold tracking-widest text-[#f2ca50]">CINEPHASE</h1>
          </div>
          <p className="font-mono text-[10px] text-amber-500 uppercase tracking-[0.3em]">ENTERPRISE SECURE GATEWAY</p>
        </div>

        {/* Auth Glass Box with scanning dynamic lines (Anim. CSS) */}
        <div className="bg-[#121212]/85 backdrop-blur-xl border border-zinc-800 rounded-xl overflow-hidden shadow-2xl relative p-8 md:p-10">
          
          {/* Cyber scanner animation bar line */}
          <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#f2ca50] to-transparent animate-scanner"></div>

          {authStep === 'login' ? (
            <div className="space-y-6">
              <div className="space-y-1.5">
                <h2 className="text-xl font-bold text-white tracking-wide">Accès d'Identité</h2>
                <p className="text-xs text-zinc-400">Présentez vos identifiants agréés Cinephase.</p>
              </div>

              <form onSubmit={executeLogin} className="space-y-6">
                <div>
                  <label className="block text-[11px] font-mono tracking-wider text-amber-500/80 mb-2 uppercase">ADRESSE EMAIL COMPAGNIE</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#1c1b1b] border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f2ca50] focus:ring-1 focus:ring-[#f2ca50] transition-all"
                      placeholder="name@cinephase-studios.com"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 font-mono text-sm">@</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[11px] font-mono tracking-wider text-amber-500/80 uppercase">MOT DE PASSE SÉCURISÉ</label>
                    <a href="#recover" onClick={(e) => { e.preventDefault(); showToast("Code de recouvrement envoyé à l'administrateur système."); }} className="text-[10px] font-bold text-[#f2ca50] hover:underline uppercase">RECOUVRER</a>
                  </div>
                  <div className="relative">
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#1c1b1b] border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f2ca50] focus:ring-1 focus:ring-[#f2ca50] transition-all"
                      placeholder="••••••••••••"
                    />
                    <LockKeyhole className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#f2ca50] hover:bg-[#e9c349] text-[#241a00] font-bold py-4 rounded-lg tracking-widest text-xs hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <span>MÉTHODE D'AUTHENTIFICATION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
                  <h2 className="text-xl font-bold text-white tracking-wide">Vérification double facteur (MFA)</h2>
                </div>
                <p className="text-xs text-zinc-400">Saisissez les 6 chiffres générés par votre clé cryptographique ou application d'authentification.</p>
              </div>

              {/* Number codes grids inputs */}
              <div className="flex justify-between gap-2 py-3">
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={otpRefs[idx]}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                    className="w-12 h-14 bg-[#1c1b1b] border border-zinc-800 rounded-lg text-center text-xl font-bold text-[#f2ca50] focus:outline-none focus:ring-2 focus:ring-[#f2ca50] transition-all font-mono"
                  />
                ))}
              </div>

              <div className="space-y-4">
                {isSuccess ? (
                  <button 
                    disabled
                    className="w-full bg-emerald-600 text-white font-bold py-4 rounded-lg tracking-widest text-xs flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4 text-white" />
                    <span>SESSION RECONNUE AVEC SUCCÈS</span>
                  </button>
                ) : (
                  <button 
                    onClick={executeVerify}
                    disabled={isVerifying || otpDigits.includes('')}
                    className={`w-full py-4 rounded-lg tracking-widest text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      otpDigits.includes('') 
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                      : 'bg-[#f2ca50] hover:bg-[#e9c349] text-[#241a00] hover:brightness-110 active:scale-[0.98]'
                    }`}
                  >
                    {isVerifying ? (
                      <>
                        <div className="w-4 h-4 border-2 border-amber-950 border-t-amber-400 rounded-full animate-spin"></div>
                        <span>VÉRIFICATION EN COURS...</span>
                      </>
                    ) : (
                      <span>VÉRIFIER &amp; INITIALISER SESSION</span>
                    )}
                  </button>
                )}

                <button 
                  onClick={() => setAuthStep('login')}
                  className="w-full text-center text-xs font-mono text-zinc-400 hover:text-white flex items-center justify-center gap-1 py-1 hover:underline"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Retour à l'écran précédent
                </button>
              </div>

              {/* Secure Hardware Metadata */}
              <div className="border-t border-zinc-800/60 pt-4 flex flex-col items-center gap-1 text-[9px] font-mono text-zinc-500 text-center">
                <p>TERMINAL VÉRIFIÉ : MACBOOK PRO 16" (POST-PROD_LINE_04)</p>
                <p>ADDR. IP : 192.168.1.104 (TUNNEL CHIFREMENT DES-256)</p>
              </div>
            </div>
          )}

        </div>

        {/* Footer secure label notice matching mockups */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-[#201f1f]/50 border border-zinc-800 rounded-full">
            <Shield className="w-3.5 h-3.5 text-[#f2ca50] fill-[#f2ca50]/20" />
            <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-300">SYSTEME DOUBLE FACTEUR ACTIF</span>
          </div>
          <p className="text-center text-zinc-500 text-[10px] max-w-sm font-mono leading-relaxed">
            L'accès à ce portail hautement sécurisé est restreint aux monteurs et coloristes mandatés. Historique des connexions tracé en continu.
          </p>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 2. VIEW: WORKSPACE DASHBOARD (BENTO GRID)
// ==========================================
function DashboardView({ 
  showToast, 
  setShowDocModal, 
  appRole = 'admin',
  setActiveTab 
}: { 
  showToast: (msg: string) => void;
  setShowDocModal: (val: boolean) => void;
  appRole?: 'admin' | 'prod' | 'standard';
  setActiveTab: (tab: 'auth' | 'dashboard' | 'player') => void;
}) {
  // Mock listing matching Figma exact values
  const assets: FileAsset[] = [
    { name: 'Sable et Étoiles (Cycles Réf. UHD)', size: '22.4 GB', uploadedBy: 'Sellemi Omar', duration: '02:10:00', format: 'DCP MASTER • 5.1 AUDIO', status: 'READY', thumbnailUrl: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=200' },
    { name: 'Cinematique_Intro_Final_V2.mxf', size: '4.2 GB', uploadedBy: 'Post-Prod Admin', duration: '00:12:44', format: 'ProRes 422 HQ • 24 FPS', status: 'READY', thumbnailUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=200' },
    { name: 'City_Lights_B-Roll_Master.mov', size: '12.8 GB', uploadedBy: 'Monteur 03', duration: '01:05:20', format: 'H.264 / MP4', status: 'ERROR', thumbnailUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=200' },
    { name: 'Vitesse_Terminal_Act_1.mp4', size: '8.4 GB', uploadedBy: 'Sellemi Omar', duration: '00:45:30', format: 'H.265 • 4K UHD', status: 'TRANSCODING', thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200' },
  ];

  const [encodes, setEncodes] = useState([
    { filename: 'Master_Final_v4.mxf', progress: 75, bitrate: 'HEVC Main 10 @ 45Mbps', status: 'Transcoding...' },
    { filename: 'Trailer_B_Recut.mp4', progress: 100, bitrate: 'H.264 High @ 15Mbps', status: 'Ready' },
    { filename: 'Teaser_Trailer_ProRes.mov', progress: 12, bitrate: 'ProRes 4444 XQ', status: 'Failed: E_O_DISK' }
  ]);

  // Standard interactive user feedbacks (Mentions + Comments log panel)
  const standardComments = [
    {
      id: "std_1",
      videoName: "Sable et Étoiles (Cycles Réf. UHD)",
      timecode: "00:42:15:12",
      text: "Vérifier l'audio track 2 sur ce passage, j'entends un léger décalage sur le canal central gauche.",
      type: "Posté par moi",
      date: "À l'instant",
      status: "VFX REVISION",
      author: "Sellemi Omar (Client)",
      role: "Directeur Créatif VFX",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50"
    },
    {
      id: "std_2",
      videoName: "Cinematique_Intro_Final_V2.mxf",
      timecode: "00:12:45:10",
      text: "Le contraste sur ce plan semble trop élevé par rapport à la séquence précédente. Ajuster Dolby Vision tier.",
      type: "Mentionné par l'équipe",
      date: "Il y a 2 heures",
      status: "COLOR REVIEW",
      author: "Marie Lefebvre",
      role: "Superviseuse Dolby Vision",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50"
    },
    {
      id: "std_3",
      videoName: "City_Lights_B-Roll_Master.mov",
      timecode: "01:05:22:00",
      text: "Artefact de compression visible sur les noirs profonds. Rehausser le bitrate d'export H.264.",
      type: "Posté par moi",
      date: "Hier",
      status: "RÉSOLU",
      author: "Sophie Chen",
      role: "Étalonneuse Sénior",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50"
    }
  ];

  useEffect(() => {
    // Simulate transcode progress
    const timer = setInterval(() => {
      setEncodes(prev => prev.map(enc => {
        if (enc.status === 'Transcoding...') {
          const nextProg = enc.progress + 3;
          return {
            ...enc,
            progress: nextProg >= 100 ? 100 : nextProg,
            status: nextProg >= 100 ? 'Ready' : 'Transcoding...'
          };
        }
        return enc;
      }));
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const [dragActive, setDragActive] = useState(false);
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      showToast(`Fichier "${e.dataTransfer.files[0].name}" reçu. Lancement du scanner antivirus & transcodage.`);
    }
  };

  const launchVideoPlayer = (vidName: string, timecode?: string) => {
    showToast(`Chargement de la timeline pour "${vidName}" ${timecode ? `au timecode ${timecode}` : ''}`);
    setActiveTab('player');
  };

  return (
    <div className="flex bg-[#0A0A0A] text-slate-200">
      
      {/* Side drawer bar layout matching Figma UI - Adaptative items according to appRole */}
      <aside className="w-64 bg-[#1c1b1b] border-r border-zinc-800 shrink-0 min-h-[90vh] hidden md:flex flex-col p-4 gap-4">
        <div className="px-2 py-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${appRole === 'admin' ? 'bg-amber-400 animate-pulse' : appRole === 'prod' ? 'bg-sky-400' : 'bg-emerald-400'}`}></span>
            <h2 className="text-sm font-bold tracking-widest text-[#f2ca50] font-headline uppercase">CINEPHASE</h2>
          </div>
          <p className="text-[9px] font-mono text-zinc-500 uppercase mt-1">
            {appRole === 'admin' ? 'Console Super-Admin' : appRole === 'prod' ? 'Accès Producteur' : 'Espace Client (Standard)'}
          </p>
        </div>

        <nav className="space-y-1 text-xs">
          <a href="#dash" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-mono tracking-wider transition-all ${
            appRole === 'standard' 
            ? 'bg-emerald-950/25 border border-emerald-500/10 text-emerald-400 font-bold' 
            : appRole === 'prod'
            ? 'bg-sky-950/25 border border-sky-500/10 text-sky-400 font-bold'
            : 'bg-[#254969] text-[#cee5ff] font-bold'
          }`}>
            <Sliders className={`w-4 h-4 ${appRole === 'standard' ? 'text-emerald-400' : 'text-[#f2ca50]'}`} />
            <span className="uppercase tracking-wider">
              {appRole === 'standard' ? 'ESPACE CLIENT' : appRole === 'prod' ? 'DASHBOARD PROD' : 'DASHBOARD ADMIN'}
            </span>
          </a>

          <a 
            href="#vids" 
            onClick={(e) => { e.preventDefault(); showToast("Affichage de la vidéothèque complète."); }} 
            className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:bg-zinc-900 rounded-lg transition-all"
          >
            <FileVideo className="w-4 h-4 text-zinc-500" />
            <span className="uppercase tracking-wider font-mono">BIBLIOTHÈQUE ({assets.length})</span>
          </a>

          {/* Show full features for Admin and Producer only */}
          {appRole !== 'standard' && (
            <>
              <a 
                href="#trans" 
                onClick={(e) => { e.preventDefault(); showToast("Historique de transcodage de flux."); }} 
                className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:bg-zinc-900 rounded-lg transition-all"
              >
                <Cpu className="w-4 h-4 text-zinc-500" />
                <span className="uppercase tracking-wider font-mono">FLUX TRANSCODE</span>
              </a>
              <a 
                href="#team" 
                onClick={(e) => { e.preventDefault(); showToast("Gestion des accès monteurs & coloristes."); }} 
                className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:bg-zinc-900 rounded-lg transition-all"
              >
                <Users className="w-4 h-4 text-zinc-500" />
                <span className="uppercase tracking-wider font-mono">ÉQUIPE ({appRole === 'admin' ? '12' : '4'})</span>
              </a>
            </>
          )}

          <button 
            type="button"
            onClick={() => { setShowDocModal(true); showToast("Ouverture de la synthèse & devis de facturation PDF..."); }}
            className="w-full text-left flex items-center gap-3 px-3 py-2.5 text-amber-500 hover:bg-zinc-900 rounded-lg transition-all cursor-pointer font-semibold"
          >
            <FileText className="w-4 h-4 text-amber-500" />
            <span className="uppercase tracking-wider font-mono font-bold">DEVIS TECHNIQUE PDF</span>
          </button>
        </nav>

        {/* Drop zone shortcut inside sidebar menu - Hidden for Standard Standard clients */}
        {appRole !== 'standard' ? (
          <div className="mt-auto p-4 bg-[#201f1f] rounded-xl border border-zinc-850 text-center space-y-3">
            <Upload className="w-6 h-6 text-[#f2ca50] mx-auto animate-bounce" />
            <p className="text-[10px] font-mono text-zinc-400">Glissez-déposez un nouveau fichier vidéo ProPres ici</p>
            <button 
              onClick={() => showToast("Sélecteur de fichiers système initialisé.")} 
              className="w-full py-1.5 bg-[#f2ca50] text-[#241a00] text-[10px] font-bold rounded hover:bg-[#e9c349] transition-colors"
            >
              PARCOURIR
            </button>
          </div>
        ) : (
          <div className="mt-auto p-4 bg-zinc-950/80 rounded-xl border border-zinc-900 text-center space-y-2">
            <Shield className="w-5 h-5 text-emerald-500 mx-auto" />
            <p className="text-[9.5px] font-mono text-zinc-400 leading-snug">ACCÈS EN LECTURE SEULE SÉCURISÉ</p>
            <p className="text-[8px] text-zinc-650 leading-relaxed font-mono">Identité watermarquée avec surveillance IP</p>
          </div>
        )}
      </aside>

      {/* Main Dashboard Panel Body */}
      <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto space-y-6">
        
        {/* Top welcome status layout */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800/60">
          <div>
            <h1 className="text-2xl font-bold font-headline text-white tracking-tight">
              {appRole === 'standard' ? "Espace Client Collaboratif" : appRole === 'prod' ? "Console de Production" : "Console de Supervision Administrateur"}
            </h1>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              {appRole === 'standard' 
                ? "Compte Externe : STUDIO CINEPHASE ASSOCIÉS • Accès Standard" 
                : appRole === 'prod'
                ? "Production : 4 Noeuds actifs • Droits de gestion limités"
                : "Super-Admin : 12 Noeuds actifs • Tâches de parallélisation Eevee/Cycles actives"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${appRole === 'standard' ? 'bg-sky-500' : 'bg-emerald-500'}`}></span>
            <span className={`text-xs font-mono font-bold uppercase ${appRole === 'standard' ? 'text-sky-400' : 'text-emerald-400'}`}>
              {appRole === 'standard' ? "MFA CHRONOLOGIE EN CLASSE : ACTIF" : "TOUS LES SYSTÈMES D'ENCODAGE OPÉRATIONNELS"}
            </span>
          </div>
        </div>

        {/* Dynamic Warning Notification for standard Clients */}
        {appRole === 'standard' && (
          <div className="bg-[#121614] border border-emerald-500/20 p-4 rounded-xl flex items-start gap-3">
            <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-zinc-300 space-y-1">
              <strong className="text-emerald-400 uppercase font-mono tracking-wide">AVERTISSEMENT SÉCURITÉ CONFORME :</strong>
              <p className="leading-relaxed">
                Afin de prémunir toute fuite ou recodage de nos œuvres protégées, un filigrane mobile transparent intégrant votre identifiant <strong className="text-white">J.Dupont@cinephase.com</strong> ainsi que votre adresse IP de session sera incrusté de façon dynamique et permanente sur l'ensemble du flux d’étalonnage.
              </p>
            </div>
          </div>
        )}

        {/* Main Bento Blocks layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {appRole !== 'standard' ? (
            <>
              {/* Bento Item 1: Storage gauge with secure RAID array details matching Figma */}
              <div className="md:col-span-1 bg-[#121212]/90 border border-zinc-850 p-6 rounded-xl flex flex-col justify-between space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-mono tracking-widest text-[#f2ca50] uppercase">Stockage Cloud Raid NAS</span>
                  <Database className="w-5 h-5 text-sky-400" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-4xl font-extrabold text-white tracking-tight">8.2 <span className="text-xs font-normal text-zinc-500 uppercase">TB utilisés</span></span>
                    <span className="text-xs text-zinc-400 font-mono">/ 15 TB Totaux</span>
                  </div>
                  <div className="h-2 w-full bg-[#1c1b1b] border border-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-sky-450 via-sky-300 to-[#f2ca50] rounded-full" style={{ width: '54.6%' }}></div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono pt-1">
                    <span>RÉPARTITION : RAID 6 DIRECT-SAFE</span>
                    <span className="text-emerald-400">INTÈGRITÉ 100%</span>
                  </div>
                </div>
              </div>

              {/* Bento Item 2: Safe Dropping File Zone */}
              <div 
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`md:col-span-1 p-6 rounded-xl border flex flex-col justify-between space-y-4 transition-all duration-300 ${
                  dragActive 
                  ? 'bg-[#1c1a16] border-[#f2ca50] shadow-[0_0_15px_rgba(242,202,80,0.15)] scale-[1.01]' 
                  : 'bg-[#121212] border-zinc-850 hover:border-zinc-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-mono tracking-widest text-emerald-500 uppercase">DÉPÔT PRORES ACCÉLÉRÉ</span>
                  <Upload className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="py-2 text-center">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-850 flex items-center justify-center mx-auto mb-2">
                    <Database className="w-5 h-5 text-[#f2ca50] animate-pulse" />
                  </div>
                  <p className="text-xs text-zinc-300 font-medium">Glissez vos Rushs ou DCP exportés</p>
                  <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Taille limite de fichier : 500 Go</p>
                </div>
              </div>

              {/* Bento Item 3: Active colorists/team session list matching Figma */}
              <div className="md:col-span-1 bg-[#121212] border border-zinc-850 p-6 rounded-xl flex flex-col justify-between space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-mono tracking-widest text-[#f2ca50] uppercase font-bold">Collaborateurs actifs</span>
                  <Users className="w-4 h-4 text-[#f2ca50]" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 bg-[#1c1b1b]/80 border border-zinc-800 rounded">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop" 
                      alt="Anya" 
                      className="w-7 h-7 rounded-full border border-zinc-800"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-zinc-200 truncate">Anya Petrova</p>
                      <p className="text-[10px] text-[#f2ca50] font-mono">Coloriste Étalonneuse</p>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                  </div>

                  <div className="flex items-center gap-3 p-2 bg-[#1c1b1b]/80 border border-zinc-800 rounded">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop" 
                      alt="Omar" 
                      className="w-7 h-7 rounded-full border border-zinc-800"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-zinc-200 truncate">Sellemi Omar</p>
                      <p className="text-[10px] text-sky-400 font-mono">Directeur Créatif VFX</p>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* STANDARD USER BENTO 1: Client Profiling */}
              <div className="md:col-span-1 bg-[#121212] border border-zinc-850 p-6 rounded-xl flex flex-col justify-between space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-mono tracking-widest text-[#f2ca50] uppercase font-bold">Mon Accréditation</span>
                  <Shield className="w-4 h-4 text-[#f2ca50]" />
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-zinc-200 text-sm font-bold">STUDIO CINEPHASE ASSOCIÉS</h3>
                    <p className="text-[11px] text-zinc-450 font-mono mt-0.5">J.Dupont@cinephase.com</p>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-850 p-2 rounded text-[10px] font-mono">
                    <span className="text-emerald-400 font-bold block">● SESSION CONFORME</span>
                    <span className="text-zinc-500">MFA authentifié à l'instant</span>
                  </div>
                  <button 
                    onClick={() => launchVideoPlayer("Sable et Étoiles (Cycles Réf. UHD)")}
                    className="w-full py-2 bg-[#f2ca50]/15 border border-[#f2ca50]/30 hover:bg-[#f2ca50]/25 text-[#f2ca50] font-bold text-xs rounded transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="w-3.5 h-3.5 fill-[#f2ca50]" />
                    <span>OUVRIR LE LECTEUR</span>
                  </button>
                </div>
              </div>

              {/* STANDARD USER BENTO 2: Comments Statistics to justify reviewer efforts */}
              <div className="md:col-span-1 bg-[#121212] border border-zinc-850 p-6 rounded-xl flex flex-col justify-between space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-mono tracking-widest text-sky-450 uppercase font-bold">Activités de Revues</span>
                  <Sliders className="w-4 h-4 text-sky-450" />
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-[#181818] border border-zinc-850 p-2.5 rounded">
                      <span className="text-2xl font-bold text-white block">3</span>
                      <span className="text-[9px] text-zinc-500 uppercase font-mono">COMMENTAIRES</span>
                    </div>
                    <div className="bg-[#181818] border border-zinc-850 p-2.5 rounded">
                      <span className="text-2xl font-bold text-emerald-400 block">1</span>
                      <span className="text-[9px] text-zinc-500 uppercase font-mono">RÉSOLU</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                      <span>Taux de relecture :</span>
                      <span className="text-white font-bold">100%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-900 border border-zinc-850 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* STANDARD USER BENTO 3: Help / Reference Guides */}
              <div className="md:col-span-1 bg-[#121212] border border-zinc-850 p-6 rounded-xl flex flex-col justify-between space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase font-bold">Guide Rapide</span>
                  <HelpCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="space-y-2 text-xs text-zinc-400 leading-relaxed font-sans">
                  <p>Utilisez les raccourcis clés sur le player :</p>
                  <ul className="text-[10px] font-mono space-y-1 text-zinc-200 list-disc list-inside">
                    <li><kbd className="bg-zinc-800 px-1 rounded">Espace</kbd> : Play / Pause</li>
                    <li><kbd className="bg-zinc-800 px-1 rounded">Echap</kbd> : Quitter le zoom</li>
                    <li><kbd className="bg-zinc-800 px-1 rounded">⬅ ➡</kbd> : Saut de 10s</li>
                  </ul>
                  <button 
                    onClick={() => { setShowDocModal(true); showToast("Ouverture des spécifications techniques de Cinephase"); }}
                    className="text-[10.5px] text-[#f2ca50] hover:underline font-bold block"
                  >
                    Voir mon cahier des charges →
                  </button>
                </div>
              </div>
            </>
          )}

        </div>

        {/* Horizontal Scroll Récemment Ajoutés Section matching Figma layout */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold font-headline text-white tracking-tight flex items-center gap-2">
              <FileVideo className="w-5 h-5 text-[#f2ca50]" />
              <span>
                {appRole === 'standard' ? "Livrables Vidéos assignés à ma validation" : "Derniers livrables de post-production validés"}
              </span>
            </h3>
            <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded select-none uppercase">
              {appRole === 'standard' ? "Visionnage Standard Agréé" : "RÉVISION DU LOG GLOBAL"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {assets.map((asset, idx) => (
              <div 
                key={idx} 
                onClick={() => {
                  if (asset.status === 'READY') {
                    launchVideoPlayer(asset.name);
                  } else {
                    showToast(`⚠️ Ce fichier (${asset.name}) a le statut : ${asset.status}`);
                  }
                }}
                className={`bg-[#121212] border border-zinc-850 rounded-xl overflow-hidden group hover:border-[#f2ca50] transition-all relative cursor-pointer ${asset.status === 'READY' ? 'hover:scale-[1.01] hover:shadow-[0_4px_20px_rgba(242,202,80,0.1)]' : 'opacity-80'}`}
              >
                {/* 16:9 Thumbnail aspect ratios as designed in Figma */}
                <div className="aspect-video w-full bg-zinc-900 relative overflow-hidden">
                  <img 
                    src={asset.thumbnailUrl} 
                    alt={asset.name} 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Status Indicator overlay */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold tracking-wider ${
                      asset.status === 'READY' ? 'bg-zinc-950/90 border border-emerald-500 text-emerald-400' :
                      asset.status === 'ERROR' ? 'bg-zinc-950/90 border border-rose-500 text-rose-400' :
                      'bg-zinc-950/90 border border-amber-500 text-amber-400 animate-pulse'
                    }`}>
                      {asset.status}
                    </span>
                  </div>

                  {asset.status === 'READY' && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-8 h-8 text-[#f2ca50] fill-[#f2ca50]" />
                    </div>
                  )}

                  <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded font-mono text-[9px] text-zinc-300">
                    {asset.duration}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h4 className="text-xs font-bold text-white truncate max-w-full hover:text-[#f2ca50] transition-colors">{asset.name}</h4>
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                    <span>{asset.format}</span>
                    <span className="text-zinc-500">{asset.size}</span>
                  </div>
                  <div className="pt-2 border-t border-zinc-900 flex justify-between items-center text-[9px] text-zinc-500">
                    <span>{appRole === 'standard' ? "Accès autorisé" : "Téléversé par :"}</span>
                    <span className="text-zinc-450">{appRole === 'standard' ? "Lecteur standard" : asset.uploadedBy}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONDITIONAL SECTIONS BASED ON SELECTED ROLE */}
        {appRole === 'standard' ? (
          
          /* ========================================================
             DASHBOARD DE RETOURS (CENTRALISANT "MES MENTIONS" ET "MES COMMENTAIRES POSTÉS")
             ======================================================== */
          <div className="bg-[#121212]/95 border border-zinc-850 rounded-xl overflow-hidden shadow-lg animate-fadeIn">
            <div className="p-5 border-b border-zinc-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#161616]">
              <div>
                <h3 className="text-sm font-bold tracking-wider text-[#f2ca50] font-headline uppercase flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#f2ca50]" />
                  <span>DASHBOARD DE RETOURS : Mes Mentions &amp; Commentaires</span>
                </h3>
                <p className="text-[11px] text-zinc-450 font-mono mt-0.5">
                  Page centralisant vos signalements horodatés ainsi que les mentions requérant votre relecture
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 rounded text-[9.5px] font-mono uppercase font-bold">
                  SÉJOUR COLLABORATIF CLIENT
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[750px] border-collapse">
                <thead>
                  <tr className="bg-[#1c1b1b] border-b border-zinc-900 text-zinc-500 font-mono uppercase text-[10px] tracking-wider">
                    <th className="px-6 py-4 font-bold">FICHIER ASSOCIÉ</th>
                    <th className="px-6 py-4 font-bold">TIMECODE</th>
                    <th className="px-6 py-4 font-bold">TYPE / CONTEXTE</th>
                    <th className="px-6 py-4 font-bold">AUTEUR SOURCE</th>
                    <th className="px-6 py-4 font-bold">CONTENU DE L'ANNOTATION DE POST-PROD</th>
                    <th className="px-6 py-4 font-bold text-center">STATUT ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900/65 font-mono text-[11px]">
                  {standardComments.map((com) => (
                    <tr key={com.id} className="hover:bg-zinc-900/60 transition-colors">
                      <td className="px-6 py-4 text-white font-bold max-w-[150px] truncate">
                        {com.videoName}
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => launchVideoPlayer(com.videoName, com.timecode)}
                          className="px-2 py-1 bg-[#f2ca50]/10 hover:bg-[#f2ca50]/20 text-[#f2ca50] border border-[#f2ca50]/30 rounded text-[10px] font-bold flex items-center gap-1 hover:scale-105 transition-all"
                        >
                          <Clock className="w-3 h-3 text-[#f2ca50]" />
                          <span>{com.timecode}</span>
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-[9.5px] font-mono uppercase font-bold border ${
                          com.type.includes('Posté') 
                          ? 'bg-zinc-900/80 border-zinc-800 text-zinc-300' 
                          : 'bg-sky-950/20 border-sky-500/30 text-sky-400'
                        }`}>
                          {com.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <img src={com.avatar} alt="Avatar" className="w-5 h-5 rounded-full border border-zinc-800" />
                          <div>
                            <span className="text-zinc-200 font-bold block leading-none">{com.author}</span>
                            <span className="text-[9px] text-zinc-500">{com.role}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-zinc-350 max-w-[280px] font-sans text-xs leading-normal">
                        "{com.text}"
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded text-[9px] font-bold uppercase ${
                          com.status === 'RÉSOLU' 
                          ? 'bg-emerald-950/30 border border-emerald-500/40 text-emerald-400' 
                          : com.status.includes('VFX')
                          ? 'bg-amber-950/30 border border-amber-500/40 text-amber-500'
                          : 'bg-sky-950/30 border border-sky-500/40 text-sky-400'
                        }`}>
                          {com.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 bg-zinc-950 text-center border-t border-zinc-900">
              <p className="text-[10px] text-zinc-500 font-mono">
                💡 Cliquez sur n’importe quel <strong className="text-zinc-300">Timecode</strong> ou vignette vidéo ci-dessus pour lancer automatiquement la lecture à l’instant de retransmission exacte !
              </p>
            </div>
          </div>

        ) : (
          
          /* ========================================================
             ADMINISTRATIVE SECTIONS (GPU TRANSCODINGS & REAL-TIME LOGS)
             ======================================================== */
          <>
            {/* Real-time file processing queues list matching Figma schema exactly */}
            <div className="bg-[#121212]/95 border border-zinc-850 rounded-xl overflow-hidden shadow-lg animate-fadeIn">
              <div className="p-5 border-b border-zinc-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#161616]">
                <div>
                  <h3 className="text-sm font-bold tracking-wider text-[#f2ca50] font-headline uppercase">File de traitement multimédia</h3>
                  <p className="text-[11px] text-zinc-400 font-mono mt-0.5">Statut de la file en tâche de fond GPU cluster-14</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-amber-950/40 border border-amber-500/30 text-amber-400 rounded text-[9.5px] font-mono uppercase">
                    Priorité Élevée Active
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[600px] border-collapse">
                  <thead>
                    <tr className="bg-[#1c1b1b] border-b border-zinc-900 text-zinc-500 font-mono uppercase text-[10px] tracking-wider">
                      <th className="px-6 py-3.5 font-bold">NOM DU RUSH VECTEUR</th>
                      <th className="px-6 py-3.5 font-bold">AVANCEMENT</th>
                      <th className="px-6 py-3.5 font-bold">DÉBIT BINAIRE</th>
                      <th className="px-6 py-3.5 font-bold">STATUT DU PROCESSEUR CID CODES</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900/65 font-mono text-[11px]">
                    {encodes.map((enc, idx) => (
                      <tr key={idx} className="hover:bg-zinc-900/60 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <FileVideo className={`w-4 h-4 shrink-0 ${enc.status.includes('Failed') ? 'text-rose-400' : 'text-[#f2ca50]'}`} />
                            <span className="font-bold text-white tracking-wide">{enc.filename}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3 max-w-[240px]">
                            <div className="flex-1 h-1.5 bg-zinc-900/80 rounded-full overflow-hidden border border-zinc-850">
                              <div 
                                className={`h-full rounded-full transition-all duration-1000 ${
                                  enc.status.includes('Failed') ? 'bg-rose-500' : 
                                  enc.progress === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-500 to-[#f2ca50]'
                                }`} 
                                style={{ width: `${enc.progress}%` }}
                              ></div>
                            </div>
                            <span className={`font-bold ${enc.status.includes('Failed') ? 'text-rose-400' : 'text-zinc-200'}`}>
                              {enc.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-zinc-400">
                          {enc.bitrate}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            enc.status === 'Ready' ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-400' :
                            enc.status.includes('Failed') ? 'bg-rose-950/20 border-rose-500/40 text-rose-400' :
                            'bg-amber-950/20 border-amber-500/40 text-amber-400 animate-pulse'
                          }`}>
                            {enc.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Embedded Terminal realtime log panel */}
            <div className="bg-black border border-zinc-850/80 rounded-xl p-5 space-y-3 shadow-inner">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-2.5">
                <span className="text-[10px] font-mono tracking-widest text-[#f2ca50] font-bold uppercase">Journal système temps réel (Cycles Render Tracker)</span>
                <div className="flex items-center gap-2 text-zinc-500 font-mono text-[10px]">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                  <span>DÉBIT DE DONNÉES EN DIRECT</span>
                </div>
              </div>
              <div className="font-mono text-[10.5px] text-zinc-300 space-y-1.5 h-32 overflow-y-auto scrollbar-thin">
                <p className="text-zinc-500">[07:15:17Z] <span className="text-[#a7caf0] font-bold">SYS_ONLINE :</span> Lancement du portail de sécurité haut de gamme initié.</p>
                <p className="text-zinc-500">[07:15:22Z] <span className="text-emerald-400 font-bold">MFA_VALIDATION :</span> Clé double facteur validée sur terminal d'Omar.</p>
                <p className="text-zinc-500">[07:15:35Z] <span className="text-[#f2ca50] font-bold">CYCLES_VFX :</span> Initialisation du moteur de rendu Blender par lot.</p>
                <p className="text-zinc-500">[07:15:48Z] <span className="text-rose-400 font-bold">IO_ERROR :</span> Timeout réseau détecté sur le volume external_archive_04... reconnexion automatique tentée.</p>
                <p className="text-zinc-500">[07:16:01Z] <span className="text-[#cee5ff] font-bold">PORT_ACK :</span> Système d'hébergement autonome détecté sur Cloud Run.</p>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

// ==========================================
// 3. VIEW: SUBTITLED PLAYER & COMMENTING
// ==========================================
function PlayerView({ showToast }: { showToast: (msg: string) => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timelineProg, setTimelineProg] = useState(42.15); // exact matching mockup timeline code: 00:42:15:12
  const [audioTrack, setAudioTrack] = useState<'VO' | 'VF' | 'VAST'>('VO');
  const [jumpInput, setJumpInput] = useState('00:42:15:12');

  // Parallax watermark positioning following cursor coordinates to achieve high-security stream illusion!
  const [mousePos, setMousePos] = useState({ x: 100, y: 150 });
  const watermarkContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMoveOnVideo = (e: React.MouseEvent) => {
    if (watermarkContainerRef.current) {
      const rect = watermarkContainerRef.current.getBoundingClientRect();
      // Calculate coordinates relative to video frame
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // Mock Timestamped French comments list as visible inside screenshot
  const initialComments: Comment[] = [
    {
      id: 'com_1',
      timecode: '00:12:45:10',
      author: 'Marie Lefebvre',
      role: 'Superviseuse Dolby Vision',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop',
      text: 'Le contraste sur ce plan semble trop élevé par rapport à la séquence précédente. Vérifier les métadonnées de luminance Dolby Vision.',
      timestamp: 'Il y a 2h',
      resolved: false
    },
    {
      id: 'com_2',
      timecode: '00:42:15:12',
      author: 'Sellemi Omar',
      role: 'Directeur VFX Studio',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
      text: "Vérifier l'audio track 2 sur ce passage, j'entends un léger décalage sur le canal central gauche.",
      timestamp: 'À l\'instant (Sélectionné)',
      resolved: false,
      replies: [
        { author: 'Marie Lefebvre', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop', text: 'Je re-vérifie le transcodage multipiste immédiatement.' }
      ]
    },
    {
      id: 'com_3',
      timecode: '01:05:22:00',
      author: 'Sophie Chen',
      role: 'Étalonneuse Sénior',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop',
      text: 'Artefact de compression visible sur les noirs profonds. Augmenter le débit binaire de l\'export de rendu final.',
      timestamp: 'Hier',
      resolved: true
    }
  ];

  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [commentInputStr, setCommentInputStr] = useState('');
  const [activeCommentTab, setActiveCommentTab] = useState<'all' | 'resolved'>('all');

  const insertNewComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInputStr.trim()) return;

    const newCom: Comment = {
      id: `com_${Date.now()}`,
      timecode: jumpInput,
      author: 'Sellemi Omar (Monteur Principal)',
      role: 'Directeur VFX Studio',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
      text: commentInputStr,
      timestamp: 'À l\'instant',
      resolved: false
    };

    setComments([newCom, ...comments]);
    setCommentInputStr('');
    showToast(`Nouveau commentaire horodaté inséré au timecode ${jumpInput}`);
  };

  const toggleResolveComment = (id: string) => {
    setComments(prev => prev.map(c => {
      if (c.id === id) {
        showToast(c.resolved ? "Commentaire réactivé" : "Note horodatée résolue !");
        return { ...c, resolved: !c.resolved };
      }
      return c;
    }));
  };

  const handleJumpToTimecode = () => {
    // Basic verification format: checking regex match for hh:mm:ss:ff
    const re = /^\d{2}:\d{2}:\d{2}:\d{2}$/;
    if (!re.test(jumpInput)) {
      showToast("Format de timecode invalide. Requis: HH:MM:SS:FF");
      return;
    }
    showToast(`Déplacement de la tête de lecture vers ${jumpInput}`);
    // Simulate timeline head movement arbitrary calculation
    const parts = jumpInput.split(':').map(Number);
    const fraction = (parts[1] * 60 + parts[2]) / 3600;
    setTimelineProg(Math.floor(fraction * 100));
  };

  // Filter list
  const filteredComments = useMemo(() => {
    if (activeCommentTab === 'resolved') {
      return comments.filter(c => c.resolved);
    }
    return comments.filter(c => !c.resolved);
  }, [comments, activeCommentTab]);

  return (
    <div className="flex flex-col lg:flex-row bg-[#0A0A0A] text-slate-100 min-h-[85vh] overflow-hidden">
      
      {/* LEFT SECTION: Video viewport with active timeline controllers */}
      <section className="flex-1 bg-black relative flex flex-col p-6 min-h-[480px]">
        
        {/* Video stream title headers */}
        <div className="absolute top-8 left-8 z-30 flex flex-wrap gap-2.5">
          <span className="px-3.5 py-1.5 bg-zinc-950/90 border border-[#f2ca50] text-[#f2ca50] font-mono text-[10px] font-bold flex items-center gap-2 rounded shadow-lg">
            <span className="w-1.5 h-1.5 bg-[#f2ca50] rounded-full animate-ping"></span>
            <span>FLUX HORODATÉ SÉCURISÉ EN DIRECT</span>
          </span>
          <span className="px-3.5 py-1.5 bg-zinc-950/90 border border-zinc-800 text-zinc-400 font-mono text-[10px] rounded shadow-lg">
            PROXIES UHD GENERATED (Cycles Draft)
          </span>
        </div>

        {/* Cinematic wide frame preview panel */}
        <div 
          ref={watermarkContainerRef}
          onMouseMove={handleMouseMoveOnVideo}
          className="flex-1 flex items-center justify-center relative overflow-hidden bg-neutral-900 border border-zinc-900 rounded-xl aspect-video select-none group"
        >
          {/* Main movie frame backdrop matching the high budget metropolis theme */}
          <img 
            src="https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1600&auto=format&fit=crop" 
            alt="Cinematic Metropolis" 
            className="w-full h-full object-cover opacity-75"
          />

          {/* Secure Watermark Layer following parallax coordinates */}
          <div 
            className="absolute pointer-events-none text-white/10 font-mono text-[11px] leading-relaxed select-none text-center leading-loose whitespace-pre-wrap transition-transform duration-300 ease-out"
            style={{ 
              transform: `translate(${mousePos.x / 14 - 40}px, ${mousePos.y / 14 - 30}px) rotate(-15deg)`
            }}
          >
            <p>CONTRÈLE DE SÉCURITÉ : CINEPHASE S.A.</p>
            <p>Sellemi Omar • J.Dupont@cinephase.com</p>
            <p>ACCÈS AUTORISÉ LE 23/05/2026</p>
          </div>

          {/* Big hover play button */}
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute z-20 w-16 h-16 rounded-full bg-[#f2ca50]/90 text-amber-950 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(242,202,80,0.4)] opacity-0 group-hover:opacity-100"
          >
            {isPlaying ? <Pause className="w-7 h-7 fill-amber-950" /> : <Play className="w-7 h-7 fill-amber-950 translate-x-0.5" />}
          </button>
        </div>

        {/* Down player controllers block matching Figma exact buttons layout */}
        <div className="mt-4 bg-[#0e0e0e] border border-zinc-850 p-4 rounded-xl flex flex-col space-y-3.5">
          
          {/* Progression timeline bar */}
          <div className="w-full h-1.5 bg-zinc-900 border border-zinc-800 rounded-full cursor-pointer relative group">
            <div className="h-full bg-[#f2ca50] rounded-full relative" style={{ width: `${timelineProg}%` }}>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-[#f2ca50] rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Play/Pause controls */}
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => { setIsPlaying(!isPlaying); showToast(isPlaying ? "Lecture interrompue" : "LANCEMENT DE LA LECTURE"); }}
                className="p-1.5 text-zinc-300 hover:text-[#f2ca50] active:scale-90 transition-all shrink-0"
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-zinc-300 hover:fill-[#f2ca50]" /> : <Play className="w-6 h-6 fill-zinc-300 hover:fill-[#f2ca50] translate-x-0.5" />}
              </button>

              <div className="flex items-center gap-2">
                <button onClick={() => showToast("Reculer de 10 secondes")} className="p-1 text-zinc-400 hover:text-white"><RotateCcw className="w-4 h-4" /></button>
                <div className="h-4 w-px bg-zinc-800"></div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <Volume2 className="w-4 h-4 cursor-pointer hover:text-[#f2ca50]" />
                  <div className="w-16 h-1 bg-zinc-850 rounded-full overflow-hidden">
                    <div className="h-full bg-[#f2ca50]" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>

              <div className="h-4 w-px bg-zinc-800"></div>
              
              {/* Technical exact time code tracking */}
              <div className="text-[11px] font-mono text-zinc-300">
                00:42:15:12 <span className="text-zinc-550 opacity-40">/ 01:24:03:00</span>
              </div>
            </div>

            {/* Multipiste selections and jump features */}
            <div className="flex flex-wrap items-center gap-3.5">
              
              {/* Multi-audiotrack languages switcher */}
              <div className="flex items-center gap-1 bg-zinc-950 p-1 border border-zinc-850 rounded">
                {(['VO', 'VF', 'VAST'] as const).map((track) => (
                  <button
                    key={track}
                    onClick={() => { setAudioTrack(track); showToast(`Sélection du multiplexe audio: ${track}`); }}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono transition-colors ${
                      audioTrack === track 
                      ? 'bg-[#254969] text-[#cee5ff] border border-sky-800' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                    }`}
                  >
                    {track}
                  </button>
                ))}
              </div>

              {/* Secure timecode input jumping */}
              <div className="flex items-center gap-2">
                <label className="text-[10px] font-mono text-zinc-400">JUMP TO</label>
                <div className="relative flex select-none">
                  <input 
                    type="text" 
                    value={jumpInput}
                    onChange={(e) => setJumpInput(e.target.value)}
                    className="w-28 bg-[#1c1b1b] border border-zinc-800 text-[10.5px] font-mono p-1 px-2 focus:outline-none focus:border-[#f2ca50] text-[#f2ca50]"
                  />
                  <button 
                    onClick={handleJumpToTimecode}
                    className="bg-zinc-850 hover:bg-zinc-700 text-zinc-300 font-bold px-2 rounded-r flex items-center justify-center"
                    title="Valider Timecode"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <button onClick={() => showToast("Plein écran simulé")} className="p-1 text-zinc-400 hover:text-white" title="Plein écran">
                <Maximize className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* RIGHT SIDEBAR PANEL: Timestamped Comments with resolving and replying workflow */}
      <aside className="w-full lg:w-96 bg-[#121212]/95 border-t lg:border-t-0 lg:border-l border-zinc-850 flex flex-col shrink-0">
        
        {/* Comment bar title list header */}
        <div className="p-4 border-b border-zinc-850 bg-neutral-900 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f2ca50]"></span>
            <h3 className="text-sm font-bold tracking-wider text-white font-headline">Comments &amp; Annotations</h3>
          </div>
          <span className="bg-zinc-900 text-[10px] font-mono text-[#f2ca50] border border-zinc-800 px-2.5 py-0.5 rounded">
            {comments.length} NOTES ACTIVÉES
          </span>
        </div>

        {/* Comment quick filters tabs */}
        <div className="flex p-3 border-b border-zinc-850 gap-2 bg-[#1c1b1b]/50">
          <button 
            onClick={() => setActiveCommentTab('all')}
            className={`flex-1 py-1 text-[10px] font-mono uppercase tracking-wider rounded ${activeCommentTab === 'all' ? 'bg-[#254969] text-[#cee5ff] border border-sky-800' : 'text-zinc-400 hover:bg-zinc-900'}`}
          >
            En Cours ({comments.filter(c => !c.resolved).length})
          </button>
          <button 
            onClick={() => setActiveCommentTab('resolved')}
            className={`flex-1 py-1 text-[10px] font-mono uppercase tracking-wider rounded ${activeCommentTab === 'resolved' ? 'bg-[#254969] text-[#cee5ff] border border-sky-800' : 'text-zinc-400 hover:bg-zinc-900'}`}
          >
            Résolus ({comments.filter(c => c.resolved).length})
          </button>
        </div>

        {/* Dynamic French comments rendering queue list */}
        <div className="flex-1 overflow-y-auto max-h-[400px] lg:max-h-[500px] divide-y divide-zinc-900 text-xs">
          {filteredComments.map((com) => (
            <div key={com.id} className="p-4 space-y-3 shrink-0 hover:bg-zinc-900/40 transition-colors">
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-mono text-[#f2ca50] font-bold bg-[#201f1f] px-2 py-0.5 rounded border border-zinc-800 shadow-sm">{com.timecode}</span>
                <span className="text-[10px] text-zinc-500 font-mono italic">{com.timestamp}</span>
              </div>

              <div className="flex gap-3">
                <img src={com.avatar} alt={com.author} className="w-8 h-8 rounded-full border border-zinc-850 shrink-0 object-cover" />
                <div className="space-y-1">
                  <p className="font-bold text-zinc-300">{com.author}</p>
                  <p className="text-[10px] text-amber-500 font-mono">{com.role}</p>
                  <p className="text-zinc-400 leading-relaxed pt-1">{com.text}</p>
                </div>
              </div>

              {/* Sub comment replies mapping if exists */}
              {com.replies && com.replies.map((rep, rIdx) => (
                <div key={rIdx} className="ml-11 p-2 bg-[#1c1b1b] border border-zinc-850 rounded flex gap-2">
                  <img src={rep.avatar} alt={rep.author} className="w-5 h-5 rounded-full object-cover shrink-0" />
                  <div className="space-y-0.5">
                    <p className="font-bold text-zinc-300 text-[10px]">{rep.author}</p>
                    <p className="text-zinc-400 text-[10.5px] leading-relaxed">{rep.text}</p>
                  </div>
                </div>
              ))}

              <div className="flex gap-4 pt-1 ml-11 text-[10px] font-mono text-zinc-550">
                <button 
                  onClick={() => toggleResolveComment(com.id)}
                  className="hover:text-[#f2ca50] transition-colors flex items-center gap-1 uppercase"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{com.resolved ? 'RÉACTIVER' : 'RÉSOUDRE'}</span>
                </button>
                <button onClick={() => showToast("Simuler formulaire de réponse")} className="hover:text-[#f2ca50] transition-colors uppercase">
                  RÉPONDRE
                </button>
              </div>

            </div>
          ))}

          {filteredComments.length === 0 && (
            <div className="p-8 text-center text-zinc-500 font-mono uppercase text-[10.5px] leading-relaxed">
              <AlertTriangle className="w-6 h-6 text-zinc-600 mx-auto mb-2" />
              <span>Aucune annotation dans cette catégorie.</span>
            </div>
          )}
        </div>

        {/* Comment Editor form simulation */}
        <div className="p-4 bg-[#0e0e0e] border-t border-zinc-850 mt-auto">
          <form onSubmit={insertNewComment} className="space-y-3">
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-[#f2ca50] font-bold">TC INDEXÈ DE SAISIE : {jumpInput}</span>
              <span className="text-zinc-500 font-bold uppercase">Multi-utilisateurs</span>
            </div>
            
            <textarea 
              value={commentInputStr}
              onChange={(e) => setCommentInputStr(e.target.value)}
              required
              rows={2}
              placeholder="Rédigez votre observation de post-production ici..."
              className="w-full bg-[#1c1b1b] border border-zinc-800 rounded p-2 text-xs focus:outline-none focus:border-[#f2ca50] text-zinc-200 resize-none"
            ></textarea>

            <button 
              type="submit"
              className="w-full py-2 bg-[#f2ca50] hover:bg-[#e9c349] text-[#241a00] font-bold font-mono text-[10.5px] rounded tracking-wider flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <span>PUBLIER L'ANNOTATION HORODATÉE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </aside>

    </div>
  );
}

// ==========================================
// 5. VIEW: CAHIER DES CHARGES & BILL OF MATERIALS
// ==========================================
function SpecSystemAndInvoice({ showToast, closeMod }: { showToast: (msg: string) => void; closeMod?: () => void }) {
  const [clientName, setClientName] = useState('STUDIO CINEPHASE ASSOCIÉS');
  const [invoiceDate, setInvoiceDate] = useState('2026-05-23');
  const [currency, setCurrency] = useState<'EUR' | 'USD' | 'CAD'>('EUR');
  const [chosenPalette, setChosenPalette] = useState<string>('Cinema Dark (Cinema Onyx & Premium Gold)');
  const [docPage, setDocPage] = useState<'intro' | 'design' | 'functional' | 'infra' | 'bill'>('intro');

  const currencyConfig = {
    EUR: { symbol: '€', rate: 1, label: 'Euros (€)' },
    USD: { symbol: '$', rate: 1.08, label: 'Dollars ($)' },
    CAD: { symbol: 'C$', rate: 1.48, label: 'Canadiens (C$)' }
  };

  const activeCurrency = currencyConfig[currency];

  const formatPrice = (baseEur: number) => {
    const value = baseEur * activeCurrency.rate;
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency
    }).format(value);
  };

  const copyToClipboard = (str: string) => {
    navigator.clipboard?.writeText(str);
    showToast(`Code couleur HEX ${str} copié avec succès !`);
  };

  const pages = [
    { id: 'intro', label: 'Page 01 : Contexte & Objectifs', icon: Compass },
    { id: 'design', label: 'Page 02 : Charte & Identité Visuelle', icon: Palette },
    { id: 'functional', label: 'Page 03 : Outils Métier & Interactions', icon: Play },
    { id: 'infra', label: 'Page 04 : Architecture & Recommandations', icon: Cpu },
    { id: 'bill', label: 'Page 05 : Facture & Devis Détaillé', icon: FileText }
  ] as const;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 bg-[#0A0A0A] text-zinc-100">
      
      {/* Structural Headers with Print Utilities */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-850 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded uppercase font-bold tracking-widest animate-pulse">DOSSIER TECHNIQUE RESTREINT</span>
            <span className="text-[10px] font-mono text-zinc-500">• EXPORT DE PRODUCTION SÉCURISÉ</span>
          </div>
          <h1 className="text-2xl font-bold font-headline text-white tracking-tight flex items-center gap-2 mt-2">
            <FileText className="text-[#f2ca50] w-6 h-6" />
            <span>Synthèse Technique &amp; Cahier des Charges Cinephase</span>
          </h1>
          <p className="text-xs text-zinc-400 font-mono mt-1">Documentation exhaustive des livrables de la plateforme de streaming privée et devis commercial associé.</p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => { window.print(); showToast("Impression du dossier technique & de la facture d'honoraires initiée."); }}
            className="px-4 py-2 bg-[#f2ca50] text-[#241a00] font-bold rounded-lg text-xs tracking-wider flex items-center gap-1.5 hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(242,202,80,0.2)]"
          >
            <Download className="w-4 h-4" />
            <span>IMPRIMER LE COMPTE RENDU PDF</span>
          </button>
        </div>
      </div>

      {/* Grid splits: Left Side Table of Contents vs Right Side Page Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Table of Contents Pagination / Menu sidebar */}
        <div className="lg:col-span-1 space-y-4 print:hidden">
          <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-bold px-3">SOMMAIRE DU LIVRABLE</p>
          <nav className="space-y-1.5">
            {pages.map((p) => {
              const IconComp = p.icon;
              return (
                <button
                  key={p.id}
                  onClick={() => { setDocPage(p.id); showToast(`Dossier - Affichage de la ${p.label}`); }}
                  className={`w-full text-left flex items-center gap-3 px-3 py-3 rounded-lg border transition-all ${
                    docPage === p.id 
                    ? 'bg-zinc-900 border-[#f2ca50]/45 text-white font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]' 
                    : 'bg-[#121212]/40 border-zinc-900 text-zinc-450 hover:bg-zinc-900/60 hover:text-zinc-200'
                  }`}
                >
                  <IconComp className={`w-4 h-4 shrink-0 ${docPage === p.id ? 'text-[#f2ca50]' : 'text-zinc-500'}`} />
                  <span className="text-xs tracking-wide">{p.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="bg-[#121212]/80 border border-zinc-850 p-4 rounded-xl space-y-3 font-mono text-[10px] text-zinc-500">
            <p className="font-bold text-zinc-400">RAPPORT STATISTIQUE :</p>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Total sections :</span>
                <span className="text-zinc-300">5 Parties</span>
              </div>
              <div className="flex justify-between">
                <span>Statut conformité :</span>
                <span className="text-emerald-500 font-bold">100% VALIDE</span>
              </div>
              <div className="flex justify-between">
                <span>Garanties :</span>
                <span className="text-zinc-300">RGPD / MFA Intégral</span>
              </div>
            </div>
            <div className="pt-2 border-t border-zinc-900 text-center">
              <span className="text-[9px] text-[#f2ca50] font-sans">Réalisé par Sellemi Omar</span>
            </div>
          </div>
        </div>

        {/* Live Content Page Viewer */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* PAGE 1: INTRO & CONTEXT */}
          {docPage === 'intro' && (
            <div className="bg-[#121212] border border-zinc-850 rounded-xl p-6 md:p-8 space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                <span className="text-xs font-mono text-[#f2ca50] font-bold">PAGE 01 — PRÉSENTATION DU PROJET</span>
                <span className="text-[10px] font-mono text-zinc-500 bg-[#1a1a1a] px-2 py-0.5 rounded">Cinephase Corp.</span>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold font-headline text-white uppercase tracking-wide">1. Présentation de l'entreprise et du projet</h2>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Cinephase souhaite développer une plateforme web de streaming vidéo privée et hautement sécurisée, destinée à un usage interne et B2B (clients, partenaires). L'objectif est de permettre le visionnage, la validation et le suivi approfondis de projets audiovisuels avant leur diffusion publique. La plateforme doit pouvoir supporter jusqu'à 100 utilisateurs actifs en simultané avec une parfaite intégrité de traitement de flux UHD de post-production.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="bg-[#181818] border border-zinc-850 p-4 rounded-lg space-y-2.5">
                  <h3 className="text-xs font-bold text-amber-500 font-mono uppercase tracking-wide flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#f2ca50]" />
                    <span>Objectifs Stratégiques</span>
                  </h3>
                  <ul className="text-xs text-zinc-400 space-y-1.5 list-disc list-inside leading-relaxed">
                    <li><strong className="text-zinc-300">Vidéothèque Fluide :</strong> Navigation instantanée par filtres de catégories.</li>
                    <li><strong className="text-zinc-300">Sécurité Maximale :</strong> Protection drastique de la propriété intellectuelle (MFA, Watermarks).</li>
                    <li><strong className="text-zinc-300">Outils Collaboratifs :</strong> Fil de commentaires synchronisé sur la timeline.</li>
                    <li><strong className="text-zinc-300">Multi-Audio Dynamique :</strong> Changements linguistiques à la volée instantanés.</li>
                  </ul>
                </div>

                <div className="bg-[#181818] border border-zinc-850 p-4 rounded-lg space-y-2.5">
                  <h3 className="text-xs font-bold text-amber-500 font-mono uppercase tracking-wide flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-[#f2ca50]" />
                    <span>Engagements de Protection</span>
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Afin d'éviter tout détournement, enregistrement non autorisé ou fuite d'œuvres cinématographiques non finalisées, un double système combinant <strong className="text-white">Authentification Forte à double facteur</strong> et un <strong className="text-white">Incrustateur de Filigrane Dynamique temps réel</strong> a été programmé sous forme d'une couche native non débrayable sur le lecteur d'étalonnage.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-900 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#f2ca50] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-zinc-300 uppercase font-mono">Note méthodologique freelance :</p>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">
                    Conformément aux directives de livraison et d'étalonnage, cette interface simule en temps réel l'ensemble de ces couches de sécurité (MFA à six chiffres avec traceur, jauge de stockage NAS d'une volumétrie de 8.2 To, files d'attente de transcoding en arrière-plan et simulation de lecteur vidéo multi-pistes).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 2: STYLE GUIDE & VISUAL CHARTER */}
          {docPage === 'design' && (
            <div className="bg-[#121212] border border-zinc-850 rounded-xl p-6 md:p-8 space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                <span className="text-xs font-mono text-[#f2ca50] font-bold">PAGE 02 — CHARTE GRAPHIQUE & IDENTITÉ VISUELLE</span>
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-850 px-2 py-0.5 rounded">Design suisse &amp; Métis</span>
              </div>

              <p className="text-xs text-zinc-400 leading-normal">
                L'identité visuelle de Cinephase a été développée sur mesure pour refléter l'autorité de l'ingénierie post-production de gros budget. Elle se décline selon les caractéristiques de formes, couleurs, typographies et iconographies documentées ci-après :
              </p>

              {/* Shapes & Logo details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-headline">Formes et Intégration Structurale</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    La structure visuelle repose entièrement sur un <strong className="text-zinc-200">Bento Grid Asymétrique</strong> qui regroupe les informations de métadonnées, de transcoding de manière autonome. Les coins bénéficient d'un arrondi subtil et soigné (<code className="text-amber-500 font-mono">rounded-xl</code> de 12px) entourés de lignes de pixels de 1px (<code className="text-zinc-850 font-mono">border-zinc-850</code>) pour évoquer les moniteurs d'étalonnage physique professionnels. Les vidéos et images d'illustrations respectent l'aspect-ratio classique cinéma <strong className="text-white">16:9</strong>.
                  </p>
                </div>
                
                <div className="space-y-2.5">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-headline">Identité Logos & Iconographie</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Le logotype emblématique Cinephase est composé d'un <strong className="text-yellow-400">Badge Doré Lumineux</strong> intégrant une clé de cryptage et une bobine de film argentique au cœur de la console. Toute l'iconographie applicative utilise exclusivement la librairie vectorielle <strong className="text-zinc-200">Lucide React</strong>, évitant ainsi le chargement d'images sources encombrantes et garantissant un chargement instantané en ultra-haute vitesse.
                  </p>
                </div>
              </div>

              {/* Color Maps detail (Clickable Copy) */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-headline flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-[#f2ca50]" />
                  <span>Palette de Couleurs Applicative (Color Maps)</span>
                </h3>
                <p className="text-[11px] text-zinc-550 italic leading-snug">
                  Cliquez sur les puces de couleurs à gauche pour copier le code HEX directement dans votre presse-papiers pour l'intégration CSS :
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CLOR_MAPS.map((col, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => copyToClipboard(col.hex)}
                      className="bg-[#1c1b1b]/80 border border-zinc-850/60 rounded-lg p-2.5 flex gap-3 items-center hover:border-zinc-700 transition-colors cursor-pointer group"
                    >
                      <div 
                        className="w-8 h-8 rounded shrink-0 border border-zinc-800 shadow-sm relative group-hover:scale-105 transition-transform"
                        style={{ backgroundColor: col.hex }}
                        title="Copier HEX"
                      >
                        <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] text-white">COPY</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono font-bold text-zinc-200 selection:bg-[#f2ca50] selection:text-black">{col.hex}</span>
                          <span className="text-[8px] text-zinc-500 font-mono uppercase">{col.type}</span>
                        </div>
                        <p className="text-[10px] text-amber-500 font-bold leading-none mt-0.5">{col.name}</p>
                        <p className="text-[9px] text-zinc-450 leading-tight mt-1 truncate">{col.usage}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography detail */}
              <div className="space-y-3 pt-2 border-t border-zinc-900">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-headline flex items-center gap-1.5">
                  <Type className="w-4 h-4 text-[#f2ca50]" />
                  <span>Polices Typographiques Choisies</span>
                </h3>

                <div className="space-y-3.5">
                  {TYPOGRAPHY_CHOICES.map((t, idx) => (
                    <div key={idx} className="bg-zinc-950 p-3.5 rounded-lg border border-zinc-900 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="min-w-[130px]">
                        <span className="text-[11px] font-mono font-bold text-white bg-zinc-900 border border-zinc-850 px-2.5 py-1 rounded shadow-sm">{t.family}</span>
                        <p className="text-[9px] text-amber-500 font-bold uppercase tracking-wider mt-1.5">{t.role}</p>
                      </div>
                      <div className="flex-1 text-xs text-zinc-400 space-y-1">
                        <p className="font-bold text-zinc-300">Rendu : <span className="font-normal italic font-sans">{t.choice}</span></p>
                        <p className="text-[10.5px] text-zinc-550 leading-relaxed">{t.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PAGE 3: FUNCTIONAL & BUSINESS UX */}
          {docPage === 'functional' && (
            <div className="bg-[#121212] border border-zinc-850 rounded-xl p-6 md:p-8 space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                <span className="text-xs font-mono text-[#f2ca50] font-bold">PAGE 03 — OUTILS MÉTIERS & EXPÉRIENCE DE NAVIGATION (UX)</span>
                <span className="text-[10px] font-mono text-zinc-500 bg-[#1a1a1a] px-2 py-0.5 rounded">High Fidelity Specs</span>
              </div>

              <div className="space-y-4">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider font-headline">Fonctionnalités Clés Implémentées dans l'Interface</h2>
                <p className="text-xs text-zinc-400 leading-normal">
                  Chaque exigence fonctionnelle a été traduite par un composant d'interface interactif haut de gamme garantissant une prise en main intuitive pour les évaluateurs et les équipes de post-production :
                </p>
              </div>

              <div className="space-y-3.5 pt-1">
                
                {/* Accordion List A */}
                <div className="bg-[#181818] border border-zinc-850 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-white">
                    <Lock className="w-4 h-4 text-[#f2ca50]" />
                    <span className="text-xs font-bold uppercase font-headline">Authentification Double Facteur Sécurisée (MFA)</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed pl-6">
                    Connecteur d'accréditation robuste simulant la saisie d'un jeton aléatoire à six chiffres. Affiche des alertes précises d'échec d'identification en cas de token erroné ou d'omission d'adresse. Un journal de connexion en sous-sol enregistre chaque adresse IP impliquée dans la session d'édition.
                  </p>
                </div>

                {/* Accordion List B */}
                <div className="bg-[#181818] border border-zinc-850 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-white">
                    <Shield className="w-4 h-4 text-[#f2ca50]" />
                    <span className="text-xs font-bold uppercase font-headline">Filigrane Mobile Dynamique Non-Désactivable (Watermarking)</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed pl-6">
                    Un overlay transparent suit les mouvements du pointeur au survol de la vidéo. Il inscrit en temps réel l'identité complète de l'utilisateur (Adresse Email COMPANY, Nom, Prénom), facilitant l'identification immédiate d'une source en cas de fuite du DCP ou du Master ProRes.
                  </p>
                </div>

                {/* Accordion List C */}
                <div className="bg-[#181818] border border-zinc-850 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-white">
                    <Volume2 className="w-4 h-4 text-[#f2ca50]" />
                    <span className="text-xs font-bold uppercase font-headline">Gestion Multi-Audio & Raccourcis Clavier</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed pl-6">
                    Sélecteur rapide permettant de basculer instantanément de la piste audio anglaise "English Core Dolby Atmos" à la version doublée "VF Stéréo Mix down" ou l'audiodescription. Raccourcis Echap / Espace pour basculer en vitesse, et flèches de commande pour naviguer par saut de 10 secondes.
                  </p>
                </div>

                {/* Accordion List D */}
                <div className="bg-[#181818] border border-zinc-850 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-white">
                    <Clock className="w-4 h-4 text-[#f2ca50]" />
                    <span className="text-xs font-bold uppercase font-headline">Chronologiques de Retours par Timecode</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed pl-6">
                    Chaque retour collaboratif capture précisément l'index temporel à la seconde près. Cette note s'ancre automatiquement au sein de la ligne de commentaires latérale. Les évaluateurs peuvent cliquer sur un code temporel pour y propulser immédiatement la tête de lecture.
                  </p>
                </div>

                {/* Accordion List E */}
                <div className="bg-[#181818] border border-zinc-850 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-white">
                    <Database className="w-4 h-4 text-[#f2ca50]" />
                    <span className="text-xs font-bold uppercase font-headline">Tableau de Bord &amp; Files de Traitement NAS</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed pl-6">
                    Le tableau central détaille la volumétrie consommée sur les 15 To d'allocation disque. Un visualiseur de tâches de transcoding en temps réel avec pourcentage de progression illustre l'efficacité et la file d'attente système de l'encodage du serveur autonome.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* PAGE 4: ARCHITECTURE & RECOMMENDATIONS */}
          {docPage === 'infra' && (
            <div className="bg-[#121212] border border-zinc-850 rounded-xl p-6 md:p-8 space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                <span className="text-xs font-mono text-[#f2ca50] font-bold">PAGE 04 — RECOMMANDATIONS ET CHOIX TECHNIQUES DÉPLOYÉS</span>
                <span className="text-[10px] font-mono text-zinc-500 bg-[#1a1a1a] px-2 py-0.5 rounded">Stack technologique</span>
              </div>

              <div className="space-y-4">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider font-headline">Architecture &amp; Solutions Recommandées pour Cinephase</h2>
                <p className="text-xs text-zinc-400 leading-normal">
                  Pour répondre sereinement aux contraintes de volume (15 To de fichiers lourds ProRes / MXF) et de connexion simultanée de 100 monteurs sans ralentissement, l'architecture préconisée s'agence ainsi :
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[11px] pt-1">
                
                <div className="bg-zinc-950 p-4 border border-zinc-900 rounded-lg space-y-2">
                  <span className="text-amber-500 font-bold uppercase">FRONT-END SPECS</span>
                  <p className="text-zinc-400 leading-relaxed font-sans text-xs">
                    React 18 alimenté par l'outillage haute performance <strong className="text-white">Vite</strong> et structuré par <strong className="text-white">TypeScript</strong>. Styling via Tailwind CSS offrant un rendu fluide en mode mobile et WebGL optimisé.
                  </p>
                </div>

                <div className="bg-zinc-950 p-4 border border-zinc-900 rounded-lg space-y-2">
                  <span className="text-amber-500 font-bold uppercase">BACK-END CONTENEUR</span>
                  <p className="text-zinc-400 leading-relaxed font-sans text-xs">
                    Serveur d'API <strong className="text-white">Node.js Express</strong> packagé dans un conteneur sécurisé déployé sur <strong className="text-white">Google Cloud Run</strong>. Orchestration dynamique sans serveur avec réduction automatique à zéro en cas d'inactivité.
                  </p>
                </div>

                <div className="bg-zinc-950 p-4 border border-zinc-900 rounded-lg space-y-2">
                  <span className="text-amber-500 font-bold uppercase">STREAMING & STORAGE</span>
                  <p className="text-zinc-400 leading-relaxed font-sans text-xs">
                    Stockage haut débit <strong className="text-white">Google Cloud Storage</strong> ou bucket AWS S3 couplé à un réseau de diffusion de contenu <strong className="text-white">Cloud CDN</strong> pour diffuser des segments vidéo HLS de manière fluide.
                  </p>
                </div>

              </div>

              <div className="p-4 bg-[#181818] border border-zinc-850 rounded-lg space-y-2 font-mono text-[10.5px]">
                <p className="font-bold text-zinc-300">ESTIMATION TEMPS DE DÉVELOPPEMENT & LIVRABLES :</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-900 text-zinc-500">
                        <th className="py-2">PHASE DE PRODUCTION</th>
                        <th className="py-2">JOURS-HOMME (JH)</th>
                        <th className="py-2">ESTIMATION BUDGET</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-950 text-zinc-400 leading-relaxed">
                      <tr>
                        <td className="py-2 font-semibold">1. Spécification &amp; Login MFA (Double Facteur)</td>
                        <td className="py-2">4 JH</td>
                        <td className="py-2 text-[#f2ca50] font-bold">1 200,00 €</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold">2. Console administrative Bento &amp; Files d'encodage</td>
                        <td className="py-2">8 JH</td>
                        <td className="py-2 text-[#f2ca50] font-bold">2 500,00 €</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold">3. Lecteur, Incrustation filigrane mobile, retours par TC</td>
                        <td className="py-2">10 JH</td>
                        <td className="py-2 text-[#f2ca50] font-bold">3 100,00 €</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold">4. Déploiement Conteneurisé Cloud Run (CI/CD)</td>
                        <td className="py-2">3 JH</td>
                        <td className="py-2 text-emerald-400 font-bold">Inclus</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 5: THE INVOICE & BILL OF MATERIALS (PAY ME!) */}
          {docPage === 'bill' && (
            <div className="bg-[#121212] border border-[#f2ca50]/20 rounded-xl p-6 md:p-8 space-y-6 animate-fadeIn relative shadow-2xl">
              <div className="absolute -top-3 right-6 bg-[#f2ca50] text-[#241a00] font-bold text-[9px] font-mono uppercase px-3 py-1 rounded shadow-lg tracking-wider">
                FACTURE FINALE COMMERCIALE
              </div>

              <div className="border-b border-zinc-900 pb-4 space-y-1">
                <h3 className="text-base font-bold tracking-wider text-white font-headline">FACTURE CONFORME N° FP-2026-643</h3>
                <p className="text-[10px] text-[#f2ca50] font-mono">Sellemi Omar Studio SASU • SIRET : 743 932 841 0023 • TVA Intracom : FR82743932841</p>
              </div>

              {/* Interactive factors customiser */}
              <div className="bg-[#181818] border border-zinc-850 p-4 rounded-lg space-y-4">
                <p className="text-[10px] text-zinc-500 font-mono font-bold uppercase">PERSONNALISER LES INFORMATIONS DE LA FACTURE :</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[10.5px]">
                  <div>
                    <label className="block text-zinc-400 mb-1">DESIGNATION DU CLIENT :</label>
                    <input 
                      type="text" 
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-850 text-white rounded p-1.5 focus:outline-none focus:border-[#f2ca50]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-zinc-400 mb-1">DATE DE FAIT :</label>
                    <input 
                      type="date" 
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-850 text-white rounded p-1.5 focus:outline-none focus:border-[#f2ca50]"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">DEVISE DE RÈGLEMENT :</label>
                    <select 
                      value={currency}
                      onChange={(e) => {
                        setCurrency(e.target.value as any);
                        showToast(`Conversion des honoraires en ${currencyConfig[e.target.value as 'EUR' | 'USD' | 'CAD'].label}`);
                      }}
                      className="w-full bg-zinc-950 border border-zinc-850 text-white rounded p-1.5 focus:outline-none focus:border-[#f2ca50]"
                    >
                      <option value="EUR">Euros (€)</option>
                      <option value="USD">Dollars ($)</option>
                      <option value="CAD">Canadiens (C$)</option>
                    </select>
                  </div>
                </div>

                <div className="font-mono text-[10.5px]">
                  <label className="block text-zinc-450 mb-1">VARIATION DE CHARTE GRAPHIQUE INCLUSE :</label>
                  <select 
                    value={chosenPalette}
                    onChange={(e) => setChosenPalette(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-850 text-white rounded p-1.5 focus:outline-none"
                  >
                    <option value="Cinema Dark (Cinema Onyx & Premium Gold)">Cinema Dark (Cinema Onyx & Premium Gold) - Standard</option>
                    <option value="Cosmic Slate Retro (Steel Blue & Orange Neon)">Cosmic Slate Retro (Steel Blue & Orange Neon) - Variant</option>
                    <option value="Vanguard Space (Clean Off-White & Dark Obsidian)">Vanguard Space (Clean Off-White & Dark Obsidian) - Minimalist</option>
                  </select>
                </div>
              </div>

              {/* Itemized list of billable work */}
              <div className="space-y-3 font-mono text-[11px]">
                <p className="text-[10px] text-[#f2ca50] font-bold uppercase tracking-wider">RECAPITULATIF DES PRESTATIONS EXÉCUTÉES :</p>
                
                <div className="space-y-2 border-y border-zinc-900 py-3 text-zinc-300 leading-normal">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-zinc-400">1. Connexion, Accréditation Cryptographique & Double Facteur (MFA)</span>
                    <span className="text-zinc-200 shrink-0 font-bold">{formatPrice(1200)}</span>
                  </div>
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-zinc-400">2. Bento Dashboard Console (Indicateurs NAS 8.2 TB & Jauges de Débit)</span>
                    <span className="text-zinc-200 shrink-0 font-bold">{formatPrice(2500)}</span>
                  </div>
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-zinc-400">3. Player Avancé, Watermark Dynamique Temporel & Annotations Horodatées</span>
                    <span className="text-zinc-200 shrink-0 font-bold">{formatPrice(3100)}</span>
                  </div>
                  <div className="flex justify-between items-start gap-2 text-emerald-400">
                    <span>4. Hébergements multi-prestataires, Pipelines de Transcode & Conteneurs CI/CD</span>
                    <span className="shrink-0 font-bold">Inclus</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1 text-xs">
                  <div className="flex justify-between items-center text-zinc-400">
                    <span>TOTAL DÉBITEUR H.T.</span>
                    <span className="text-white font-bold">{formatPrice(6800)}</span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-400">
                    <span>TVA Applicables (20.0%)</span>
                    <span>{formatPrice(1360)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-base font-extrabold text-white pt-2 border-t border-dashed border-zinc-800">
                    <span className="text-[#f2ca50] uppercase tracking-wide">SOLDE À RÉGLER T.T.C.</span>
                    <span className="text-emerald-400 text-lg">{formatPrice(8160)}</span>
                  </div>
                </div>
              </div>

              {/* Tunis "باش تقلو خلصني" styled secure handshaking badge with bank account */}
              <div className="bg-zinc-950 border border-zinc-850 p-4 rounded-lg text-center space-y-2">
                <Lock className="w-5 h-5 text-emerald-400 mx-auto" />
                <p className="text-[10px] font-mono text-zinc-400 leading-relaxed max-w-lg mx-auto">
                  "Livrable Cinephase livré avec intégrité totale de la charte {chosenPalette}. Merci d'avoir validé notre travail pour {clientName}. Veuillez virer les fonds sous 30 jours."
                </p>
                <div className="bg-[#111111] py-2 px-3 rounded border border-zinc-900 inline-block">
                  <p className="text-[10px] font-bold text-emerald-400 font-mono tracking-wider">OMAR-STUDIO-IBAN-FR76-1928-10023</p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
