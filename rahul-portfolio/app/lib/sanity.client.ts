import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: '8mucj3ri',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skWqVoMGV8Fq2vva137jLBNk3smVrPDky0uTbHV0XKK1zAdYORsKUv9uCrjiX5nX0FvDIoJjV8g9hxW6PLfzFtm504g1MZ5HLzkgLWW84rN86aYoAYpGBARj1EZvekzc8jpkCylInYwBVFfjOcnaCeWlDd7XLnr0Z420ePbZcGjEsP6fUaZ1',
})

export const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
