"use client";

import type { AppId, DesktopApp } from "@/components/Desktop";
import DockIcon from "@/components/DockIcon";

type DockProps = {
	apps: DesktopApp[];
	openWindows: AppId[];
	onOpenWindow: (id: AppId) => void;
};

export default function Dock({ apps, openWindows, onOpenWindow }: DockProps) {
	return (
		<nav
			aria-label="Application dock"
			className="group fixed bottom-4 left-1/2 z-[8500] -translate-x-1/2 translate-y-[72%] transition-transform duration-300 hover:translate-y-0 focus-within:translate-y-0"
		>
			<div className="flex items-end gap-3 rounded-2xl border border-white/70 bg-white/58 px-5 py-3 shadow-[0_18px_50px_rgba(55,72,95,0.22)] backdrop-blur-2xl">
				{apps.map((app) => (
					<DockIcon
						key={app.id}
						app={app}
						active={openWindows.includes(app.id)}
						onClick={() => onOpenWindow(app.id)}
					/>
				))}
			</div>
		</nav>
	);
}
