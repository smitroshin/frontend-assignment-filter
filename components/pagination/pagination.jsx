import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactPaginate from 'react-paginate';
import styles from './pagination.module.css';

const previousLabel = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);
const nextLabel = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

export function Pagination(props) {
  const { className, ...rest } = props;
  return (
    <ReactPaginate
      pageRangeDisplayed={3}
      renderOnZeroPageCount={null}
      {...rest}
      className={classNames(styles.wrapper, className)}
      previousClassName={styles.arrow}
      nextClassName={styles.arrow}
      breakLabel="..."
      previousLabel={previousLabel}
      nextLabel={nextLabel}
    />
  );
}

Pagination.defaultProps = {
  className: '',
};

Pagination.propTypes = {
  className: PropTypes.string,
};
