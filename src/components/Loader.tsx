import React from "react";

const Loader: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-t-4 border-primary-200 rounded-full animate-spin"></div>
        </div>
    );
};

export default Loader;
