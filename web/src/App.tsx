import React, { useState } from 'react';
import { Terminal as TerminalIcon, Plus, X, Columns, Rows, Settings, Shield, Cpu, RefreshCw } from 'lucide-react';

interface TerminalTab {
  id: string;
  name: string;
  shell: string;
  pid: number;
  active: boolean;
}

export function App() {
  const [tabs, setTabs] = useState<TerminalTab[]>([
    { id: '1', name: 'zsh (main)', shell: '/bin/zsh', pid: 48921, active: true },
    { id: '2', name: 'build-daemon', shell: '/bin/bash', pid: 48934, active: false },
    { id: '3', name: 'htop', shell: '/bin/zsh', pid: 49012, active: false },
  ]);

  const [activeTabId, setActiveTabId] = useState<string>('1');
  const [splitMode, setSplitMode] = useState<'single' | 'horizontal' | 'vertical'>('single');
  const [theme, setTheme] = useState<'tokyo-night' | 'dracula' | 'monokai'>('tokyo-night');

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const handleAddTab = () => {
    const newId = String(Date.now());
    const newTab: TerminalTab = {
      id: newId,
      name: `zsh (${tabs.length + 1})`,
      shell: '/bin/zsh',
      pid: Math.floor(Math.random() * 20000) + 30000,
      active: true,
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newId);
  };

  const handleCloseTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length <= 1) return;
    const remaining = tabs.filter((t) => t.id !== id);
    setTabs(remaining);
    if (activeTabId === id) {
      setActiveTabId(remaining[0].id);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0F1115] text-[#C9D1D9] font-sans overflow-hidden">
      {/* Top Header / Tab Bar */}
      <div className="h-10 bg-[#161B22] border-b border-[#30363D] flex items-center justify-between px-3">
        <div className="flex items-center gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-t text-xs font-mono cursor-pointer border-t-2 ${
                tab.id === activeTabId
                  ? 'border-[#58A6FF] bg-[#0F1115] text-white font-medium'
                  : 'border-transparent text-gray-400 hover:bg-[#21262D] hover:text-gray-200'
              }`}
            >
              <TerminalIcon className="w-3.5 h-3.5 text-[#58A6FF]" />
              <span>{tab.name}</span>
              <span className="text-[10px] text-gray-500 font-normal">#{tab.pid}</span>
              {tabs.length > 1 && (
                <button
                  onClick={(e) => handleCloseTab(tab.id, e)}
                  className="hover:text-red-400 ml-1 rounded p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={handleAddTab}
            className="p-1 rounded text-gray-400 hover:text-white hover:bg-[#21262D] ml-1"
            title="Open New Terminal Tab"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Multiplexing & Layout Actions */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setSplitMode(splitMode === 'horizontal' ? 'single' : 'horizontal')}
            className={`p-1.5 rounded ${
              splitMode === 'horizontal' ? 'bg-[#21262D] text-[#58A6FF]' : 'text-gray-400 hover:text-white'
            }`}
            title="Split Horizontal"
          >
            <Rows className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setSplitMode(splitMode === 'vertical' ? 'single' : 'vertical')}
            className={`p-1.5 rounded ${
              splitMode === 'vertical' ? 'bg-[#21262D] text-[#58A6FF]' : 'text-gray-400 hover:text-white'
            }`}
            title="Split Vertical"
          >
            <Columns className="w-3.5 h-3.5" />
          </button>
          <div className="h-4 w-[1px] bg-[#30363D] mx-1" />
          <div className="flex items-center gap-1.5 text-gray-400">
            <Cpu className="w-3.5 h-3.5 text-[#3FB950]" />
            <span className="text-[11px] font-mono">PTY: Active</span>
          </div>
        </div>
      </div>

      {/* Terminal Viewport */}
      <div className={`flex-1 flex overflow-hidden ${splitMode === 'vertical' ? 'flex-row' : 'flex-col'}`}>
        {/* Primary Pane */}
        <div className="flex-1 bg-[#0F1115] p-4 font-mono text-xs overflow-y-auto leading-relaxed border-r border-[#30363D]">
          <div className="text-gray-500 mb-2">
            [Forge Terminal Supervisor v0.1.0] Authenticated PTY session connected on {activeTab.shell} (PID: {activeTab.pid})
          </div>
          <div className="text-[#3FB950] font-semibold">
            manish@forgenexa-mbp <span className="text-[#58A6FF]">~/workspaces/forge</span> <span className="text-gray-400">(main)</span> $
          </div>
          <div className="text-white mt-1">go test -v -race ./...</div>
          <div className="text-gray-400 mt-1">
            === RUN   TestPTY_StartExecuteAndResize<br />
            --- PASS: TestPTY_StartExecuteAndResize (0.00s)<br />
            PASS<br />
            ok      github.com/ForgeNexa/forge-terminal/supervisor/pkg/pty  0.507s
          </div>
          <div className="text-[#3FB950] font-semibold mt-4">
            manish@forgenexa-mbp <span className="text-[#58A6FF]">~/workspaces/forge</span> <span className="text-gray-400">(main)</span> $
          </div>
          <div className="flex items-center gap-1 text-white mt-1">
            <span>git status</span>
            <span className="w-2 h-4 bg-[#58A6FF] animate-pulse inline-block" />
          </div>
        </div>

        {/* Optional Secondary Split Pane */}
        {splitMode !== 'single' && (
          <div className="flex-1 bg-[#0D1117] p-4 font-mono text-xs overflow-y-auto leading-relaxed border-t border-[#30363D]">
            <div className="text-gray-500 mb-2">
              [Split Pane 2] Auxiliary Process Monitor (GPU Renderer Active)
            </div>
            <div className="text-[#BC8CFF] font-semibold">
              manish@forgenexa-mbp <span className="text-[#3FB950]">~/workspaces/forge-terminal</span> $
            </div>
            <div className="text-white mt-1">pnpm run build</div>
            <div className="text-gray-400 mt-1">
              vite v6.4.5 building for production...<br />
              ✓ 2041 modules transformed.<br />
              dist/index.html   0.46 kB<br />
              dist/assets/index.js 238.54 kB<br />
              ✓ built in 853ms
            </div>
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="h-6 bg-[#161B22] border-t border-[#30363D] px-3 flex items-center justify-between text-[11px] text-gray-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-white">
            <Shield className="w-3 h-3 text-[#3FB950]" />
            Clean Child Process Supervision
          </span>
          <span>UTF-8 / xterm-256color</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Columns: 120 | Rows: 36</span>
          <span className="text-[#58A6FF]">ForgeNexa Terminal v0.1.0</span>
        </div>
      </div>
    </div>
  );
}
