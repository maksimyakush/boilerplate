export const fetcher = async <Data>(link: string): Promise<Data> => {
  const response = await fetch(link)
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`)
  }
  const data = await response.json()

  return data
}