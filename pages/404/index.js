import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="mt-2 text-gray-700">Sorry, the page you are looking for does not exist.</p>
      <Link className="mt-4 text-blue-500 hover:underline" href="/">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
