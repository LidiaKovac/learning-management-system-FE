export const get_tinyurl = async (url: String):Promise<string> => {
	
	const response = await fetch(
		"https://api.rebrandly.com/v1/links",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				apikey: process.env.REACT_APP_REBRANDLY_KEY!,
			},
			body: JSON.stringify({
                    destination: url,
                    domain: { fullName: "rebrand.ly" }
            }),
		}
	)
	const json = await response.json()
    return json.shortUrl
}
