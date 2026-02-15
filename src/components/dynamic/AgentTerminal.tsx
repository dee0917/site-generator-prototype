import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, CheckCircle2, Circle, Loader2, Cpu, Activity, Zap } from 'lucide-react';
import { Agent, AgentLog } from '../../types/AgentTeam';
import { cn } from '../../lib/utils';

interface AgentTerminalProps {
    agents: Agent[];
    logs: AgentLog[];
}

export const AgentTerminal: React.FC<AgentTerminalProps> = ({ agents, logs }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl font-mono text-sm relative group">
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-[#0d1117]/95 backdrop-blur-md z-0" />
            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />

            {/* Content Container */}
            <div className="relative z-20 flex flex-col h-[500px]">

                {/* Header */}
                <div className="bg-[#161b22]/80 px-4 py-3 flex items-center justify-between border-b border-gray-800 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400">
                            <Cpu size={16} />
                        </div>
                        <div>
                            <span className="block text-xs text-gray-500 uppercase tracking-widest">System</span>
                            <span className="block text-gray-200 font-bold tracking-tight">VITA_ENGINE_CORE</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                            <Activity size={12} className="text-green-400 animate-pulse" />
                            <span className="text-[10px] text-green-400 font-medium">ONLINE</span>
                        </div>
                        <div className="flex gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-gray-600" />
                            <div className="w-2 h-2 rounded-full bg-gray-600" />
                        </div>
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">

                    {/* Left Panel: Agent Matrix */}
                    <div className="md:col-span-4 bg-[#0d1117]/50 border-r border-gray-800 p-4 overflow-y-auto custom-scrollbar">
                        <div className="flex items-center gap-2 mb-6">
                            <Terminal size={12} className="text-gray-500" />
                            <h3 className="text-gray-500 text-xs uppercase tracking-wider font-bold">Neural Link Status</h3>
                        </div>

                        <div className="space-y-3">
                            {agents.map(agent => (
                                <motion.div
                                    key={agent.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={cn(
                                        "p-3 rounded border transition-all duration-300 relative overflow-hidden",
                                        agent.status === 'working' ? "bg-blue-500/5 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]" :
                                            agent.status === 'completed' ? "bg-green-500/5 border-green-500/30" :
                                                "bg-gray-800/20 border-gray-800/50"
                                    )}
                                >
                                    {/* Active Progress Bar Background */}
                                    {agent.status === 'working' && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 h-0.5 bg-blue-500"
                                            initial={{ width: "0%" }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    )}

                                    <div className="flex items-center justify-between mb-2">
                                        <span className={cn(
                                            "font-bold text-xs truncate uppercase tracking-tight",
                                            agent.status === 'working' ? "text-blue-300" :
                                                agent.status === 'completed' ? "text-green-300" :
                                                    "text-gray-500"
                                        )}>
                                            {agent.role}
                                        </span>
                                        {agent.status === 'working' && <Loader2 size={12} className="animate-spin text-blue-400" />}
                                        {agent.status === 'completed' && <CheckCircle2 size={12} className="text-green-400" />}
                                        {agent.status === 'idle' && <Circle size={12} className="text-gray-700" />}
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] text-gray-500 uppercase">
                                            {agent.status === 'working' ? 'Processing...' : agent.status}
                                        </span>
                                        <span className="text-[9px] font-mono text-gray-600">ID: {agent.id.slice(0, 4)}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Panel: Live Logs */}
                    <div className="md:col-span-8 bg-[#080a0f] p-4 font-mono text-xs relative overflow-hidden flex flex-col">
                        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#080a0f] to-transparent z-10 pointer-events-none" />

                        <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar" ref={scrollRef}>
                            <AnimatePresence initial={false}>
                                {logs.map((log, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex gap-3 hover:bg-white/5 p-1 rounded transition-colors group/log"
                                    >
                                        <span className="text-gray-600 select-none font-light">
                                            {new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                        </span>
                                        <div className="flex-1">
                                            <span className={cn(
                                                "font-bold mr-2 uppercase text-[10px] px-1.5 py-0.5 rounded",
                                                log.agentId === 'orch' ? 'bg-purple-500/10 text-purple-400' :
                                                    log.agentId === 'creative' ? 'bg-pink-500/10 text-pink-400' :
                                                        log.agentId === 'architect' ? 'bg-blue-500/10 text-blue-400' :
                                                            log.agentId === 'content' ? 'bg-yellow-500/10 text-yellow-400' :
                                                                'bg-green-500/10 text-green-400'
                                            )}>
                                                {agents.find(a => a.id === log.agentId)?.role || 'SYSTEM'}
                                            </span>
                                            <span className="text-gray-300 group-hover/log:text-white transition-colors">
                                                {log.message}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {logs.length === 0 && (
                                <div className="h-full flex flex-col items-center justify-center text-gray-700">
                                    <Zap size={24} className="mb-2 opacity-50" />
                                    <span className="animate-pulse">AWAITING INPUT_STREAM...</span>
                                </div>
                            )}
                        </div>

                        {/* Input Simulation Line */}
                        {(agents.some(a => a.status === 'working')) && (
                            <div className="mt-2 flex items-center gap-2 text-blue-500/50 pt-2 border-t border-gray-800/50">
                                <span className="animate-pulse">▋</span>
                                <span>PROCESSING_THREAD_ACTIVE</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
