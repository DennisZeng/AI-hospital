import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Hologram from './components/Hologram';
import { 
  Brain, Cpu, Dna, Globe, ArrowRight, Menu, X, 
  Microscope, Stethoscope, Languages, Activity, Cross, 
  UserPlus, Pill, Monitor, ShoppingBag, MessageSquare, 
  Send, Mic, Heart, Thermometer, TrendingUp, Package, 
  ShoppingCart, Zap, ShieldCheck, Rocket
} from 'lucide-react';

// --- Types ---
type Lang = 'en' | 'cn';

// --- Content Dictionary ---
const content = {
  en: {
    brand: "AETHERIA",
    brandSuffix: "HOSPITAL",
    navItems: [
      { label: "HOME", href: "#home" },
      { label: "VIRTUAL DOCTOR", href: "#doctor" },
      { label: "HEALTH MONITOR", href: "#monitor" },
      { label: "MED EQUIPMENT", href: "#equipment" },
      { label: "PHARMACY", href: "#pharmacy" },
      { label: "RESEARCH", href: "#research" }
    ],
    portal: "PATIENT PORTAL",
    hero: {
      status: "Civilization Protocol v2.5.0",
      titleStart: "FUTURE OF",
      titleEnd: "HEALING",
      subtitle: "Experience the convergence of quantum diagnostics and robotic surgery. Ensuring humanity's survival for the transition to Type II Civilization.",
      ctaPrimary: "SMART TRIAGE",
      ctaSecondary: "BOOK VISIT",
      stats: {
        accuracy: "Accuracy",
        latency: "Response",
        monitoring: "Monitoring"
      }
    },
    doctor: {
      title: "VIRTUAL DOCTOR",
      subtitle: "AI-Powered Diagnostic Interface",
      chatInit: "Hello, I am Dr. Aether. I have detected a slight irregularity in your cortisol levels. How are you feeling today?",
      userReply: "I've been feeling a bit fatigued lately.",
      inputPlaceholder: "Describe symptoms...",
      status: "ONLINE"
    },
    monitor: {
      title: "HEALTH MONITORING",
      subtitle: "Real-time Bio-Metric Telemetry",
      heartRate: "Heart Rate",
      bloodOxy: "Blood Oxygen",
      stress: "Stress Level",
      temp: "Body Temp",
      status: "STABLE"
    },
    equipment: {
      title: "MEDICAL EQUIPMENT",
      subtitle: "Next-Gen Cybernetics & Prosthetics",
      items: [
        { name: "Neuro-Link v4", type: "Implant", price: "₳ 5,000", desc: "Direct cortex interface for motor control restoration." },
        { name: "Exo-Spine Grade A", type: "Prosthetic", price: "₳ 12,500", desc: "Titanium alloy spinal reinforcement system." },
        { name: "Ocular HUD Lens", type: "Augment", price: "₳ 3,200", desc: "AR overlay contact lens with bio-scanner." }
      ],
      action: "Request Config"
    },
    pharmacy: {
      title: "SMART PHARMACY",
      subtitle: "Molecular Precision Medicine",
      items: [
        { name: "Regen-Gel", dose: "50mg", stock: "In Stock", desc: "Topical nanobot gel for instant wound closure." },
        { name: "Focus-X", dose: "10mg", stock: "Low Stock", desc: "Cognitive enhancer for extended neural activity." },
        { name: "Immuno-Boost", dose: "100ml", stock: "In Stock", desc: "Viral resistance booster shot." }
      ],
      action: "Dispense"
    },
    footer: {
      privacy: "Privacy Protocol",
      terms: "Terms of Admission",
      status: "System Status"
    }
  },
  cn: {
    brand: "AETHERIA",
    brandSuffix: "未来医院",
    navItems: [
      { label: "首页", href: "#home" },
      { label: "虚拟医生", href: "#doctor" },
      { label: "健康监测", href: "#monitor" },
      { label: "医疗器材", href: "#equipment" },
      { label: "药店", href: "#pharmacy" },
      { label: "研究", href: "#research" }
    ],
    portal: "患者入口",
    hero: {
      status: "文明协议运行中 v2.5.0",
      titleStart: "未来智慧",
      titleEnd: "医疗中心",
      subtitle: "体验量子诊断与机器人手术的完美融合。守护人类生命，助力文明向二级、三级跨越。",
      ctaPrimary: "智能导诊",
      ctaSecondary: "预约挂号",
      stats: {
        accuracy: "诊断准确率",
        latency: "响应速度",
        monitoring: "全天候监护"
      }
    },
    doctor: {
      title: "虚拟医生",
      subtitle: "AI 驱动的智能诊断接口",
      chatInit: "您好，我是 Aether 医生。监测到您的皮质醇水平略有异常，请问您今天感觉如何？",
      userReply: "最近感觉有点疲劳。",
      inputPlaceholder: "描述您的症状...",
      status: "在线"
    },
    monitor: {
      title: "健康监测",
      subtitle: "实时生物体征遥测系统",
      heartRate: "心率",
      bloodOxy: "血氧",
      stress: "压力指数",
      temp: "体温",
      status: "稳定"
    },
    equipment: {
      title: "医疗器材",
      subtitle: "下一代仿生与义肢技术",
      items: [
        { name: "神经连接器 v4", type: "植入体", price: "₳ 5,000", desc: "用于运动控制恢复的皮层直接接口。" },
        { name: "外骨骼脊柱 A级", type: "义肢", price: "₳ 12,500", desc: "钛合金脊柱强化系统。" },
        { name: "全息 HUD 晶体", type: "增强件", price: "₳ 3,200", desc: "带有生物扫描功能的 AR 隐形眼镜。" }
      ],
      action: "请求配置"
    },
    pharmacy: {
      title: "智能药房",
      subtitle: "分子级精准医疗",
      items: [
        { name: "再生凝胶", dose: "50mg", stock: "有货", desc: "用于伤口即时愈合的纳米机器人凝胶。" },
        { name: "专注力-X", dose: "10mg", stock: "库存紧张", desc: "用于延长神经活动的认知增强剂。" },
        { name: "免疫增强剂", dose: "100ml", stock: "有货", desc: "病毒抵抗力增强注射液。" }
      ],
      action: "配药"
    },
    footer: {
      privacy: "隐私协议",
      terms: "入院须知",
      status: "系统状态"
    }
  }
};

