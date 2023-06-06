import "../Styles/Pagination/Pagination.css";

export default function Paginations({
  totalPosts,
  postPerPage,
  setCurrentPage,
  currentPage
}) {
  let pagenumber = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pagenumber.push(i);
  }
  return (
    <div className="pagination-wrapper">
      {pagenumber.map((number, index) => {
        return (
          <button key={index} onClick={() => setCurrentPage(number)} className={(currentPage===number)?"active":""}>
            {number}
          </button>
        );
      })}
    </div>
  );
}
