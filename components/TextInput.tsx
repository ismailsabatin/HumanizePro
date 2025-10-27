
import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

const sampleText = `In today's interconnected world, artificial intelligence is pivotal. This technology's applications are vast, from automating tasks to complex data analysis. Ethical considerations are paramount to ensure fairness and prevent bias. The future potential of AI is immense, promising transformative societal changes.`;

const TextInput: React.FC<TextInputProps> = ({ value, onChange }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={sampleText}
      className="w-full h-64 md:h-full text-base p-4 rounded-lg bg-slate-100 dark:bg-slate-900/70 border-2 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 resize-none"
    />
  );
};

export default TextInput;
