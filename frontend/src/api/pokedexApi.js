// Cliente da API REST (Spring Boot + MongoDB).
// Em desenvolvimento o Vite redireciona /api para o backend (ver vite.config.js);
// para apontar para outro servidor, defina VITE_API_URL (ex.: https://minha-api.com/api).
const BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

async function request(path, options) {
  let response
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch {
    throw new Error('Não foi possível conectar à API. O backend está rodando?')
  }

  if (!response.ok) {
    let message = `Erro ${response.status} ao acessar a API`
    try {
      const body = await response.json()
      if (body.message) message = body.message
    } catch {
      // resposta sem corpo JSON: mantém a mensagem padrão
    }
    throw new Error(message)
  }

  return response.status === 204 ? null : response.json()
}

export const getPokemons = () => request('/pokemons')
export const getTypes = () => request('/types')
export const getTrainers = () => request('/trainers')
