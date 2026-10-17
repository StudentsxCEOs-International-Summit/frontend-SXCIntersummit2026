import teamPhoto from '@/assets/images/img-ibcc-winner-team.jpg'
import buildingPhoto from '@/assets/images/img-building.jpg'

export type GalleryCategory = 'IBCC' | 'Chambers'

export const galleryFilters = ['All', 'IBCC', 'Chambers'] as const
export type GalleryFilter = (typeof galleryFilters)[number]

export interface GalleryItem {
  id: number
  src: string
  alt: string
  category: GalleryCategory
  /** CSS object-position, so the same dummy photo reads differently in each tile. */
  focus: string
}

// TODO: replace these dummy photos with the real event photos.
const dummyPhotos = [
  { src: teamPhoto, focus: '50% 30%' },
  { src: buildingPhoto, focus: '50% 50%' },
  { src: teamPhoto, focus: '20% 40%' },
  { src: teamPhoto, focus: '80% 35%' },
  { src: buildingPhoto, focus: '30% 60%' },
]

export const galleryItems: GalleryItem[] = Array.from({ length: 14 }, (_, i) => {
  const photo = dummyPhotos[i % dummyPhotos.length]
  const category: GalleryCategory = i % 2 === 0 ? 'IBCC' : 'Chambers'
  return {
    id: i + 1,
    src: photo.src,
    alt: `${category} event photo ${i + 1}`,
    category,
    focus: photo.focus,
  }
})
