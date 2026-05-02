import React from 'react';
import { Check, Star } from 'lucide-react';

const TemplateGallery = ({ selected, onSelect }) => {
  const templates = [
    { id: 'modern', name: 'Modern', description: 'Clean and bold', popular: true, color: 'bg-blue-600' },
    { id: 'classic', name: 'Classic', description: 'Traditional academic', popular: false, color: 'bg-gray-800' },
    { id: 'minimal', name: 'Minimal', description: 'Simple and elegant', popular: false, color: 'bg-zinc-400' },
    { id: 'creative', name: 'Creative', description: 'Stylish sidebar', popular: true, color: 'bg-indigo-600' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          className={`relative p-4 rounded-xl border-2 transition text-left group ${
            selected === t.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          {t.popular && (
            <span className="absolute top-2 right-2 bg-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
              <Star className="h-2 w-2 fill-current" />
              <span>POPULAR</span>
            </span>
          )}
          <div className={`h-24 w-full rounded-md mb-4 ${t.color} opacity-80 group-hover:opacity-100 transition shadow-inner flex items-center justify-center`}>
             <div className="w-3/4 h-2/3 bg-white/20 rounded-sm"></div>
          </div>
          <h3 className="font-bold text-gray-900">{t.name}</h3>
          <p className="text-xs text-gray-500">{t.description}</p>

          {selected === t.id && (
            <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1 rounded-full shadow-lg">
              <Check className="h-4 w-4" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default TemplateGallery;