// --- Sub-Components ---

const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="mb-12 text-center">
    <div className="inline-block px-3 py-1 mb-4 border border-cyan-500/30 rounded-full bg-cyan-950/30 text-cyan-400 text-xs font-bold tracking-[0.2em]">
      /// SYSTEM MODULE
    </div>
    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-2 text-glow">{title}</h2>
    <p className="text-cyan-100/50 font-sans tracking-wide">{subtitle}</p>
  </div>
);

const DoctorInterface = ({ data }: { data: any }) => (
  <div className="flex flex-col lg:flex-row gap-8 h-[600px] w-full">
    {/* Left: AI Avatar Visualization */}
    <div className="flex-1 glass-panel rounded-2xl p-8 relative overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute top-4 left-4 flex items-center gap-2">
         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
         <span className="text-xs text-green-400 font-mono">{data.status}</span>
      </div>
      <div className="relative w-64 h-64">
         <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin-slow"></div>
         <div className="absolute inset-4 rounded-full border-2 border-cyan-500/10 border-b-cyan-300 animate-spin-reverse-slow"></div>
         <div className="absolute inset-0 flex items-center justify-center">
            <Brain className="w-24 h-24 text-cyan-400 animate-pulse" />
         </div>
      </div>
      <div className="mt-8 text-center">
        <h3 className="text-xl font-display font-bold text-white">Dr. Aether</h3>
        <p className="text-sm text-cyan-400/60">Senior AI Diagnostician</p>
      </div>
      {/* Decorative Waveform */}
      <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end justify-center gap-1 p-4 opacity-30">
        {[...Array(20)].map((_, i) => (
           <div key={i} className="w-2 bg-cyan-500 animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}></div>
        ))}
      </div>
    </div>

    {/* Right: Chat Interface */}
    <div className="flex-1 glass-panel rounded-2xl flex flex-col overflow-hidden border border-cyan-500/30">
      <div className="bg-cyan-950/50 p-4 border-b border-cyan-500/20 flex justify-between items-center">
         <span className="font-display font-bold text-cyan-100">SESSION ID: #8821-X</span>
         <MoreHorizontalDots />
      </div>
      
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
         {/* AI Message */}
         <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-cyan-900/50 border border-cyan-500/50 flex items-center justify-center shrink-0">
               <Brain className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="bg-cyan-900/20 border border-cyan-500/10 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
               <p className="text-cyan-100 text-sm leading-relaxed">{data.chatInit}</p>
            </div>
         </div>

         {/* User Message */}
         <div className="flex gap-4 flex-row-reverse">
            <div className="w-10 h-10 rounded-full bg-slate-700 border border-slate-500 flex items-center justify-center shrink-0">
               <UserPlus className="w-5 h-5 text-white" />
            </div>
            <div className="bg-slate-800/50 border border-slate-600/30 rounded-2xl rounded-tr-none p-4 max-w-[80%]">
               <p className="text-slate-200 text-sm">{data.userReply}</p>
            </div>
         </div>
         
         {/* Typing Indicator */}
         <div className="flex gap-2 items-center ml-14 opacity-50">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></div>
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-75"></div>
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-150"></div>
         </div>
      </div>

      <div className="p-4 bg-cyan-950/30 border-t border-cyan-500/20">
         <div className="flex gap-2">
            <div className="flex-1 relative">
               <input 
                  type="text" 
                  placeholder={data.inputPlaceholder}
                  className="w-full bg-slate-900/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-sm text-cyan-100 focus:outline-none focus:border-cyan-400 transition-colors"
               />
            </div>
            <button className="p-3 rounded-lg bg-cyan-900/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-colors">
               <Mic className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-lg bg-cyan-500 text-black hover:bg-cyan-400 transition-colors">
               <Send className="w-5 h-5" />
            </button>
         </div>
      </div>
    </div>
  </div>
);

