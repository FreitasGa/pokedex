import Fuse from 'fuse.js';
import { useEffect, useState } from 'react';

export const useFilter = <T>(
  items: Array<T>,
  query: string,
  options?: Fuse.IFuseOptions<T> | undefined,
) => {
  const instance = new Fuse<T>(items, options);
  const [results, setResults] = useState(items);

  useEffect(() => {
    if (query === '') {
      setResults(items);
    } else {
      const result = instance.search(query.toLowerCase());
      setResults(result.map(({ item }) => item));
    }
  }, [items, query]);

  return results;
};
