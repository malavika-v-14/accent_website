// Curated Unsplash photography, served locally for reliable loading.
const PHOTOS = {
  workshop: "/images/workshop.jpg",
  mentor: "/images/collaborate.jpg",
  talk: "/images/talk.jpg",
  campus: "/images/campus.jpg",
  corporate: "/images/team.jpg",
} as const;

export function photo(key: keyof typeof PHOTOS, _width = 1200) {
  return PHOTOS[key];
}
