"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import type { AppId } from "@/components/Desktop";

type TerminalProps = {
  onOpenWindow: (id: AppId) => void;
  mode: "intro" | "shell";
};

const jayArt = [
  "⠄⠄⢸⠃⠄⠛⠉⠄⣤⣤⣤⣤⣤⣄⠉⠙⠻⣿⣿⣿⣿⡇⣶⡄⢢⢻⣿⣿⣮⡛",
  "⠄⠄⠘⢀⣠⣾⠄⠘⠋⠉⠉⠛⠻⢿⣦⡲⣄⠈⠻⣿⣇⣣⠹⣯⣄⣦⡙⢿⣿⣿",
  "⢀⡎⠄⣾⠋⠄⠄⠄⣠⣤⣤⣤⣤⣄⠈⠙⣍⢳⠄⠘⣿⡐⠁⢉⣁⣀⡀⠄⠙⠿",
  "⡼⠄⡆⡇⢀⣤⡆⣿⣿⣿⣿⣿⣿⣿⣷⡘⣿⣷⣄⡀⢹⡇⣾⣿⣿⣿⣿⡇⣄⢠",
  "⡇⠄⢿⡔⢿⣿⡇⢿⣿⣿⣿⠿⠿⢿⣿⠇⣿⣿⣿⠇⢈⣁⡻⢿⣿⣀⠈⣱⢏⣾",
  "⢣⠄⢆⢩⣮⣿⣿⣄⠻⣿⣷⣤⣤⡴⢋⣴⣿⣿⡟⠄⢸⣿⣿⣷⣶⣶⠾⢫⣪⠅",
  "⠘⣆⠈⢑⣘⣿⣿⣿⣷⣶⣤⣤⣴⣾⣿⣿⣿⣿⠃⢀⣿⣿⣿⣿⣿⣿⣿⣿⢇⣴",
  "⠄⠘⢦⡈⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⢁⣀⣉⣉⣹⣿⣿⣿⣿⠿⡃⠪⣶",
  "⠄⠄⠄⠙⠢⢄⡈⠛⠻⠿⠿⠿⠟⠛⠋⣀⠰⣿⣿⣿⣿⡿⠿⡛⠉⡄⠄⠄⠄⣀",
  "⠄⠄⠄⠄⢀⡾⢉⣁⠄⠄⠄⠲⠂⢂⠋⠄⠛⠒⠉⠉⠑⠒⠉⠒⠒⡧⠤⠖⢋⣡",
];

const jayInfo = [
  "ilovecarbonara @ github",
  "───────────────────────────────",
  "OS:        JayOS",
  "Host:      Cebu, PH",
  "Uptime:    still counting",
  "Shell:     zsh",
  "Languages: TypeScript · C# · Java · Solidity",
  "Frontend:  Next.js · React · Tailwind CSS",
  "Backend:   Node.js · Supabase · PostgreSQL",
  "Tools:     Git · GitHub · Figma · Vercel · Hardhat",
  "Editor:    VS Code",
  "Terminal:  GitHub README",
  "───────────────────────────────",
  "Focus:     Fullstack · UI",
  "Learning:  Linux · Python · Prompt Engineering · System Design · AWS",
  "Projects:  Alexandria     [active]",
  "Playlist:  alt / indie rock · r&b / neo-soul · hip-hop / trap",
  "Into:      walking · lifting · music · manga / manhwa · films · games",
  "Fueled by: Coke Zero",
  "Bugs:      [in denial]",
  "Status:    still compiling",
];

const contactsLines = [
  "",
  "  github   →  github.com/ilovecarbonara",
  "  email    →  jcalleine08@gmail.com",
  "  other    →  ig: jaygmzxcv · spotify: yanuzxcv · dc: doomfartslayer · steam: papiyanu",
];

const commandHelp = [
  "Available commands:",
  "  help           List available commands",
  "  jayfetch       Print system profile",
  "  cat contacts.txt",
  "  whoami         Print name and role",
  "  ls             List portfolio sections",
  "  clear          Clear terminal history",
  "  open about     Open About window",
  "  open projects  Open Projects window",
  "  open skills    Open Skills window",
  "  open contact   Open Contact window",
  "  pwd            Print working directory",
  "  date           Print current date",
  "  open terminal  Focus terminal",
];

