import Link from "next/link";

export default function Home() {
	return (
		<div>
			<h1>hello world</h1>

			<Link href="api/auth">Login</Link>
		</div>
	);
}