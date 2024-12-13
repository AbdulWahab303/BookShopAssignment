
import Link from 'next/link';

const BookNotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Book Not Found</h2>
      <p className="mt-2 text-gray-700">Sorry, the book you are looking for does not exist.</p>
      <Link className="mt-4 text-blue-500 hover:underline" href="/books">
        Go back to Books List
      </Link>
    </div>
  );
};

export default BookNotFoundPage;
