/**
 * Sorts an array of product items immutably based on the chosen sort criterion.
 * Reusable across catalog listings and category spaces.
 */
export function sortProducts(items, sortBy = 'featured') {
  const list = [...items];
  switch (sortBy) {
    case 'popularity':
      return list.sort((a, b) => b.popularity - a.popularity);
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price);
    case 'name':
      return list.sort((a, b) => a.title.localeCompare(b.title));
    case 'featured':
    default:
      return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }
}
