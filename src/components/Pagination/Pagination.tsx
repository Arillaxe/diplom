import { useState } from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from 'evergreen-ui';

import './styles.css';

const Pagination = (props: any) => {
  const { totalPages, onNextClick, onPrevClick } = props;

  const [page, setPage] = useState(1);

  const next = () => {
    if (page === totalPages) return;

    setPage(page + 1);
    onNextClick(page + 1);
  }

  const prev = () => {
    if (page === 1) return;

    setPage(page - 1);
    onPrevClick(page - 1);
  }

  return (
    <div className="pagination">
      <div className="pagination-prev" onClick={prev}><ChevronLeftIcon /></div>
      <div className="pagination-info">Страница {page} из {totalPages}</div>
      <div className="pagination-next" onClick={next}><ChevronRightIcon /></div>
    </div>
  )
};

export default Pagination;
