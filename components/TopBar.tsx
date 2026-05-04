"use client";

import { Wifi, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function TopBar() {
	const [time, setTime] = useState("");

	useEffect(() => {
		function updateTime() {
			setTime(
				new Intl.DateTimeFormat("en", {
					weekday: "short",
					hour: "2-digit",
					minute: "2-digit",
				}).format(new Date()),
			);
		}

		updateTime();
		const timer = window.setInterval(updateTime, 30_000);

		return () => window.clearInterval(timer);
	}, []);

	return (
		<header className="absolute left-0 right-0 top-0 z-8000 flex h-8 items-center justify-between border-b border-white/55 bg-white/55 px-4 text-xs text-[#1f2933] shadow-sm backdrop-blur-xl">
			<div className="flex items-center gap-2 font-medium text-[#1f2933]">
				<span className="h-2 w-2 rounded-full bg-[#3584e4]" />
				JayOS
			</div>
			<time className="font-medium text-[#3d4d5f]">{time}</time>
			<div className="flex items-center gap-3 text-[#394b59]">
				<Wifi className="h-4 w-4" />
				<Volume2 className="h-4 w-4" />
			</div>
		</header>
	);
}
