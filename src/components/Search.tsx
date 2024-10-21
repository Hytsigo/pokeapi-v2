import React from "react";

interface Props {
    onSearch: (query: string) => void;
}

const Search: React.FC<Props> = ({ onSearch }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        onSearch(value);
    };

    return (
        <div className="flex justify-center">
            <form className="w-4/6 mt-6 mb-8">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-text-200"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="search"
                        className="block w-full p-4 pl-10 text-sm text-text-100 border border-gray-300 rounded-lg bg-bg-200 focus:ring-primary-100 focus:border-primary-100 dark:bg-bg-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-text-100 dark:focus:ring-primary-200 dark:focus:border-primary-200"
                        placeholder="Search your favorites"
                        onChange={handleChange}
                        required
                    />
                </div>
            </form>
        </div>
    );
};

export default Search;