const MonitorInterface = ({ data }: { data: any }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Heart Rate Card */}
      <div className="glass-panel p-6 rounded-xl relative overflow-hidden group">
         <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 text-cyan-400">
               <Heart className="w-5 h-5" />
               <span className="text-xs font-bold uppercase tracking-wider">{data.heartRate}</span>
            </div>
            <span className="text-green-400 text-[10px] animate-pulse">● {data.status}</span>
         </div>
         <div className="flex items-end gap-2 mb-4">
            <span className="text-4xl font-display font-bold text-white">72</span>
            <span className="text-sm text-cyan-500/60 mb-1">BPM</span>
         </div>
         {/* CSS ECG Animation */}
         <div className="h-16 w-full bg-cyan-950/30 rounded overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full w-full">
               <svg viewBox="0 0 300 100" className="h-full w-full stroke-cyan-500 fill-none stroke-2">
                  <path d="M0,50 L20,50 L30,20 L40,80 L50,50 L100,50 L110,50 L120,10 L130,90 L140,50 L300,50" className="animate-dash" strokeDasharray="300" strokeDashoffset="300" />
               </svg>
            </div>
         </div>
      </div>

      {/* Blood Oxygen */}
      <div className="glass-panel p-6 rounded-xl relative overflow-hidden">
         <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 text-cyan-400">
               <Activity className="w-5 h-5" />
               <span className="text-xs font-bold uppercase tracking-wider">{data.bloodOxy}</span>
            </div>
         </div>
         <div className="flex items-end gap-2 mb-6">
            <span className="text-4xl font-display font-bold text-white">98</span>
            <span className="text-sm text-cyan-500/60 mb-1">%</span>
         </div>
         <div className="w-full bg-cyan-950 rounded-full h-2">
            <div className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-2 rounded-full w-[98%] shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
         </div>
      </div>

      {/* Stress Level */}
      <div className="glass-panel p-6 rounded-xl relative overflow-hidden">
         <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 text-orange-400">
               <TrendingUp className="w-5 h-5" />
               <span className="text-xs font-bold uppercase tracking-wider">{data.stress}</span>
            </div>
         </div>
         <div className="flex items-end gap-2 mb-6">
            <span className="text-4xl font-display font-bold text-white">12</span>
            <span className="text-sm text-cyan-500/60 mb-1">LOW</span>
         </div>
         <div className="flex gap-1 h-2">
            {[...Array(10)].map((_, i) => (
               <div key={i} className={`flex-1 rounded-sm ${i < 2 ? 'bg-orange-500' : 'bg-cyan-900/30'}`}></div>
            ))}
         </div>
      </div>

      {/* Body Temp */}
      <div className="glass-panel p-6 rounded-xl relative overflow-hidden">
         <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 text-cyan-400">
               <Thermometer className="w-5 h-5" />
               <span className="text-xs font-bold uppercase tracking-wider">{data.temp}</span>
            </div>
         </div>
         <div className="flex items-end gap-2 mb-6">
            <span className="text-4xl font-display font-bold text-white">36.6</span>
            <span className="text-sm text-cyan-500/60 mb-1">°C</span>
         </div>
         <div className="relative h-2 w-full bg-cyan-950 rounded-full">
            <div className="absolute top-0 bottom-0 left-[40%] right-[40%] bg-cyan-500/20"></div> {/* Normal Range Marker */}
            <div className="absolute top-1/2 left-[50%] w-3 h-3 bg-white rounded-full transform -translate-y-1/2 shadow-lg"></div>
         </div>
      </div>
  </div>
);