const prompt = "jay@portfolio ~ %";

export default function Terminal({ onOpenWindow, mode }: TerminalProps) {
  const jayfetchLines = useMemo(() => {
    const maxLines = Math.max(jayArt.length, jayInfo.length);

    return Array.from({ length: maxLines }, (_, index) => {
      const art = jayArt[index] ?? "";
      const info = jayInfo[index] ?? "";

      return art ? `${art}        ${info}`.trimEnd() : `                                                 ${info}`.trimEnd();
    });
  }, []);

  const startupLines = useMemo(() => [`${prompt} jayfetch`, "", ...jayfetchLines], [jayfetchLines]);

  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [ready, setReady] = useState(mode === "shell");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode === "shell") {
      return;
    }

    let index = 0;
    const timer = window.setInterval(() => {
      if (index >= startupLines.length) {
        window.clearInterval(timer);
        setReady(true);
        return;
      }

      const nextLine = startupLines[index];

      setHistory((current) => [...current, nextLine]);
      index += 1;

      if (index >= startupLines.length) {
        window.clearInterval(timer);
        setReady(true);
      }
    }, 80);

    return () => window.clearInterval(timer);
  }, [mode, startupLines]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  function runCommand(rawCommand: string) {
    const command = rawCommand.trim().toLowerCase();

    if (command === "clear") {
      setHistory([]);
      return;
    }

    const commandEcho = `${prompt} ${rawCommand}`;
    let output: string[] = [];

    if (command === "help") {
      output = commandHelp;
    } else if (command === "jayfetch") {
      output = ["", ...jayfetchLines];
    } else if (command === "cat contacts.txt") {
      output = contactsLines;
    } else if (command === "whoami") {
      output = ["ilovecarbonara - fullstack · UI"];
    } else if (command === "ls") {
      output = ["about  projects  skills  contact"];
    } else if (command === "pwd") {
      output = ["/Users/jay/portfolio"];
    } else if (command === "date") {
      output = [new Date().toString()];
    } else if (command === "open terminal") {
      output = ["terminal is already focused"];
      onOpenWindow("terminal");
    } else if (command.startsWith("open ")) {
      const target = command.replace("open ", "") as AppId;

      if (["about", "projects", "skills", "contact"].includes(target)) {
        onOpenWindow(target);
        output = [`opening ${target}...`];
      } else {
        output = [`zsh: command not found: ${rawCommand}`];
      }
    } else if (command.length === 0) {
      output = [];
    } else {
      output = [`zsh: command not found: ${rawCommand}`];
    }

    setHistory((current) => [...current, commandEcho, ...output]);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!ready) {
      return;
    }

    runCommand(input);
    setInput("");
  }

  return (
    <div className="flex h-full min-h-90 flex-col bg-[#111827]/90 p-4 font-mono text-[12px] text-[#edf6ff] sm:text-xs">
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-auto whitespace-pre leading-5">
        {history.map((line, index) => (
          <p key={`${line}-${index}`} className={line?.startsWith(prompt) ? "text-[#99c1f1]" : "text-[#edf6ff]"}>
            {line || " "}
          </p>
        ))}
        {!ready ? <span className="animate-pulse text-[#99c1f1]">█</span> : null}
      </div>
      {ready && mode === "shell" ? (
        <form onSubmit={handleSubmit} className="mt-3 flex shrink-0 items-center gap-2 border-t border-white/15 pt-3">
          <label htmlFor="terminal-input" className="shrink-0 text-[#99c1f1]">
            {prompt}
          </label>
          <input
            id="terminal-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-[#edf6ff] outline-none placeholder:text-[#9aa6b2]"
            placeholder="type help"
            autoComplete="off"
            spellCheck={false}
            autoFocus
          />
        </form>
      ) : null}
    </div>
  );
}
