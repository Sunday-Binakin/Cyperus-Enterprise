export default function ContentSection() {
  return (
    <div className="text-white space-y-6 ml-8">
      <p className="text-[#EFE554] text-lg font-medium">GHANA&apos;S HEARTBEAT OF TIGERNUT INNOVATION</p>
      {/* <p className="text-[#EFE554] text-lg font-medium">WE MAKE MORE THAN TIGERNUT DRINKS</p> */}
      <h2 className="text-4xl md:text-4xl font-bold leading-tight  ">
        Discover The Possibilities With Tigernut
      </h2>
      {/* <h2 className="text-4xl md:text-4xl font-bold leading-tight text-justify">
        See How To Create Magic,<br />
        With Our Tigernut Products
      </h2> */}
      <p className="text-gray-300 text-lg leading-relaxed  text-justify">
        At <strong>Cyperus Enterprise</strong>, we go beyond beverages — we&apos;re reimagining tigernut into everyday essentials. From refreshing drinks to wholesome snacks, nourishing popsicles, baking flour, and even poultry feed, our range is built to serve your <strong>health, taste, and community.</strong>
      </p>
      <p>
        Whether you&apos;re sipping, snacking, baking, or farming — there&apos;s a Cyperus product made just for you.
      </p>
      {/* <p className="text-gray-300 text-lg leading-relaxed ">
        At Tigernuts Republic, we have a variety of tigernut-based products, including cereals, ready-to-bake mixes, and pulp flour. Our snacks and drizzles add a tasty twist to your day. We even have meal swallows for a wholesome dish. We are all about bringing the natural goodness of tigernut to every part of your life.
      </p> */}
      <button className="relative bg-[#EFE554] text-[#4A651F] px-8 py-4 rounded-lg font-semibold overflow-hidden group">
        <span className="relative z-10 group-hover:text-[#EFE554] transition-colors duration-300">LEARN SOME CULINARY MAGIC</span>
        <div className="absolute inset-0 bg-[#4A651F] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
      </button>
    </div>
  );
}