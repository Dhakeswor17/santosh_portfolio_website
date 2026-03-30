import React from 'react';
import { FaHeart } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer data-testid="footer" className="py-12 px-6 border-t border-white/5" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-[#71717A] text-sm flex items-center justify-center gap-2">
          Built with <FaHeart className="text-[#4D9FFF]" /> by Santosh Nyaupane © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
