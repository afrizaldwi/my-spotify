import { nanoid } from "nanoid";
import { redirect } from "next/dist/server/api-utils";
import querystring from "querystring";

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

export async function GET() {
	const state = nanoid(16);

	const queryParams = querystring.stringify({
		response_type: "code",
		client_id: client_id,
		state: state,
		redirect_uri: redirect_uri,
	});

	const redirectUrl = `https://accounts.spotify.com/authorize?${queryParams}`;

	return Response.redirect(redirectUrl);
}
