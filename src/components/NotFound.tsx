import React from "react";

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-bg-100 text-text-100 p-8">
            <h1 className="text-4xl font-bold mb-4 text-primary-200">
                404 Not Found
            </h1>
            <p className="mb-4">
                Sorry, the page you are looking for does not exist.
            </p>
            <p>You might want to go back to the homepage.</p>
            <a
                href="/"
                className="mt-4 px-4 py-2 bg-primary-200 text-bg-100 rounded-lg hover:bg-primary-300 transition-colors"
            >
                Go back to homepage
            </a>
        </div>
    );
};

export default NotFound;
