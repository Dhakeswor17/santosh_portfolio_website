import React from 'react';
import { FaHeart } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer data-testid="footer" className="theme-footer py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="theme-text-muted text-sm flex items-center justify-center gap-2">
          Built with <FaHeart className="theme-accent" /> by Santosh Nyaupane &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
