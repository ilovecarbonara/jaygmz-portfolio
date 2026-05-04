export default function About() {
	return (
		<section className="grid gap-6 p-6 md:grid-cols-[180px_1fr]">
			<div className="flex aspect-square items-center justify-center rounded-lg border border-[#d0d7de] bg-[#f6f8fb] font-mono text-sm text-[#5f6b7a] shadow-inner">
				[photo: not found]
			</div>
			<div className="space-y-6">
				<div className="space-y-2 font-mono text-sm">
					<p>
						<span className="inline-block w-24 text-[#667085]">Name:</span>
						<span className="text-[#1f2933]">Your Full Name</span>
					</p>
					<p>
						<span className="inline-block w-24 text-[#667085]">Role:</span>
						<span className="text-[#384250]">Full-Stack Developer</span>
					</p>
					<p>
						<span className="inline-block w-24 text-[#667085]">Location:</span>
						<span className="text-[#384250]">Cebu, Philippines</span>
					</p>
				</div>

				<div className="space-y-2">
					<h2 className="font-mono text-xs uppercase tracking-widest text-[#3584e4]">Bio</h2>
					<p className="text-sm leading-relaxed text-[#384250]">
						I&apos;m a developer who loves building thoughtful web experiences with clean code, practical UX,
						and a strong bias toward shipping. This desktop portfolio is designed to feel familiar,
						inspectable, and a little playful without getting in the way.
					</p>
				</div>

				<div className="space-y-2">
					<h2 className="font-mono text-xs uppercase tracking-widest text-[#3584e4]">Currently</h2>
					<p className="text-sm leading-relaxed text-[#384250]">
						Open to freelance projects, product work, and teams that care about craft.
					</p>
				</div>
			</div>
		</section>
	);
}
