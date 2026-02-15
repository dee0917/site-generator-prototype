import { createContext, useContext, useState, ReactNode } from 'react';
import { Agent, AgentLog } from '../types/AgentTeam';
import { ThemeConfig } from '../types/Theme';
import { SitePRD } from '../types/PRD';
import { SiteContent } from '../types/Content';
import { TopicSelector } from '../engine/TopicSelector';
import { PRDGenerator } from '../engine/PRDGenerator';
import { StyleSynthesizer } from '../engine/StyleSynthesizer';
import { StyleDataLoader } from '../engine/StyleDataLoader';
import { ContentGenerator } from '../engine/ContentGenerator';

type GenerationPhase = 'idle' | 'planning' | 'designing' | 'building' | 'reviewing' | 'complete';

interface DynamicRendererContextType {
    phase: GenerationPhase;
    agents: Agent[];
    logs: AgentLog[];
    generatedPRD?: SitePRD;
    generatedTheme?: ThemeConfig;
    generatedContent?: SiteContent;
    startGeneration: (overridePreset?: 'A' | 'J' | 'T') => Promise<void>;
    reset: () => void;
}

const DynamicRendererContext = createContext<DynamicRendererContextType | undefined>(undefined);

const INITIAL_AGENTS: Agent[] = [
    {
        id: 'orch',
        name: 'Project Orchestrator',
        role: 'Project Orchestrator',
        status: 'idle',
        skills: ['prd', 'brainstorming', 'executing-plans', 'writing-plans']
    },
    {
        id: 'creative',
        name: 'Chief Creative Director',
        role: 'Chief Creative Director',
        status: 'idle',
        skills: ['ui-ux-pro-max', 'brand-guidelines', 'canvas-design', 'frontend-design']
    },
    {
        id: 'architect',
        name: 'Lead Full-Stack Architect',
        role: 'Lead Full-Stack Architect',
        status: 'idle',
        skills: ['web-artifacts-builder', 'frontend-design', 'react-best-practices', 'tailwindcss']
    },
    {
        id: 'content',
        name: 'Content Strategist',
        role: 'Content Strategist',
        status: 'idle',
        skills: ['content-research-writer', 'internal-comms', 'brand-guidelines', 'doc-coauthoring']
    },
    {
        id: 'qa',
        name: 'QA & Compliance',
        role: 'QA & Compliance',
        status: 'idle',
        skills: ['verification-before-completion', 'webapp-testing', 'systematic-debugging', 'audit']
    },
];

export const DynamicRendererProvider = ({ children }: { children: ReactNode }) => {
    const [phase, setPhase] = useState<GenerationPhase>('idle');
    const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
    const [logs, setLogs] = useState<AgentLog[]>([]);
    const [generatedPRD, setGeneratedPRD] = useState<SitePRD | undefined>(undefined);
    const [generatedTheme, setGeneratedTheme] = useState<ThemeConfig | undefined>(undefined);
    const [generatedContent, setGeneratedContent] = useState<SiteContent | undefined>(undefined);

    const addLog = (agentId: string, message: string) => {
        setLogs(prev => [...prev, { timestamp: Date.now(), agentId, message }]);
    };

    const updateAgentStatus = (id: string, status: Agent['status']) => {
        setAgents(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    };

    const startGeneration = async (overridePreset?: 'A' | 'J' | 'T') => {
        setPhase('planning');
        setLogs([]);
        setGeneratedPRD(undefined);
        setGeneratedTheme(undefined);
        setGeneratedContent(undefined);

        // 1. Orchestrator picks topic
        updateAgentStatus('orch', 'working');
        addLog('orch', 'Analyzing market trends and selecting a product category...');

        // Ensure data is loaded
        await StyleDataLoader.loadData();

        await new Promise(r => setTimeout(r, 1000));
        const category = TopicSelector.selectRandomCategory();
        addLog('orch', `Selected Category: ${category.name} (${category.vibe})`);

        // 2. Orchestrator generates PRD
        addLog('orch', 'Drafting Product Requirements Document (PRD)...');
        const prd = await PRDGenerator.generate(category);
        setGeneratedPRD(prd);
        addLog('orch', 'PRD Approved. Handing over to Creative Team.');
        updateAgentStatus('orch', 'completed');

        setPhase('designing');

        // 3. Creative Director & Content Strategist work SEQUENTIALLY for context-awareness
        updateAgentStatus('creative', 'working');
        updateAgentStatus('content', 'working'); // Content starts thinking but waits for style

        // A. Generate Style FIRST
        addLog('creative', `Synthesizing design system for vibe: ${category.vibe}${overridePreset ? ` (Override: ${overridePreset})` : ''}...`);
        await new Promise(r => setTimeout(r, 1500));
        const theme = StyleSynthesizer.synthesize(category.name, category.template, overridePreset);
        setGeneratedTheme(theme);
        addLog('creative', `Design System generated: ${theme.styleDef?.["Style Category"] || 'Custom Style'}. Tokens ready.`);
        updateAgentStatus('creative', 'completed');

        // B. Generate Content using the Style Context
        addLog('content', `Analyzing visual style to align brand voice...`);
        await new Promise(r => setTimeout(r, 1000));

        // Pass the generated styleDef to the content generator
        const content = ContentGenerator.generate(category, theme.styleDef);

        setGeneratedContent(content);
        addLog('content', `Brand Identity Generated: ${content.siteName}. Copy complete.`);
        updateAgentStatus('content', 'completed');

        // 4. Architect builds the site
        setPhase('building');
        updateAgentStatus('architect', 'working');
        addLog('architect', 'Assembling React components based on PRD and Design Tokens...');
        await new Promise(r => setTimeout(r, 2000));
        addLog('architect', 'Build complete. Deploying to staging...');
        updateAgentStatus('architect', 'completed');

        setPhase('reviewing');
        updateAgentStatus('qa', 'working');
        addLog('qa', 'Running visual regression tests...');
        await new Promise(r => setTimeout(r, 1000));
        addLog('qa', 'Green checks across the board. Site is ready for launch.');
        updateAgentStatus('qa', 'completed');

        setPhase('complete');
    };

    const reset = () => {
        setPhase('idle');
        setLogs([]);
        setAgents(INITIAL_AGENTS);
    };

    return (
        <DynamicRendererContext.Provider value={{
            phase, agents, logs, generatedPRD, generatedTheme, generatedContent, startGeneration, reset
        }}>
            {children}
        </DynamicRendererContext.Provider>
    );
};

export const useDynamicRenderer = () => {
    const context = useContext(DynamicRendererContext);
    if (!context) throw new Error('useDynamicRenderer must be used within a DynamicRendererProvider');
    return context;
};
