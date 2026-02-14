import React, { useRef, useEffect } from 'react';
import Editor, { OnMount, BeforeMount } from '@monaco-editor/react';
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
    const editorRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Determine Monaco theme based on next-themes
    const monacoTheme = theme === 'dark' ? 'vs-dark' : 'light';

    const handleBeforeMount: BeforeMount = (monaco) => {
        // Try to disable EditContext at the environment level
        (monaco.editor as any).EditorOptions?.experimentalEditContextEnabled?.defaultValue &&
            ((monaco.editor as any).EditorOptions.experimentalEditContextEnabled.defaultValue = false);
    };

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;

        // Configure editor settings
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

        // Workaround: Intercept 'a', 's', 'd' keydown events on the editor's DOM
        // and manually insert the character if the EditContext API drops it
        const editorDomNode = editor.getDomNode();
        if (editorDomNode) {
            editorDomNode.addEventListener('keydown', (e: KeyboardEvent) => {
                if (['a', 's', 'd'].includes(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) {
                    // Give Monaco a moment to handle it natively
                    const currentValue = editor.getValue();
                    setTimeout(() => {
                        // If the value didn't change, Monaco dropped the keypress
                        if (editor.getValue() === currentValue) {
                            // Manually insert the character
                            editor.trigger('keyboard', 'type', { text: e.key });
                        }
                    }, 50);
                }
            }, true);
        }
    };

    return (
        <div ref={containerRef} className={`relative rounded-lg border overflow-hidden ${theme === 'dark' ? 'border-purple-500/30' : 'border-gray-200'}`}>
            <Editor
                height={height}
                language={language}
                value={code}
                theme={monacoTheme}
                onChange={onChange}
                beforeMount={handleBeforeMount}
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
                    tabCompletion: 'on',
                    acceptSuggestionOnEnter: 'on',
                    quickSuggestions: true,
                    experimentalEditContextEnabled: false,
                } as any}
            />
        </div>
    );
};

export default CodeEditor;

