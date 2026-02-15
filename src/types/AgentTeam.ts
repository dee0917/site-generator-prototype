export type AgentRole =
    | 'Project Orchestrator'
    | 'Chief Creative Director'
    | 'Lead Full-Stack Architect'
    | 'Content Strategist'
    | 'QA & Compliance';

export interface Skill {
    id: string;
    name: string;
    description: string;
}

export interface Agent {
    id: string;
    name: string;
    role: AgentRole;
    skills: string[];
    status: 'idle' | 'working' | 'completed';
    currentTask?: string;
}

export interface AgentLog {
    timestamp: number;
    agentId: string;
    message: string;
    artifact?: string; // e.g., "Generated Theme Config"
}
