import { Code2, Link, Mail } from "lucide-react";

const links = [
	{ label: "Email", value: "you@example.com", href: "mailto:you@example.com", icon: Mail },
	{ label: "GitHub", value: "github.com/your-handle", href: "https://github.com/your-handle", icon: Code2 },
	{
		label: "LinkedIn",
		value: "linkedin.com/in/your-handle",
		href: "https://linkedin.com/in/your-handle",
		icon: Link,
	},
];

export default function Contact() {
	return (
		<section className="space-y-6 p-6 text-[#384250]">
			<div className="space-y-4">
				{links.map((link) => {
					const Icon = link.icon;

					return (
						<a
							key={link.label}
							href={link.href}
							target={link.href.startsWith("http") ? "_blank" : undefined}
							rel={link.href.startsWith("http") ? "noreferrer" : undefined}
							className="grid grid-cols-[1rem_5rem_1fr] items-center gap-3 rounded-md border border-transparent py-2 transition-colors hover:border-[#d0d7de] hover:bg-white/70"
						>
							<Icon className="h-4 w-4 text-[#3584e4]" />
							<span className="font-mono text-xs text-[#667085]">{link.label}</span>
							<span className="min-w-0 wrap-break-word font-mono text-sm text-[#1c71d8] hover:underline">
								{link.value}
							</span>
						</a>
					);
				})}
			</div>
			<p className="border-t border-[#d0d7de] pt-5 text-sm leading-relaxed text-[#384250]">
				Currently open to freelance and full-time opportunities.
			</p>
		</section>
	);
}
