"use client";

import { AnimatePresence } from "framer-motion";
import { Cpu, FolderGit2, Mail, TerminalIcon, User } from "lucide-react";
import type { ComponentType } from "react";
import { useMemo, useState } from "react";
import About from "@/apps/About";
import Contact from "@/apps/Contact";
import Projects from "@/apps/Projects";
import Skills from "@/apps/Skills";
import Terminal from "@/apps/Terminal";
import AppWindow from "@/components/AppWindow";
import BootScreen from "@/components/BootScreen";
import Dock from "@/components/Dock";
import TopBar from "@/components/TopBar";

export type AppId = "terminal" | "about" | "projects" | "skills" | "contact";

export type DesktopApp = {
	id: AppId;
	title: string;
	icon: ComponentType<{ className?: string }>;
};

type Position = { x: number; y: number };

const apps: DesktopApp[] = [
	{ id: "terminal", title: "Terminal", icon: TerminalIcon },
	{ id: "about", title: "About Me", icon: User },
	{ id: "projects", title: "Projects", icon: FolderGit2 },
	{ id: "skills", title: "Skills", icon: Cpu },
	{ id: "contact", title: "Contact", icon: Mail },
];

const initialPositions: Record<AppId, Position> = {
	terminal: { x: 56, y: 78 },
	about: { x: 138, y: 112 },
	projects: { x: 210, y: 96 },
	skills: { x: 180, y: 150 },
	contact: { x: 250, y: 130 },
};

const initialZIndexMap: Record<AppId, number> = {
	terminal: 1,
	about: 0,
	projects: 0,
	skills: 0,
	contact: 0,
};

export default function Desktop() {
	const [openWindows, setOpenWindows] = useState<AppId[]>(["terminal"]);
	const [minimizedWindows, setMinimizedWindows] = useState<AppId[]>([]);
	const [zIndexMap, setZIndexMap] = useState<Record<AppId, number>>(initialZIndexMap);
	const [positions, setPositions] = useState<Record<AppId, Position>>(initialPositions);
	const [nextZIndex, setNextZIndex] = useState(2);
	const [terminalIntroClosed, setTerminalIntroClosed] = useState(false);

	const appMap = useMemo(() => new Map(apps.map((app) => [app.id, app])), []);

	function bringToFront(id: AppId) {
		setZIndexMap((current) => ({ ...current, [id]: nextZIndex }));
		setNextZIndex((current) => current + 1);
	}

	function openWindow(id: AppId) {
		setOpenWindows((current) => (current.includes(id) ? current : [...current, id]));
		setMinimizedWindows((current) => current.filter((windowId) => windowId !== id));
		bringToFront(id);
	}

	function minimizeWindow(id: AppId) {
		setMinimizedWindows((current) => (current.includes(id) ? current : [...current, id]));
	}

	function closeWindow(id: AppId) {
		if (id === "terminal") {
			setTerminalIntroClosed(true);
		}

		setOpenWindows((current) => current.filter((windowId) => windowId !== id));
		setMinimizedWindows((current) => current.filter((windowId) => windowId !== id));
	}

	function updatePosition(id: AppId, position: Position) {
		const viewportPadding = 16;
		const maxX = Math.max(viewportPadding, window.innerWidth - 340);
		const maxY = Math.max(54, window.innerHeight - 180);

		setPositions((current) => ({
			...current,
			[id]: {
				x: Math.min(Math.max(position.x, viewportPadding), maxX),
				y: Math.min(Math.max(position.y, 54), maxY),
			},
		}));
	}

	function renderApp(id: AppId) {
		switch (id) {
			case "terminal":
				return <Terminal mode={terminalIntroClosed ? "shell" : "intro"} onOpenWindow={openWindow} />;
			case "about":
				return <About />;
			case "projects":
				return <Projects />;
			case "skills":
				return <Skills />;
			case "contact":
				return <Contact />;
		}
	}

	return (
		<main className="relative h-dvh w-screen overflow-hidden text-[#1f2933]">
			<div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/wallpaper.jpg')" }} />
			<TopBar />
			<AnimatePresence>
				{openWindows.map((id) => {
					const app = appMap.get(id);

					if (!app) {
						return null;
					}

					return (
						<AppWindow
							key={id}
							id={id}
							title={app.title}
							position={positions[id]}
							zIndex={zIndexMap[id]}
							isMinimized={minimizedWindows.includes(id)}
							onClose={() => closeWindow(id)}
							onMinimize={() => minimizeWindow(id)}
							onFocus={() => bringToFront(id)}
							onPositionChange={(position) => updatePosition(id, position)}
						>
							{renderApp(id)}
						</AppWindow>
					);
				})}
			</AnimatePresence>
			<Dock apps={apps} openWindows={openWindows} onOpenWindow={openWindow} />
			<BootScreen />
		</main>
	);
}
