const skillGroups = [
	{
		title: "Languages",
		skills: ["TypeScript", "JavaScript", "Python", "SQL"],
	},
	{
		title: "Frameworks & Libraries",
		skills: ["React", "Next.js", "Node.js", "Express"],
	},
	{
		title: "Tools & Platforms",
		skills: ["Git", "Docker", "Vercel", "Linux", "VS Code"],
	},
	{
		title: "Currently Learning",
		skills: ["Rust", "Three.js"],
	},
];

export default function Skills() {
	return (
		<section className="space-y-6 p-6 text-[#384250]">
			{skillGroups.map((group) => (
				<div key={group.title}>
					<h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-[#667085]">{group.title}</h2>
					<div className="flex flex-wrap gap-2">
						{group.skills.map((skill) => (
							<span
								key={skill}
								className="rounded-md border border-[#d0d7de] bg-white/70 px-3 py-1 font-mono text-xs text-[#384250] shadow-sm"
							>
								{skill}
							</span>
						))}
					</div>
				</div>
			))}
		</section>
	);
}
