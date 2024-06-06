export const getCurrentUserProfile = async (token) => {
	const response = await fetch(`https://api.spotify.com/v1/me`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const data = await response.json();

	return data;
};

export const getAccessToken = async () => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/`)
};
