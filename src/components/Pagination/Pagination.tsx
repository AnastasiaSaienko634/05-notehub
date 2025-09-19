import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  onPageChange: (number: number) => void;
  totalPages: number;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <>
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => onPageChange(selected + 1)}
        forcePage={currentPage - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
      />
    </>
  );
};

export default Pagination;
