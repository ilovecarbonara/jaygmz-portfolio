"use client";

import { FormEvent, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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
  "jaygmz@portfolio",
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
  "───────────────────────────────",
  "Focus:     Fullstack · UI",
  "Learning:  Linux · Python · Prompt Engineering · System Design · AWS",
  "Projects:  Alexandria     [active]",
  "Playlist:  alt / indie rock · r&b / neo-soul · hip-hop / trap",
  "Into:      walking · lifting · music · manga / manhwa · films · games",
  "Fueled by: Coke Zero",
  "Bugs:      no plz",
  "Status:    still compiling",
];

const icecreamArt = [
  "⣿⣿⣿⣿⣿⣿⡿⠛⠋⠉⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⠉⠛⠿⣿⣿⣿⣿⣿⣿⣿",
  "⣿⣿⣿⡿⠋⠁⠄⠄⢠⣴⣶⣿⣿⣶⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⠿⣿⣿⣿⣿",
  "⣿⣿⡟⠁⠄⠄⠄⠄⣿⣿⣿⣿⣿⣿⣇⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢹⣿⣿⣿",
  "⣿⣿⣧⠄⠄⠄⠄⢰⣿⣿⣿⣿⣿⣿⣿⡆⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣸⣿⣿⣿",
  "⣿⣿⣿⣧⡀⠄⠄⢸⣿⣿⣿⣿⣿⣿⣿⣷⣆⠄⠄⠄⠄⠄⠄⠄⠄⣰⣿⣿⣿⣿",
  "⣿⣿⣿⣿⡿⣦⣀⣾⣿⣟⣉⠉⠙⢛⡏⠁⠄⠄⠄⠄⠄⠄⠄⠄⠚⢿⣿⣿⣿⣿",
  "⣿⣿⣿⣿⣯⣗⣻⣿⣯⣥⣦⠄⣀⣾⡇⠄⠄⠂⠄⠄⠄⠄⠄⠄⠄⣼⣿⣿⣿⣿",
  "⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠄⠄⠂⠄⠄⠄⠄⠄⠄⠄⣿⣿⣿⣿⣿",
  "⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⣻⠋⠄⠄⠄⠄⠄⠄⠄⢀⠄⣸⣿⣿⣿⣿⣿",
  "⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡁⡀⠄⠄⠄⠄⠄⠄⢸⣾⣿⣿⣿⣿⣿⣿",
  "⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣥⣾⣷⠶⠆⠄⠄⠄⢀⠄⠄⠄⠸⣿⣿⣿⣿⣿⣿⣿",
  "⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⣶⣄⡀⠄⠄⠄⠄⠄⢀⠄⠸⣿⣿⣿⣿⣿⣿",
  "⣿⣿⣿⣿⣿⣿⠟⠚⣿⣿⡻⠿⠿⠛⠙⠁⠄⠄⠄⠄⠠⠂⠄⠄⠘⠿⣿⣿⣿⣿",
  "⠿⠛⠉⠁⠁⠄⠄⠄⣻⣿⣿⣧⣠⣀⠄⠄⠄⠄⡀⠂⠄⠄⠄⠄⠄⠄⠈⠉⠿⢿",
  "⠄⠄⠄⠄⠄⠄⠄⠄⠄⠘⠿⣿⡿⠃⢀⡠⠄⠃⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄",
];

const bongoArt = [
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣶⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⡤⠾⠋⠀⠙⢦⣄⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⣀⣀⡀⠀⣠⡶⠋⠁⠀⠀⠀⠀⠀⠀⠀⠈⠉⠛⠶⣤⣀⠀⠀⠀⠀⡄⠀⠀⠀",
  "⠀⠀⠀⣼⠟⣯⡙⣿⡭⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⡶⠞⠋⣿⠀⠀⠀",
  "⡀⠀⠀⣿⠉⠻⠀⠈⠀⠀⠀⢾⠆⢀⡀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡟⠀⠀⠀",
  "⠉⠓⠒⢻⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠉⠛⠃⠀⠀⢠⣦⡀⠀⠀⠀⠀⠀⠀⣼⠁⠀⠀⠀",
  "⠀⣠⠚⠉⠁⠀⠀⠉⠉⠻⢗⠲⠦⢤⣄⣀⡀⠀⠀⠈⠉⠀⠀⠀⠀⠀⠀⠀⠘⣷⠀⠀⠀",
  "⠀⣧⡀⠀⠀⠀⠀⠀⠀⠀⣸⣧⠶⠒⠚⠛⠛⣻⠂⠀⠀⠀⠀⣀⣀⠀⠀⠀⠀⠸⡇⠀⠀",
  "⠀⢻⣝⠓⠦⠤⢤⢤⠶⣚⣿⡇⠀⠀⠀⢀⡼⢛⡷⡖⠒⠒⠛⢅⠈⠉⠙⠒⠲⠤⢧⣄⣀",
  "⠀⠈⣏⠹⡟⠒⢲⠚⠋⡟⢹⣧⡀⠀⠀⠀⠀⠊⠀⠇⠀⠀⠀⠈⡇⠀⠀⠀⠀⠀⠀⠀⠉",
  "⠀⠀⢸⡄⡇⠀⢸⠀⢠⡇⠘⣷⡙⠢⣄⣀⠀⠀⠀⠀⠀⢀⣠⡾⠁⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⢳⣼⣀⣸⣇⣸⡦⣤⡇⡏⠓⠦⣬⣍⣙⣛⣛⡯⣽⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠈⠙⠛⠛⠁⠀⠈⣿⡇⠀⠀⡟⠀⠀⢀⡏⢠⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢷⣤⣰⠁⠀⢀⣞⣠⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠛⠛⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
];

