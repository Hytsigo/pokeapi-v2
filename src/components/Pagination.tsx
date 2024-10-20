import React from "react";

interface PaginationProps {
    currentPage: number;
    onPrevious: () => void;
    onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    onPrevious,
    onNext,
}) => {
    return (
        <div className="mt-8 flex justify-center gap-8">
            <button
                className="w-32 bg-primary-100 text-text-100 px-4 py-2 rounded-lg hover:bg-primary-200 transition-all disabled:opacity-50"
                onClick={onPrevious}
                disabled={currentPage === 0}
            >
                Previous
            </button>
            <span className="text-text-100 font-medium flex items-center">
                Page {currentPage + 1}
            </span>
            <button
                className="w-32 bg-primary-100 text-text-100 px-4 py-2 rounded-lg hover:bg-primary-200 transition-all"
                onClick={onNext}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
