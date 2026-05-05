import { Code2, ExternalLink } from "lucide-react";
import { SiFramer, SiNextdotjs, SiTailwindcss, SiTypescript, SiVercel } from "react-icons/si";

const techStack = [
	{ label: "Next.js", icon: <SiNextdotjs className="h-3.5 w-3.5" /> },
	{ label: "TypeScript", icon: <SiTypescript className="h-3.5 w-3.5 text-[#3178c6]" /> },
	{ label: "Tailwind", icon: <SiTailwindcss className="h-3.5 w-3.5 text-[#38bdf8]" /> },
	{ label: "Framer Motion", icon: <SiFramer className="h-3.5 w-3.5" /> },
	{ label: "Vercel", icon: <SiVercel className="h-3.5 w-3.5" /> },
];

export default function Projects() {
	return (
		<section className="p-6">
			<article className="flex min-h-70 flex-col rounded-lg border border-[#d0d7de] bg-white/68 p-5 shadow-sm backdrop-blur-xl">
				<div className="space-y-3">
					<div className="flex items-start justify-between gap-4">
						<div>
							<p className="font-mono text-xs uppercase tracking-widest text-[#667085]">Featured Project</p>
							<h2 className="mt-2 font-mono text-xl text-[#1f2933]">JayOS</h2>
						</div>
						<span className="rounded-md border border-[#99c1f1] bg-[#eaf4ff] px-2 py-1 font-mono text-xs text-[#1c71d8]">
							Completed
						</span>
					</div>
					<p className="max-w-xl text-justify text-sm leading-relaxed text-[#384250]">
						An interactive portfolio that presents sections as draggable Linux-style windows, complete
						with a boot sequence, dock, and fastfetch-inspired terminal.
					</p>
				</div>

				<div className="mt-5 flex flex-wrap gap-2">
					{techStack.map(({ label, icon }) => (
						<span key={label} className="inline-flex items-center gap-1.5 rounded-md border border-[#d0d7de] bg-white/70 px-3 py-1 font-mono text-xs text-[#384250] shadow-sm">
							{icon}
							{label}
						</span>
					))}
				</div>

				<div className="mt-auto flex flex-wrap gap-3 pt-8">
					<a
						href="https://github.com/ilovecarbonara/jaygmz-portfolio"
						target="_blank"
						rel="noreferrer"
						className="inline-flex items-center gap-2 rounded-md border border-[#d0d7de] bg-white/70 px-3 py-2 font-mono text-sm text-[#1c71d8] transition-colors hover:bg-[#eaf4ff]"
					>
						<Code2 className="h-4 w-4" />
						GitHub
					</a>
					<a
						href="https://jaygmz.vercel.app"
						target="_blank"
						rel="noreferrer"
						className="inline-flex items-center gap-2 rounded-md border border-[#d0d7de] bg-white/70 px-3 py-2 font-mono text-sm text-[#1c71d8] transition-colors hover:bg-[#eaf4ff]"
					>
						<ExternalLink className="h-4 w-4" />
						Live
					</a>
				</div>
			</article>
		</section>
	);
}
