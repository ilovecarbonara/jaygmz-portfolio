import { DiJava } from "react-icons/di";
import { FaAws } from "react-icons/fa";
import {
	SiFigma,
	SiGit,
	SiGithub,
	SiLinux,
	SiNextdotjs,
	SiNodedotjs,
	SiPostgresql,
	SiPython,
	SiReact,
	SiSolidity,
	SiSupabase,
	SiTailwindcss,
	SiTypescript,
	SiVercel,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import type { IconType } from "react-icons";

type Skill = { name: string; icon?: IconType };

const skillGroups: { title: string; skills: Skill[] }[] = [
	{
		title: "Languages",
		skills: [
			{ name: "TypeScript", icon: SiTypescript },
			{ name: "C#", icon: TbBrandCSharp },
			{ name: "Java", icon: DiJava },
			{ name: "Solidity", icon: SiSolidity },
		],
	},
	{
		title: "Frontend",
		skills: [
			{ name: "Next.js", icon: SiNextdotjs },
			{ name: "React", icon: SiReact },
			{ name: "Tailwind CSS", icon: SiTailwindcss },
		],
	},
	{
		title: "Backend",
		skills: [
			{ name: "Node.js", icon: SiNodedotjs },
			{ name: "Supabase", icon: SiSupabase },
			{ name: "PostgreSQL", icon: SiPostgresql },
		],
	},
	{
		title: "Tools & Platforms",
		skills: [
			{ name: "Git", icon: SiGit },
			{ name: "GitHub", icon: SiGithub },
			{ name: "Figma", icon: SiFigma },
			{ name: "Vercel", icon: SiVercel },
			{ name: "Hardhat" },
		],
	},
	{
		title: "Currently Learning",
		skills: [
			{ name: "Linux", icon: SiLinux },
			{ name: "Python", icon: SiPython },
			{ name: "Prompt Engineering" },
			{ name: "System Design" },
			{ name: "AWS", icon: FaAws },
		],
	},
];

export default function Skills() {
	return (
		<section className="space-y-6 p-6 text-[#384250]">
			{skillGroups.map((group) => (
				<div key={group.title}>
					<h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-[#667085]">{group.title}</h2>
					<div className="flex flex-wrap gap-2">
						{group.skills.map(({ name, icon: Icon }) => (
							<span
								key={name}
								className="flex items-center gap-1.5 rounded-md border border-[#d0d7de] bg-white/70 px-3 py-1 font-mono text-xs text-[#384250] shadow-sm"
							>
								{Icon && <Icon className="size-3.5 shrink-0" />}
								{name}
							</span>
						))}
					</div>
				</div>
			))}
		</section>
	);
}
