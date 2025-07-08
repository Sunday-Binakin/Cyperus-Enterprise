export default function ContentSection() {
  return (
    <div className="text-white space-y-6 ml-8">
      <p className="text-[#EFE554] text-lg font-medium">WE MAKE MORE THAN TIGERNUT DRINKS</p>
      <h2 className="text-4xl md:text-4xl font-bold leading-tight text-justify">
        See How To Create Magic,<br />
        With Our Tigernut Products
      </h2>
      <p className="text-gray-300 text-lg font-[15px] text-justify">
        At Tigernuts Republic, we have a variety of tigernut-based products, including cereals, ready-to-bake mixes, and pulp flour. Our snacks and drizzles add a tasty twist to your day. We even have meal swallows for a wholesome dish. We are all about bringing the natural goodness of tigernut to every part of your life.
      </p>
      <button className="relative bg-[#EFE554] text-[#55006F] px-8 py-4 rounded-lg font-semibold overflow-hidden group">
        <span className="relative z-10 group-hover:text-[#EFE554] transition-colors duration-300">LEARN SOME CULINARY MAGIC</span>
        <div className="absolute inset-0 bg-[#55006F] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
      </button>
    </div>
  );
} 