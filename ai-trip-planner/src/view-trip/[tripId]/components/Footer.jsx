import React from 'react';
import { IoMdHeart } from "react-icons/io";

function Footer() {
    return (
        <footer className="mt-20 py-5 bg-gray-100">
            <div className="flex items-center justify-center text-gray-700 text-sm">
                Made with <IoMdHeart className="mx-1 text-red-500" /> by <span className="font-semibold ml-1">Jimil Soni</span>
            </div>
        </footer>
    );
}

export default Footer;
