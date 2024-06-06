"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Callback = () => {
	const searchParams = useSearchParams();
	const [profile, setProfile] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchUserProfile() {
			const code = searchParams.get("code");
			if (!code) {
				setError("No code found in query parameters");
				return;
			}

			try {
				const response = await fetch(`api/auth/callback?code=${code}`);
				const data = await response.json();

				if (response.ok) {
					setProfile(data);
				} else {
					setError(data.error || "Failed to fetch profile");
				}
			} catch (err) {
				setError(err.message);
			}
		}

		fetchUserProfile();
	}, [searchParams]);

	return (
		<div>
			<h1>Spotify Callback</h1>
			{error && <p>Error: {error}</p>}
			{profile ? (
				<div>
					<h2>User Profile</h2>
					<p>Name: {profile.display_name}</p>
					<p>Email: {profile.email}</p>
					<img src={profile.images?.url} alt="Profile Picture" />
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default Callback;
