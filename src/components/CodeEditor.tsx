import React from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { Loader2 } from 'lucide-react';

interface CodeEditorProps {
    code: string;
    onChange: (value: string | undefined) => void;
    language?: string;
    height?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
    code,
    onChange,
    language = 'python',
    height = '400px'
}) => {
    const { theme } = useTheme();

    // Determine Monaco theme based on next-themes
    // 'vs-dark' is built-in, 'light' is built-in
    const monacoTheme = theme === 'dark' ? 'vs-dark' : 'light';

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        // Configure editor settings if needed
        editor.updateOptions({
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
            padding: { top: 16, bottom: 16 },
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            formatOnPaste: true,
            formatOnType: true,
        });
    };

    return (
        <div className={`relative rounded-lg border overflow-hidden ${theme === 'dark' ? 'border-purple-500/30' : 'border-gray-200'}`}>
            <Editor
                height={height}
                language={language}
                value={code}
                theme={monacoTheme}
                onChange={onChange}
                onMount={handleEditorDidMount}
                loading={
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
                        <span className="ml-2 text-sm text-gray-500">Loading editor...</span>
                    </div>
                }
                options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 14,
                    wordWrap: 'on',
                    automaticLayout: true,
                    padding: { top: 16, bottom: 16 },
                    mouseWheelZoom: true,
                    // Ensure internal keybindings don't block typing
                    tabCompletion: 'on',
                    acceptSuggestionOnEnter: 'on',
                    quickSuggestions: true,
                }}
            />
        </div>
    );
};

export default CodeEditor;
