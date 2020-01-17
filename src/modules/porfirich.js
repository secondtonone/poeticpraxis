/* https://porfirevich.ru/ */

export async function getResult({promt = '', length = 1, num_samples = 4} = request) {
    const response = await fetch('https://models.dobro.ai/gpt2/medium/', {
        credentials: 'omit',
        headers: {
            accept: '*/*'
        },
        body: JSON.stringify(request),
        method: 'POST',
        mode: 'cors'
    });
    return response.json();
}
