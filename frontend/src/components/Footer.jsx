import "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-24">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-12 flex flex-col sm:flex-row sm:items-start justify-between gap-8">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white">StudioSync</h2>
          <p className="text-sm text-gray-400 mt-2 max-w-[220px]">
            Flexible spaces for focused work. Book your creative space today.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap gap-x-10 gap-y-3 text-sm">
          {[
            "Explore",
            "How It Works",
            "My Bookings",
            "Become a Host",
            "About",
            "Contact",
          ].map((link) => (
            <a
              key={link}
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Social Media Links */}
        <div className="flex gap-4">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Facebook"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.325v21.351C0 23.4.6 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.31h3.59l-.467 3.622h-3.123V24h6.116c.725 0 1.325-.6 1.325-1.324V1.325C24 .6 23.4 0 22.675 0z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Twitter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.949.564-2.005.974-3.127 1.195-.897-.959-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.087-.205-7.719-2.165-10.148-5.144-.422.722-.666 1.561-.666 2.475 0 1.708.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.062c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.317 0-.626-.03-.927-.086.627 1.956 2.444 3.379 4.6 3.419-1.68 1.319-3.809 2.105-6.102 2.105-.396 0-.788-.023-1.175-.067 2.179 1.396 4.768 2.211 7.548 2.211 9.054 0 14.002-7.496 14.002-13.986 0-.213-.005-.425-.014-.636.961-.695 1.8-1.562 2.46-2.549z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.512a4.92 4.92 0 0 1 1.675 1.675c.272.46.456 1.26.512 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.512 2.43a4.92 4.92 0 0 1-1.675 1.675c-.46.272-1.26.456-2.43.512-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.512a4.92 4.92 0 0 1-1.675-1.675c-.272-.46-.456-1.26-.512-2.43-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.056-1.17.24-1.97.512-2.43a4.92 4.92 0 0 1 1.675-1.675c.46-.272 1.26-.456 2.43-.512 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.013-4.947.072-1.281.059-2.153.27-2.91.57a6.92 6.92 0 0 0-2.51 1.675 6.92 6.92 0 0 0-1.675 2.51c-.3.757-.511 1.629-.57 2.91-.059 1.28-.072 1.688-.072 4.947s.013 3.667.072 4.947c.059 1.281.27 2.153.57 2.91a6.92 6.92 0 0 0 1.675 2.51 6.92 6.92 0 0 0 2.51 1.675c.757.3 1.629.511 2.91.57 1.28.059 1.688.072 4.947.072s3.667-.013 4.947-.072c1.281-.059 2.153-.27 2.91-.57a6.92 6.92 0 0 0 2.51-1.675 6.92 6.92 0 0 0 1.675-2.51c.3-.757.511-1.629.57-2.91.059-1.28.072-1.688.072-4.947s-.013-3.667-.072-4.947c-.059-1.281-.27-2.153-.57-2.91a6.92 6.92 0 0 0-1.675-2.51 6.92 6.92 0 0 0-2.51-1.675c-.757-.3-1.629-.511-2.91-.57-1.28-.059-1.688-.072-4.947-.072zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0-2.88 1.44 1.44 0 0 0 0 2.88z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 pb-8 text-sm text-gray-500 text-center">
        © 2026 StudioSync. All rights reserved.
      </div>
    </footer>
  );
}