import { NextResponse } from "next/server";

export async function GET(request) {
	const client_id = process.env.CLIENT_ID;
	const client_secret = process.env.CLIENT_SECRET;
	const redirect_uri = process.env.REDIRECT_URI;

	const { searchParams } = new URL(request.url);
	const code = searchParams.get("code");

	if (!code) {
		return NextResponse.json({ error: "No code provided" }, { status: 400 });
	}

	const params = new URLSearchParams({
		grant_type: "client_credentials",
		client_id,
		client_secret,
		redirect_uri,
		code,
	});

	const response = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
 		body: new URLSearchParams({
			grant_type: "authorization_code",
			code,
			redirect_uri,
		}),
	});

	const data = await response.json();

	console.log(data);

	if (data.error) {
		return NextResponse.json({ error: data.error }, { status: 400 });
	}

	// Fetch user profile using the access token
	const profileResponse = await fetch("https://api.spotify.com/v1/me", {
		headers: {
			Authorization: `Bearer ${data.access_token}`,
		},
	});

	const profile = await profileResponse.json();

	return NextResponse.json(profile);
}