const EquipmentInterface = ({ data }: { data: any }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     {data.items.map((item: any, idx: number) => (
        <div key={idx} className="glass-panel p-0 rounded-xl overflow-hidden group hover:border-cyan-400/50 transition-colors">
           <div className="h-48 bg-cyan-950/30 relative flex items-center justify-center border-b border-cyan-500/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {idx === 0 && <Cpu className="w-16 h-16 text-cyan-400 opacity-80 group-hover:scale-110 transition-transform duration-500" />}
              {idx === 1 && <ShieldCheck className="w-16 h-16 text-cyan-400 opacity-80 group-hover:scale-110 transition-transform duration-500" />}
              {idx === 2 && <ScanIcon className="w-16 h-16 text-cyan-400 opacity-80 group-hover:scale-110 transition-transform duration-500" />}
           </div>
           <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                 <div>
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">{item.name}</h3>
                    <span className="text-xs text-cyan-500 uppercase tracking-wider">{item.type}</span>
                 </div>
                 <span className="text-cyan-400 font-mono font-bold">{item.price}</span>
              </div>
              <p className="text-sm text-cyan-100/60 mb-6 line-clamp-2">{item.desc}</p>
              <button className="w-full py-2 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-black font-bold uppercase text-xs tracking-widest border border-cyan-500/50 transition-all rounded">
                 {data.action}
              </button>
           </div>
        </div>
     ))}
  </div>
);

