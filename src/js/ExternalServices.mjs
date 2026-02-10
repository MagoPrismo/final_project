export async function getJson(url) {
    const response = await fetch(url);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Bad Response');
    }
}