import React from "react";

interface Props {
    currentPage: number;
    onPrevious: () => void;
    onNext: () => void;
}

const Pagination: React.FC<Props> = ({ currentPage, onPrevious, onNext }) => {
    return (
        <div className="flex flex-col items-center mt-8">
            <div className="flex items-center space-x-4 mb-2">
                <button
                    onClick={onPrevious}
                    className="px-4 py-2 bg-primary-200 text-white rounded-lg shadow hover:bg-primary-300 transition"
                >
                    Previous
                </button>
                <span className="text-lg font-medium text-text-200">
                    Page {currentPage}
                </span>
                <button
                    onClick={onNext}
                    className="px-4 py-2 bg-primary-200 text-white rounded-lg shadow hover:bg-primary-300 transition"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
