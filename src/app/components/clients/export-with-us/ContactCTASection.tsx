export default function ContactCTASection() {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold font-serif mb-8">Ready to Partner? Let's Grow Together!</h2>
        
        <div className="mb-12">
          <p className="text-xl mb-2">
            <span className="font-semibold">Email:</span>{' '}
            <a href="mailto:exports@cyperusenterprise.com" className="text-[#4A651F] hover:underline">
              exports@cyperusenterprise.com
            </a>
          </p>
          <p className="text-xl">
            <span className="font-semibold">Phone:</span> +233 XXX XXX XXXX
          </p>
        </div>
        
        <a 
          href="#inquiry-form" 
          className="bg-[#4A651F] text-white px-8 py-4 rounded-md text-lg font-bold inline-flex items-center hover:bg-[#4A651F] transition-colors duration-300 shadow-lg"
        >
          Become a Distributor Today →
        </a>
      </div>
    </section>
  );
}
