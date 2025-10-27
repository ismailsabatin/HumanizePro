
import React, { useState, useEffect, useCallback } from 'react';
import { Language, Tone, AnalysisResult } from './types';
import { analyzeText, humanizeText } from './services/geminiService';
import Header from './components/Header';
import Controls from './components/Controls';
import TextInput from './components/TextInput';
import ResultPanel from './components/ResultPanel';
import { BrainCircuitIcon } from './components/icons';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [inputText, setInputText] = useState<string>('');
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [tone, setTone] = useState<Tone>(Tone.CASUAL);
  const [output, setOutput] = useState<AnalysisResult | string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'analysis' | 'humanized'>('humanized');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleAnalyze = useCallback(async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setError(null);
    setOutput(null);
    setActiveTab('analysis');
    setCopied(false);
    try {
      const result = await analyzeText(inputText);
      setOutput(result);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);

  const handleHumanize = useCallback(async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setError(null);
    setOutput(null);
    setActiveTab('humanized');
    setCopied(false);
    try {
      const result = await humanizeText(inputText, language, tone);
      setOutput(result);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText, language, tone]);
  
  const handleCopy = useCallback(() => {
    if (typeof output === 'string') {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [output]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans transition-colors duration-300">
      <div className="relative isolate min-h-screen">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-slate-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
        </div>

        <Header theme={theme} setTheme={setTheme} />
        <main className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto flex flex-col gap-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text pb-2">
                HumanizePro
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                Transform AI text into authentic, human-like content.
              </p>
            </div>

            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-slate-200 dark:border-slate-700 rounded-2xl shadow-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  <Controls language={language} setLanguage={setLanguage} tone={tone} setTone={setTone} />
                  <TextInput value={inputText} onChange={setInputText} />
                </div>
                <div className="flex flex-col">
                  <ResultPanel
                    output={output}
                    isLoading={isLoading}
                    error={error}
                    activeTab={activeTab}
                    onCopy={handleCopy}
                    copied={copied}
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-center">
                <button
                  onClick={handleAnalyze}
                  disabled={isLoading || !inputText}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 font-semibold text-slate-700 bg-slate-200 dark:text-slate-200 dark:bg-slate-700 rounded-lg shadow-sm hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <BrainCircuitIcon className="w-5 h-5" />
                  Analyze Text
                </button>
                <button
                  onClick={handleHumanize}
                  disabled={isLoading || !inputText}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 transition-all duration-200 transform"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Humanize Text
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
