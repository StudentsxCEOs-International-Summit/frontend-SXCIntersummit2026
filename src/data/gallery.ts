import chambers1 from '@/assets/images/gallery/img-chambers-1.webp'
import chambers2 from '@/assets/images/gallery/img-chambers-2.webp'
import chambers3 from '@/assets/images/gallery/img-chambers-3.webp'
import chambers4 from '@/assets/images/gallery/img-chambers-4.webp'
import chambers5 from '@/assets/images/gallery/img-chambers-5.webp'
import chambers6 from '@/assets/images/gallery/img-chambers-6.webp'
import companyVisit1 from '@/assets/images/gallery/img-company-visit-1.webp'
import companyVisit2 from '@/assets/images/gallery/img-company-visit-2.webp'
import companyVisit3 from '@/assets/images/gallery/img-company-visit-3.webp'
import companyVisit4 from '@/assets/images/gallery/img-company-visit-4.webp'
import companyVisit5 from '@/assets/images/gallery/img-company-visit-5.webp'
import companyVisit6 from '@/assets/images/gallery/img-company-visit-6.webp'

export type GalleryCategory = 'Chambers' | 'Company Visit'

export const galleryFilters = ['All', 'Chambers', 'Company Visit'] as const
export type GalleryFilter = (typeof galleryFilters)[number]

export interface GalleryItem {
  id: number
  src: string
  alt: string
  category: GalleryCategory
  /** CSS object-position, so the same photo can read differently in each tile. */
  focus: string
}

const chambersPhotos = [chambers1, chambers2, chambers3, chambers4, chambers5, chambers6].map(
  (src) => ({ src, focus: '50% 50%' }),
)

const companyVisitPhotos = [
  companyVisit1,
  companyVisit2,
  companyVisit3,
  companyVisit4,
  companyVisit5,
  companyVisit6,
].map((src) => ({ src, focus: '50% 40%' }))

const photosByCategory: Record<GalleryCategory, { src: string; focus: string }[]> = {
  Chambers: chambersPhotos,
  'Company Visit': companyVisitPhotos,
}

// Alternate the categories so the "All" mosaic mixes them; any surplus follows at the end.
const categories = Object.keys(photosByCategory) as GalleryCategory[]
const order: GalleryCategory[] = []
const longest = Math.max(...categories.map((c) => photosByCategory[c].length))
for (let i = 0; i < longest; i += 1) {
  for (const category of categories) {
    if (i < photosByCategory[category].length) order.push(category)
  }
}

const used: Record<GalleryCategory, number> = { Chambers: 0, 'Company Visit': 0 }

export const galleryItems: GalleryItem[] = order.map((category, i) => {
  const photo = photosByCategory[category][used[category]++]
  return {
    id: i + 1,
    src: photo.src,
    alt: `${category} event photo ${used[category]}`,
    category,
    focus: photo.focus,
  }
})
