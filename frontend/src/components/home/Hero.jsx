function Hero() {
  return (
    <section className="relative h-screen flex items-center">

      {/* Background Image */}
      <img
        src="https://t4.ftcdn.net/jpg/01/41/71/73/360_F_141717314_WSq1TJzC98sAHTrnYejY7niRfcR6cE6y.jpg"
        alt="chef"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">

        <p className="text-purple-300 font-semibold mb-4 text-lg">
          Trusted Home Chef Booking Platform
        </p>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Find Professional Chefs For Every Occasion
        </h1>

        <p className="mt-6 text-lg leading-8 max-w-xl">
          Book experienced and verified chefs for parties,
          home cooking, special events, and daily meal services.
        </p>

        <div className="mt-8 flex gap-4">

          <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl text-lg font-semibold transition">
            Book Now
          </button>

          <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl text-lg font-semibold transition">
            Explore Chefs
          </button>

        </div>
      </div>
    </section>
  );
}
export default Hero;