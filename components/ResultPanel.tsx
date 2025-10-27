
import React from 'react';
import { AnalysisResult } from '../types';
import { CopyIcon, CheckIcon, SparklesIcon, AlertTriangleIcon } from './icons';

interface ResultPanelProps {
  output: AnalysisResult | string | null;
  isLoading: boolean;
  error: string | null;
  activeTab: 'analysis' | 'humanized';
  onCopy: () => void;
  copied: boolean;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center space-x-2">
        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse-fast"></div>
        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse-fast" style={{animationDelay: '0.2s'}}></div>
        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse-fast" style={{animationDelay: '0.4s'}}></div>
        <span className="text-slate-500 dark:text-slate-400">Thinking...</span>
    </div>
);

const AnalysisDisplay: React.FC<{ result: AnalysisResult }> = ({ result }) => (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <div className="relative w-40 h-40">
            <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                    className="text-slate-200 dark:text-slate-700"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                />
                <path
                    className="text-blue-500"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray={`${result.humanPercentage}, 100`}
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-blue-500">{Math.round(result.humanPercentage)}%</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">Human</span>
            </div>
        </div>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
            Analysis complete. Estimated <span className="font-semibold text-pink-500">{Math.round(result.aiPercentage)}% AI</span> content.
        </p>
    </div>
);

const ResultPanel: React.FC<ResultPanelProps> = ({ output, isLoading, error, activeTab, onCopy, copied }) => {
    const renderContent = () => {
        if (isLoading) {
            return <div className="flex items-center justify-center h-full"><LoadingSpinner /></div>;
        }

        if (error) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-center p-4 text-red-500">
                    <AlertTriangleIcon className="w-12 h-12 mb-4"/>
                    <p className="font-semibold">An Error Occurred</p>
                    <p className="text-sm text-red-400">{error}</p>
                </div>
            );
        }

        if (output) {
            if (activeTab === 'analysis' && typeof output !== 'string') {
                return <AnalysisDisplay result={output} />;
            }
            if (activeTab === 'humanized' && typeof output === 'string') {
                return (
                    <div className="relative h-full flex flex-col">
                        <div className="flex-grow p-4 text-base overflow-y-auto whitespace-pre-wrap text-slate-700 dark:text-slate-200">
                            {output}
                        </div>
                        <div className="p-2 border-t border-slate-200 dark:border-slate-700">
                            <button onClick={onCopy} className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                                {copied ? <CheckIcon className="w-4 h-4 text-green-500" /> : <CopyIcon className="w-4 h-4" />}
                                {copied ? 'Copied!' : 'Copy Humanized Text'}
                            </button>
                        </div>
                    </div>
                );
            }
        }

        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <SparklesIcon className="w-16 h-16 text-slate-400 dark:text-slate-500 mb-4" />
                <h3 className="font-semibold text-slate-700 dark:text-slate-300">Your results will appear here</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Enter some text and click "Analyze" or "Humanize".</p>
            </div>
        );
    };

    return (
        <div className="w-full h-full bg-slate-100 dark:bg-slate-900/70 rounded-lg border-2 border-slate-200 dark:border-slate-700 min-h-[340px] flex flex-col">
           {renderContent()}
        </div>
    );
};

export default ResultPanel;
