export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="text-center text-gray-500 text-sm animate-fade-in pb-8">
      <p>© {currentYear} Jamie Smith. All rights reserved.</p>
      <div className="mt-2 flex justify-center space-x-4">
        <a href="#" className="text-gray-500 hover:text-gray-700">Privacy Policy</a>
        <a href="#" className="text-gray-500 hover:text-gray-700">Terms of Service</a>
        <a href="#" className="text-gray-500 hover:text-gray-700">Contact</a>
      </div>
    </footer>
  );
}
