import React from 'react';
import { Language, Tone } from '../types';

interface ControlsProps {
  language: Language;
  setLanguage: (language: Language) => void;
  tone: Tone;
  setTone: (tone: Tone) => void;
}

interface ControlButtonProps<T> {
  label: string;
  value: T;
  selectedValue: T;
  setter: (value: T) => void;
}

// FIX: Switched to a generic arrow function component. This syntax is unambiguous for the TSX parser,
// ensuring it's correctly identified as a React component that can receive a `key` prop in a list.
const ControlButton = <T,>({ label, value, selectedValue, setter }: ControlButtonProps<T>) => {
  const isSelected = value === selectedValue;
  return (
    <button
      onClick={() => setter(value)}
      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
        isSelected
          ? 'bg-blue-500 text-white shadow-sm'
          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
      }`}
    >
      {label}
    </button>
  );
};

const Controls: React.FC<ControlsProps> = ({ language, setLanguage, tone, setTone }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Language</label>
        <div className="flex gap-2">
          {/* FIX: Cast Object.values to Language[] to ensure correct type inference. */}
          {(Object.values(Language) as Language[]).map((lang) => (
            <ControlButton key={lang} label={lang} value={lang} selectedValue={language} setter={setLanguage} />
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Tone</label>
        <div className="flex flex-wrap gap-2">
          {/* FIX: Cast Object.values to Tone[] to ensure correct type inference. */}
          {(Object.values(Tone) as Tone[]).map((t) => (
            <ControlButton key={t} label={t} value={t} selectedValue={tone} setter={setTone} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Controls;
