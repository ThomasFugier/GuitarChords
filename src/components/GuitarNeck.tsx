import React from "react";

type GuitarNeckProps = {
    tunings: string[]; // ex: ["E2", "A2", "D3", "G3", "B3", "E4"]
    frets: number; // ex: 5
};

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const parseNote = (noteStr: string) => {
    const match = noteStr.match(/^([A-G]#?)(\d)$/);
    if (!match) return { note: "E", octave: 2 };
    return { note: match[1], octave: parseInt(match[2], 10) };
};

const transpose = (note: string, steps: number) => {
    const index = NOTE_NAMES.indexOf(note);
    return NOTE_NAMES[(index + steps) % 12];
};

export const GuitarNeck: React.FC<GuitarNeckProps> = ({ tunings, frets }) => {
    const stringCount = tunings.length;
    const stringHeight = 30;
    const fretWidth = 60;
    const width = frets * fretWidth;
    const height = stringCount * stringHeight;

    return (
        <svg width={width + 40} height={height + 40} className="bg-[#f8f5f1] rounded shadow-md">
            {/* Fond bois clair */}
            <rect x={0} y={0} width={width + 40} height={height + 40} fill="#e0cba8" />

            {/* Frets */}
            {Array.from({ length: frets + 1 }).map((_, i) => (
                <line
                    key={`fret-${i}`}
                    x1={20 + i * fretWidth}
                    y1={20}
                    x2={20 + i * fretWidth}
                    y2={20 + height}
                    stroke="#8b8b8b"
                    strokeWidth={i === 0 ? 5 : 2}
                />
            ))}

            {/* Repères de touche (dots) sur les frettes 3 et 5 */}
            {[2, 4].map((fretIdx) => (
                <circle
                    key={`dot-${fretIdx}`}
                    cx={20 + fretIdx * fretWidth + fretWidth / 2}
                    cy={20 + height / 2}
                    r={6}
                    fill="#444"
                    opacity={0.4}
                />
            ))}

            {/* Cordes */}
            {tunings.map((tuning, idx) => {
                const y = 20 + idx * stringHeight + stringHeight / 2;
                return (
                    <line
                        key={`string-${idx}`}
                        x1={20}
                        y1={y}
                        x2={20 + width}
                        y2={y}
                        stroke="#222"
                        strokeWidth={1.5}
                    />
                );
            })}

            {/* Notes */}
            {tunings.map((tuning, stringIdx) => {
                const { note: baseNote } = parseNote(tuning);
                const y = 20 + stringIdx * stringHeight + stringHeight / 2;

                return Array.from({ length: frets }).map((_, fretIdx) => {
                    const note = transpose(baseNote, fretIdx);
                    const x = 20 + fretIdx * fretWidth + fretWidth / 2;

                    return (
                        <text
                            key={`note-${stringIdx}-${fretIdx}`}
                            x={x}
                            y={y + 4}
                            textAnchor="middle"
                            fontSize="11"
                            fill="#000"
                        >
                            {note}
                        </text>
                    );
                });
            })}
        </svg>
    );
};
