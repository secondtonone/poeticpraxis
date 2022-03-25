/* https://porfirevich.ru/ */

export async function getResult(request: {promt: string , length: number, num_samples: number}) {
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
