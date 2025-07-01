import React from "react";

type GuitarNeckProps = {
    tunings: string[]; // ex: ["E2", "A2", "D3", "G3", "B3", "E4"]
    frets: number; // ex: 5
};

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// Convert "E2" => { note: "E", octave: 2 }
const parseNote = (noteStr: string) => {
    const match = noteStr.match(/^([A-G]#?)(\d)$/);
    if (!match) return { note: "E", octave: 2 };
    return { note: match[1], octave: parseInt(match[2], 10) };
};

// Get the note n frets above a starting note
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
        <svg width={width} height={height} className="bg-yellow-50 rounded shadow-md">
            {/* Frets (vertical lines) */}
            {Array.from({ length: frets + 1 }).map((_, i) => (
                <line
                    key={`fret-${i}`}
                    x1={i * fretWidth}
                    y1={0}
                    x2={i * fretWidth}
                    y2={height}
                    stroke="#aaa"
                    strokeWidth={i === 0 ? 4 : 2}
                />
            ))}

            {/* Strings (horizontal lines) */}
            {tunings.map((tuning, idx) => {
                const y = idx * stringHeight + stringHeight / 2;
                return (
                    <line
                        key={`string-${idx}`}
                        x1={0}
                        y1={y}
                        x2={width}
                        y2={y}
                        stroke="#444"
                        strokeWidth={1.5}
                    />
                );
            })}

            {/* Notes on each fret */}
            {tunings.map((tuning, stringIdx) => {
                const { note: baseNote } = parseNote(tuning);
                const y = stringIdx * stringHeight + stringHeight / 2;

                return Array.from({ length: frets }).map((_, fretIdx) => {
                    const note = transpose(baseNote, fretIdx);
                    const x = fretIdx * fretWidth + fretWidth / 2;

                    return (
                        <text
                            key={`note-${stringIdx}-${fretIdx}`}
                            x={x}
                            y={y + 5}
                            textAnchor="middle"
                            fontSize="12"
                            fill="#222"
                        >
                            {note}
                        </text>
                    );
                });
            })}
        </svg>
    );
};
