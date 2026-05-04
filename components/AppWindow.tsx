"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import type { AppId } from "@/components/Desktop";

type Position = { x: number; y: number };

type AppWindowProps = {
	id: AppId;
	title: string;
	position: Position;
	zIndex: number;
	children: ReactNode;
	onClose: () => void;
	onFocus: () => void;
	onPositionChange: (position: Position) => void;
};

const windowVariants = {
	hidden: { opacity: 0, scale: 0.88, y: 10 },
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: { type: "spring" as const, stiffness: 300, damping: 25 },
	},
	exit: { opacity: 0, scale: 0.88, y: 10, transition: { duration: 0.15 } },
};

export default function AppWindow({
	id,
	title,
	position,
	zIndex,
	children,
	onClose,
	onFocus,
	onPositionChange,
}: AppWindowProps) {
	const windowWidth = id === "terminal" ? "w-[min(1120px,calc(100vw-2rem))]" : "w-[min(640px,calc(100vw-2rem))]";
	const windowHeight = id === "terminal" ? "h-[min(620px,calc(100dvh-7.25rem))]" : "";
	const surfaceClass =
		id === "terminal"
		? "border-white/45 bg-[#111827]/75 text-[#eef4fb] shadow-[0_28px_80px_rgba(31,41,55,0.32)]"
		: "border-white/75 bg-white/95 text-[#1f2933] shadow-[0_28px_70px_rgba(55,72,95,0.2)]";
	const titlebarClass =
		id === "terminal"
			? "border-white/10 bg-[#111827]/38 text-[#eef4fb]"
			: "border-white/70 bg-white/62 text-[#1f2933]";
	const bodyClass = id === "terminal" ? "overflow-hidden bg-transparent" : "overflow-auto bg-white/72";

	return (
		<motion.section
			role="dialog"
			aria-label={title}
			className={`fixed left-0 top-0 flex max-h-[calc(100dvh-7.25rem)] min-h-[360px] ${windowWidth} ${windowHeight} ${surfaceClass} flex-col overflow-hidden rounded-xl border`}
			style={{ zIndex }}
			initial="hidden"
			animate={{ ...windowVariants.visible, x: position.x, y: position.y }}
			exit="exit"
			variants={windowVariants}
			drag
			dragMomentum={false}
			onMouseDown={onFocus}
			onDragStart={onFocus}
			onDragEnd={(_, info) => {
				onPositionChange({ x: position.x + info.offset.x, y: position.y + info.offset.y });
			}}
		>
			<header className={`cursor-window-drag flex h-10 shrink-0 items-center gap-3 border-b px-3 backdrop-blur-xl ${titlebarClass}`}>
				<div className="flex items-center gap-2">
					<button
						type="button"
						aria-label={`Close ${title}`}
						className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ed333b] text-white transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#3584e4]"
						onClick={(event) => {
							event.stopPropagation();
							onClose();
						}}
					>
						<X className="h-2.5 w-2.5 opacity-0 transition-opacity hover:opacity-80" />
					</button>
					<span className="h-3.5 w-3.5 rounded-full bg-[#f6d32d]" />
					<span className="h-3.5 w-3.5 rounded-full bg-[#33d17a]" />
				</div>
				<p className="min-w-0 flex-1 truncate text-center text-sm font-semibold">
					{title}
				</p>
				<div className="w-[52px]" />
			</header>
			<div className={`min-h-0 flex-1 ${bodyClass}`}>{children}</div>
		</motion.section>
	);
}
