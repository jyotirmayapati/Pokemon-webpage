import { useState } from 'react';

export const usePagination = () => {
  const [page, setPage] = useState(1);
  const nextPage = () => setPage(page + 1);
  const previousPage = () => setPage(page > 1 ? page - 1 : 1);

  return { page, nextPage, previousPage };
};
