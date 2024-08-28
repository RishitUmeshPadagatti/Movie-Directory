import React, { useState } from "react";

interface PaginationProps {
    setFunction: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination:React.FC<PaginationProps> = ({setFunction}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 500;
    let temp;

    const handleNext = () => {
        if (currentPage < totalPages) {
            temp = currentPage+1;
            setCurrentPage(temp);
            setFunction(temp)
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            temp = currentPage-1;
            setCurrentPage(currentPage - 1);
            setFunction(currentPage-1)
        }
    };

    const handleFirst = () => {
        setCurrentPage(1);
        setFunction(1)
    };

    const handleLast = () => {
        setCurrentPage(totalPages);
        setFunction(totalPages)
    };

    const handlePageClick = (pageNumber: React.SetStateAction<number>) => {
        setCurrentPage(pageNumber);
        setFunction(pageNumber)
    };

    const renderPageNumbers = () => {
        const pages = [];

        pages.push(
            <button
                key={1}
                onClick={() => handlePageClick(1)}
                className={`px-3 py-2 rounded ${currentPage === 1 ? "bg-cyan-400 text-black" : "bg-gray-800 text-white"}`}>
                1
            </button>
        );

        if (currentPage > 3) {
            pages.push(<span key="start-ellipsis" className="px-3 py-2 text-white">...</span>);
        }

        if (currentPage > 2) {
            pages.push(
                <button
                    key={currentPage - 1}
                    onClick={() => handlePageClick(currentPage - 1)}
                    className="bg-gray-800 text-white px-3 py-2 rounded">
                    {currentPage - 1}
                </button>
            );
        }

        if (currentPage > 1 && currentPage < totalPages) {
            pages.push(
                <button
                    key={currentPage}
                    onClick={() => handlePageClick(currentPage)}
                    className="bg-cyan-400 text-black px-3 py-2 rounded">
                    {currentPage}
                </button>
            );
        }

        if (currentPage < totalPages - 1) {
            pages.push(
                <button
                    key={currentPage + 1}
                    onClick={() => handlePageClick(currentPage + 1)}
                    className="bg-gray-800 text-white px-3 py-2 rounded">
                    {currentPage + 1}
                </button>
            );
        }

        if (currentPage < totalPages - 2) {
            pages.push(<span key="end-ellipsis" className="px-3 py-2 text-white">...</span>);
        }

        pages.push(
            <button
                key={totalPages}
                onClick={() => handlePageClick(totalPages)}
                className={`px-3 py-2 rounded ${currentPage === totalPages ? "bg-cyan-400 text-black" : "bg-gray-800 text-white"}`}>
                {totalPages}
            </button>
        );

        return pages;
    };

    return (
        <div className="flex space-x-2 items-center">
            <button
                onClick={handleFirst}
                className="bg-gray-800 text-white px-3 py-2 rounded"
                disabled={currentPage === 1}>
                «
            </button>
            <button
                onClick={handlePrevious}
                className="bg-gray-800 text-white px-3 py-2 rounded"
                disabled={currentPage === 1}>
                ‹
            </button>

            {renderPageNumbers()}

            <button
                onClick={handleNext}
                className="bg-gray-800 text-white px-3 py-2 rounded"
                disabled={currentPage === totalPages}>
                ›
            </button>
            <button
                onClick={handleLast}
                className="bg-gray-800 text-white px-3 py-2 rounded"
                disabled={currentPage === totalPages}>
                »
            </button>
        </div>
    );
};

export default Pagination;