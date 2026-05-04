"use client";

import { motion } from "framer-motion";
import type { DesktopApp } from "@/components/Desktop";

type DockIconProps = {
	app: DesktopApp;
	active: boolean;
	onClick: () => void;
};

export default function DockIcon({ app, active, onClick }: DockIconProps) {
	const Icon = app.icon;

	return (
		<div className="group/icon relative flex flex-col items-center">
			<span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md border border-white/70 bg-white/85 px-2 py-1 text-xs font-medium text-[#1f2933] opacity-0 shadow-lg backdrop-blur-xl transition-opacity group-hover/icon:opacity-100 group-focus-within/icon:opacity-100">
				{app.title}
			</span>
			<motion.button
				type="button"
				aria-label={`Open ${app.title}`}
				className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/75 bg-white/72 text-[#1f2933] shadow-sm transition-colors hover:bg-white/95 focus:outline-none focus:ring-2 focus:ring-[#3584e4]"
				whileHover={{ scale: 1.35, y: -8 }}
				whileTap={{ scale: 0.96 }}
				transition={{ type: "spring", stiffness: 420, damping: 24 }}
				onClick={onClick}
			>
				<Icon className="h-7 w-7" />
			</motion.button>
			<span className={`mt-1 h-1 w-1 rounded-full ${active ? "bg-[#3584e4]" : "bg-transparent"}`} />
		</div>
	);
}
