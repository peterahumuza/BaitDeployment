export default async function APICall(messages) {
    const API_URL = "https://moove-meditron.co.uk/v1/chat/completions"; //test server
    const MODEL = "llama-3-70b-meditron";
    const data = {
        model: MODEL,
        messages: messages
    };
    console.log(messages)

    try {
        const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        });

        const responseData = await response.json();
        return responseData.choices[0].message.content;
    } catch (error) {
        return null;
    }
}