const PharmacyInterface = ({ data }: { data: any }) => (
   <div className="glass-panel rounded-xl overflow-hidden">
      <div className="grid grid-cols-12 gap-4 p-4 border-b border-cyan-500/20 bg-cyan-950/30 text-xs font-bold text-cyan-500 uppercase tracking-wider">
         <div className="col-span-6 md:col-span-4">Item</div>
         <div className="col-span-3 md:col-span-2 text-center">Dosage</div>
         <div className="col-span-3 md:col-span-2 text-center">Stock</div>
         <div className="hidden md:block col-span-3">Description</div>
         <div className="col-span-12 md:col-span-1"></div>
      </div>
      <div className="divide-y divide-cyan-500/10">
         {data.items.map((item: any, idx: number) => (
            <div key={idx} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-cyan-500/5 transition-colors group">
               <div className="col-span-6 md:col-span-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-cyan-900/50 flex items-center justify-center text-cyan-400">
                     <Pill className="w-4 h-4" />
                  </div>
                  <span className="font-display font-bold text-white">{item.name}</span>
               </div>
               <div className="col-span-3 md:col-span-2 text-center text-cyan-100/70 font-mono">{item.dose}</div>
               <div className="col-span-3 md:col-span-2 text-center">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${item.stock.includes('Low') || item.stock.includes('紧张') ? 'bg-orange-500/20 text-orange-400' : 'bg-green-500/20 text-green-400'}`}>
                     {item.stock}
                  </span>
               </div>
               <div className="hidden md:block col-span-3 text-xs text-cyan-100/50 truncate">{item.desc}</div>
               <div className="col-span-12 md:col-span-1 flex justify-end">
                  <button className="p-2 rounded hover:bg-cyan-500 hover:text-black text-cyan-400 transition-colors" title={data.action}>
                     <ShoppingCart className="w-4 h-4" />
                  </button>
               </div>
            </div>
         ))}
      </div>
   </div>
);

const MoreHorizontalDots = () => (
  <div className="flex gap-1">
    <div className="w-1 h-1 bg-cyan-500 rounded-full"></div>
    <div className="w-1 h-1 bg-cyan-500 rounded-full"></div>
    <div className="w-1 h-1 bg-cyan-500 rounded-full"></div>
  </div>
);

// Small utility for scan icon since Lucide Scan is generic
const ScanIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
  </svg>
)

const NavLink: React.FC<{ text: string; href: string }> = ({ text, href }) => (
  <a href={href} className="relative text-cyan-100/70 hover:text-cyan-400 transition-colors duration-300 text-xs xl:text-sm font-medium tracking-wide group whitespace-nowrap">
    {text}
    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
  </a>
);

// --- Main App Component ---

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState<Lang>('cn'); // Default to Chinese
  
  const t = content[lang];
  
  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'cn' : 'en');
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-200 scroll-smooth">
      <ParticleBackground />
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 glass-panel border-b border-white/5 top-0 left-0 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-4 xl:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer shrink-0">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute w-full h-full bg-cyan-500/20 rounded-full animate-ping"></div>
              <Cross className="w-6 h-6 text-cyan-400 relative z-10" />
            </div>
            <span className="text-xl md:text-2xl font-display font-bold text-white tracking-widest">
              {t.brand} <span className="text-cyan-500 hidden sm:inline">{t.brandSuffix}</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8 overflow-x-auto no-scrollbar mx-4">
            {t.navItems.map((item, index) => (
              <NavLink key={index} text={item.label} href={item.href} />
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <button 
              onClick={toggleLang}
              className="flex items-center gap-1 text-cyan-400 hover:text-white transition-colors text-xs font-bold px-3 py-1 border border-cyan-500/30 rounded hover:bg-cyan-900/30"
            >
              <Languages className="w-3 h-3" />
              {lang === 'en' ? 'CN' : 'EN'}
            </button>
            <button className="flex items-center gap-2 px-5 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/50 rounded-none clip-path-slant text-cyan-400 hover:text-white transition-all duration-300 group whitespace-nowrap">
              <UserPlus className="w-4 h-4" />
              <span className="font-display text-sm font-bold">{t.portal}</span>
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 lg:hidden">
            <button 
                onClick={toggleLang}
                className="flex items-center gap-1 text-cyan-400 text-xs font-bold border border-cyan-500/30 px-2 py-1 rounded"
              >
                {lang === 'en' ? 'CN' : 'EN'}
            </button>
            <button className="text-cyan-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full glass-panel border-b border-white/10 py-6 px-6 flex flex-col gap-4 animate-scan z-40 bg-slate-950/95 h-screen md:h-auto overflow-y-auto">
             {t.navItems.map((item, index) => (
                <NavLink key={index} text={item.label} href={item.href} />
             ))}
            <div className="h-[1px] bg-white/10 w-full my-2"></div>
            <button className="flex items-center justify-center gap-2 px-5 py-3 bg-cyan-500/20 text-cyan-400 font-bold w-full rounded border border-cyan-500/50">
              {t.portal}
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-20">
        
        {/* SECTION: HERO (#home) */}
        <section id="home" className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto px-6 gap-12 lg:gap-0 relative">
          
          <div className="flex-1 space-y-8 mt-12 lg:mt-0 relative z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-900/10 text-cyan-400 text-xs font-bold tracking-widest uppercase animate-pulse">
              <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
              {t.hero.status}
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-display font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-500 text-glow">
              {t.hero.titleStart} <br />
              {t.hero.titleEnd}
            </h1>
            
            <p className="text-lg text-cyan-100/60 max-w-lg leading-relaxed">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-display font-bold tracking-wider rounded-sm clip-path-slant transition-all hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.5)] flex items-center justify-center gap-2">
                <Stethoscope className="w-5 h-5" />
                {t.hero.ctaPrimary}
              </button>
              <button className="px-8 py-4 border border-cyan-500/50 hover:bg-cyan-500/10 text-cyan-400 font-display font-bold tracking-wider rounded-sm clip-path-slant transition-all hover:text-white flex items-center justify-center gap-2">
                {t.hero.ctaSecondary}
              </button>
            </div>

            <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-cyan-800 to-transparent hidden lg:block"></div>
            <div className="flex items-center gap-8 pt-8 opacity-70">
               <div>
                 <div className="text-2xl font-display font-bold text-white">99.9%</div>
                 <div className="text-xs text-cyan-500 uppercase">{t.hero.stats.accuracy}</div>
               </div>
               <div>
                 <div className="text-2xl font-display font-bold text-white">4ms</div>
                 <div className="text-xs text-cyan-500 uppercase">{t.hero.stats.latency}</div>
               </div>
               <div>
                 <div className="text-2xl font-display font-bold text-white">24/7</div>
                 <div className="text-xs text-cyan-500 uppercase">{t.hero.stats.monitoring}</div>
               </div>
            </div>
          </div>

          <div className="flex-1 w-full flex justify-center lg:justify-end relative z-10 pointer-events-none lg:pointer-events-auto">
            <Hologram lang={lang} />
          </div>
        </section>

        {/* SECTION: VIRTUAL DOCTOR (#doctor) */}
        <section id="doctor" className="py-24 max-w-7xl mx-auto px-6 border-t border-cyan-500/10">
           <SectionHeader title={t.doctor.title} subtitle={t.doctor.subtitle} />
           <DoctorInterface data={t.doctor} />
        </section>

        {/* SECTION: HEALTH MONITORING (#monitor) */}
        <section id="monitor" className="py-24 max-w-7xl mx-auto px-6 bg-cyan-900/5">
           <SectionHeader title={t.monitor.title} subtitle={t.monitor.subtitle} />
           <MonitorInterface data={t.monitor} />
        </section>

        {/* SECTION: MEDICAL EQUIPMENT (#equipment) */}
        <section id="equipment" className="py-24 max-w-7xl mx-auto px-6 border-t border-cyan-500/10">
           <SectionHeader title={t.equipment.title} subtitle={t.equipment.subtitle} />
           <EquipmentInterface data={t.equipment} />
        </section>

         {/* SECTION: PHARMACY (#pharmacy) */}
         <section id="pharmacy" className="py-24 max-w-7xl mx-auto px-6 bg-cyan-900/5 mb-24">
           <SectionHeader title={t.pharmacy.title} subtitle={t.pharmacy.subtitle} />
           <PharmacyInterface data={t.pharmacy} />
        </section>

        {/* Footer */}
        <footer className="border-t border-cyan-900/30 bg-slate-950/80 backdrop-blur-md pt-12 pb-6">
           <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                 <div className="flex items-center gap-2">
                    <Cross className="w-6 h-6 text-cyan-600" />
                    <span className="font-display font-bold text-lg text-cyan-900">{t.brand}</span>
                 </div>
                 <div className="flex gap-6 text-sm text-cyan-800">
                    <a href="#" className="hover:text-cyan-500 transition-colors">{t.footer.privacy}</a>
                    <a href="#" className="hover:text-cyan-500 transition-colors">{t.footer.terms}</a>
                    <a href="#" className="hover:text-cyan-500 transition-colors">{t.footer.status}</a>
                 </div>
              </div>
              <div className="text-center text-xs text-cyan-950/50 font-mono">
                 © 2077 AETHERIA MEDICAL SYSTEMS. ALL RIGHTS RESERVED.
              </div>
           </div>
        </footer>

      </main>

      {/* Global CSS injection for specific shapes/animations */}
      <style>{`
        .clip-path-slant {
          clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .animate-dash {
          animation: dash 3s linear infinite;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default App;