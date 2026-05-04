import { Code2, Gamepad2, Link, Mail, MessageCircle, Music2 } from "lucide-react";

const links = [
	{ label: "Email", value: "jcalleine08@gmail.com", href: "mailto:jcalleine08@gmail.com", icon: Mail },
	{ label: "GitHub", value: "ilovecarbonara", href: "https://github.com/ilovecarbonara", icon: Code2 },
	{ label: "Instagram", value: "@jaygmzxcv", href: "https://instagram.com/jaygmzxcv", icon: Link },
	{ label: "Spotify", value: "yanuzxcv", href: "https://open.spotify.com/user/w3r4q68bzjy3aawgk1e4nrnr8?si=29b09a2217b5440f", icon: Music2 },
	{ label: "Discord", value: "doomfartslayer", href: "https://discord.com/users/954546298340659250", icon: MessageCircle },
	{ label: "Steam", value: "papiyanu", href: "https://steamcommunity.com/profiles/76561198950743615/", icon: Gamepad2 },
];

export default function Contact() {
	return (
		<section className="space-y-6 p-6 text-[#384250]">
			<div className="space-y-4">
				{links.map((link) => {
					const Icon = link.icon;
					const content = (
						<>
							<Icon className="h-4 w-4 text-[#3584e4]" />
							<span className="font-mono text-xs text-[#667085]">{link.label}</span>
							<span className="min-w-0 wrap-break-word font-mono text-sm text-[#1c71d8] group-hover:underline">
								{link.value}
							</span>
						</>
					);

					if (!link.href) {
						return (
							<div
								key={link.label}
								className="grid grid-cols-[1rem_5rem_1fr] items-center gap-3 rounded-md border border-transparent px-3 py-2"
							>
								{content}
							</div>
						);
					}

					return (
						<a
							key={link.label}
							href={link.href}
							target={link.href.startsWith("http") ? "_blank" : undefined}
							rel={link.href.startsWith("http") ? "noreferrer" : undefined}
							className="group grid grid-cols-[1rem_5rem_1fr] items-center gap-3 rounded-md border border-transparent px-3 py-2 transition-colors hover:border-[#d0d7de] hover:bg-white/70"
						>
							{content}
						</a>
					);
				})}
			</div>
		</section>
	);
}
