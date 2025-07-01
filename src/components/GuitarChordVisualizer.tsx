import React, { useState } from "react";

const NOTE_NAMES = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
];

type GuitarStringProps = {
  index: number;
  tuning: string;
  onChange: (index: number, value: string) => void;
};

const GuitarString: React.FC<GuitarStringProps> = ({ index, tuning, onChange }) => {
  const octave = index < 2 ? 4 : index < 4 ? 3 : 2;

  return (
    <div className="flex items-center gap-2">
      <span className="w-6 text-right font-mono">{6 - index}</span>
      <select
        value={tuning}
        onChange={(e) => onChange(index, e.target.value)}
        className="border rounded px-2 py-1 w-full sm:w-auto"
      >
        {NOTE_NAMES.map((note) => {
          const value = \`\${note}\${octave}\`;
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export const GuitarChordVisualizer: React.FC = () => {
  const [tunings, setTunings] = useState<string[]>(["E2", "A2", "D3", "G3", "B3", "E4"]);

  const changeTuning = (index: number, value: string) => {
    setTunings((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  return (
    <div className="p-8 mx-auto max-w-4xl">
      <h1 className="text-2xl font-bold text-center mb-6">
        Visualisateur d'accords de guitare
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 mb-8">
        {tunings.map((tuning, idx) => (
          <GuitarString
            key={idx}
            index={idx}
            tuning={tuning}
            onChange={changeTuning}
          />
        ))}
      </div>

      <div className="border rounded-lg bg-gray-100 p-6 text-center">
        🎸 Manche de guitare ici (SVG à venir)
      </div>
    </div>
  );
};