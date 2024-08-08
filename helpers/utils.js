

export default function generateUID() {
    // Create a random 4-character string from the current timestamp
    let uid = Date.now().toString(36);

    // Append a random string of 6 characters to increase uniqueness
    uid += Math.random().toString(36).slice(2, 8);

    return uid;
}