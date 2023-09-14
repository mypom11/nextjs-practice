import fs from 'fs/promises'
import path from 'path'

export const getData = async () => {
  const filePath = path.join(process.cwd(), 'src', 'data', 'data.json')
  const jsonData = await fs.readFile(filePath, { encoding: 'utf-8' })
  const data = JSON.parse(jsonData)
  return data
}