const larpStatements = [
  // Tech & Linux Elitism
  "Opening Arch Linux in a crowded library to look busy",
  "Explaining why I use Vim to someone who is clearly using Google Docs",
  "Compiling a custom Linux kernel just to see the green text scroll",
  "Buying a $300 mechanical keyboard with blank keycaps to hide that I still hunt-and-peck",
  "Changing my GitHub contribution graph with a script to look like a 10x developer",
  "Installing a tiling window manager just to watch movie trailers in 4 different panes",
  "Telling people \"I'd use Fedora, but it's too mainstream now\"",
  // AI & Coding (The \"Modern Engineer\")
  "Using Cursor to build a \"Hello World\" app and calling myself an AI Architect",
  "Prompting Claude for 4 hours to avoid writing 5 lines of CSS",
  "Paying for smallest.ai just to make a 3-second voiceover of a cat",
  "Telling Gemini to \"think harder\" like I'm its corporate manager",
  "Wearing Meta glasses to a family dinner to \"record the vibe\" for my personal brand",
  "Talking about \"Agentic Workflows\" while manually copy-pasting code into a terminal",
  "Asking a Hackathon judge if they \"get the vision\" instead of showing a working demo",
  "Claiming I'm \"GPU rich\" because I have a $10 monthly cloud credit",
  "Putting \"Prompt Engineer\" on my resume after using ChatGPT for a week",
  "Taking a photo of my laptop screen with v0.dev open to show I'm \"shipping\"",
  // Grindset & Productivity
  "Posting a 5 AM workout photo with the caption \"No Excuses\" then going back to sleep",
  "Setting up a \"Second Brain\" in Notion for 6 hours instead of actually studying for the exam",
  "Listening to a 3-hour business podcast at 2.5x speed to \"optimize learning\"",
  "Updating LinkedIn headline to \"Aspiring AI Visionary & Paradigm Shifter\"",
  "Tweeting \"Huge things coming\" after fixing a single typo in a README",
  "Reading Marcus Aurelius in the front window of a Starbucks so people see the cover",
  "Talking about \"leverage\" and \"scaling\" while my biggest asset is a $500 savings account",
];

const commandHelp = [
  "Available commands:",
  "  help           List available commands",
  "  jayfetch       Print system profile",
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
  "  icecream       Print ice cream art",
  "  bongo          Print bongo art",
  "  cowsay [msg]   Make a cow say something",
  "  larp           Print a random larp statement",
  "  guesswhat      Find out",
];

function buildCowsay(message: string): string[] {
  const msg = message || "moo";
  const border = "-".repeat(msg.length + 2);
  return [
    ` ${border}`,
    `< ${msg} >`,
    ` ${border}`,
    "        \\   ^__^",
    "         \\  (oo)\\_______",
    "            (__)\\       )\\/\\",
    "                ||----w |",
    "                ||     ||",
  ];
}

const prompt = "jaygmz@portfolio ~ %";

export default function Terminal({ onOpenWindow, mode }: TerminalProps) {
  const jayfetchLines = useMemo(() => {
    const maxLines = Math.max(jayArt.length, jayInfo.length);
    const infoColumn = 46;

    return Array.from({ length: maxLines }, (_, index) => {
      const art = jayArt[index] ?? "";
      const info = jayInfo[index] ?? "";

      return art ? `${art}        ${info}`.trimEnd() : `${" ".repeat(infoColumn)}${info}`.trimEnd();
    });
  }, []);

  const startupLines = useMemo(() => [`${prompt} jayfetch`, "", ...jayfetchLines], [jayfetchLines]);

  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [ready, setReady] = useState(mode === "shell");
  const scrollEndRef = useRef<HTMLDivElement>(null);

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

  useLayoutEffect(() => {
    scrollEndRef.current?.scrollIntoView({ block: "end" });
  }, [history, ready]);

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
    } else if (command === "icecream") {
      output = ["", ...icecreamArt];
    } else if (command === "larp") {
      output = [larpStatements[Math.floor(Math.random() * larpStatements.length)]];
    } else if (command === "bongo") {
      output = ["", ...bongoArt];
    } else if (command === "cowsay" || command.startsWith("cowsay ")) {
      const msg = rawCommand.trim().slice("cowsay".length).trim();
      output = ["", ...buildCowsay(msg)];
    } else if (command === "guesswhat") {
      output = ["chicken butt"];
    } else if (command === "whoami") {
      output = ["Jc Alleine Gomez - Fullstack · UI"];
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
    <div className="flex h-full min-h-90 flex-col bg-[#111827]/20 p-4 font-mono text-[12px] text-[#edf6ff] sm:text-xs">
      <div className="min-h-0 flex-1 overflow-auto whitespace-pre leading-5">
        {history.map((line, index) => (
          <p key={`${line}-${index}`} className={line?.startsWith(prompt) ? "text-[#99c1f1]" : "text-[#edf6ff]"}>
            {line || " "}
          </p>
        ))}
        {!ready ? <span className="animate-pulse text-[#99c1f1]">█</span> : null}
        {ready ? (
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <label htmlFor="terminal-input" className="shrink-0 text-[#99c1f1]">
              {prompt}
            </label>
            <input
              id="terminal-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={40}
              className="min-w-0 flex-1 bg-transparent text-[#edf6ff] outline-none placeholder:text-[#9aa6b2]"
              placeholder="type help"
              autoComplete="off"
              spellCheck={false}
              autoFocus
            />
          </form>
        ) : null}
        <div ref={scrollEndRef} aria-hidden="true" />
      </div>
    </div>
  );
}
