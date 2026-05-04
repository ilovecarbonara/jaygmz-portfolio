"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const bootLines = [
	"Starting Fedora portfolio session",
	"Loading GNOME Shell",
	"Applying blur effects",
	"Opening Terminal",
	"Welcome back, Jay",
];

export default function BootScreen() {
	const [lineCount, setLineCount] = useState(0);
	const [visible, setVisible] = useState(true);
	const [mounted, setMounted] = useState(true);

	useEffect(() => {
		const lineTimer = window.setInterval(() => {
			setLineCount((current) => Math.min(current + 1, bootLines.length));
		}, 150);
		const hideTimer = window.setTimeout(() => setVisible(false), 2200);
		const unmountTimer = window.setTimeout(() => setMounted(false), 3200);

		return () => {
			window.clearInterval(lineTimer);
			window.clearTimeout(hideTimer);
			window.clearTimeout(unmountTimer);
		};
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<motion.div
			className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#eef4fb] px-6 font-mono text-sm text-[#1f2933]"
			initial={{ opacity: 1 }}
			animate={{ opacity: visible ? 1 : 0 }}
			transition={{ duration: 0.7, delay: visible ? 0 : 0.2 }}
			onAnimationComplete={() => {
				if (!visible) {
					setMounted(false);
				}
			}}
			style={{ pointerEvents: visible ? "auto" : "none" }}
		>
			<div className="w-full max-w-xl space-y-2 rounded-xl border border-white/75 bg-white/58 p-6 shadow-[0_22px_70px_rgba(55,72,95,0.18)] backdrop-blur-2xl">
				{bootLines.slice(0, lineCount).map((line) => (
					<p key={line}>{line}</p>
				))}
				{visible ? <span className="animate-pulse text-[#3584e4]">█</span> : null}
			</div>
		</motion.div>
	);
}
