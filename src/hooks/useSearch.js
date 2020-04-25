import Fuse from 'fuse.js';

export default function useSearch(options = {}) {
  const { data, keys = [], query } = options;
  let results;

  if ( query && query !== '' ) {
    const fuse = new Fuse(data, {
      keys
    })

    results = fuse.search(query)
  } else {
    results = data.map(d => {
      return {
        item: d
      }
    })
  }

  return {
    results
  }
}
