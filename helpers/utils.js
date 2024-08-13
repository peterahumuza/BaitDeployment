export default function generateUID() {
    // Create a random 4-character string from the current timestamp
    let uid = Date.now().toString(36);

    // Append a random string of 6 characters to increase uniqueness
    uid += Math.random().toString(36).slice(2, 8);

    return uid;
}

export const formatTimestamp = (timestamp) => {
    if (timestamp && timestamp.seconds) {
        const date = new Date(timestamp.seconds * 1000);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
        return `${formattedDate} ${formattedTime}`;
    }
    return '';
};
