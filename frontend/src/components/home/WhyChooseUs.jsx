import {
  FaUserTie,
  FaClipboardCheck,
  FaClock,
  FaHeadset,
} from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaUserTie size={50} />,
      title: "Professional Cooks",
    },
    {
      icon: <FaClipboardCheck size={50} />,
      title: "Easy Booking",
    },
    {
      icon: <FaClock size={50} />,
      title: "Timely Service",
    },
    {
      icon: <FaHeadset size={50} />,
      title: "Prompt Support",
    },
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <h2 className="text-4xl font-bold text-center mb-14">
        Why Choose{" "}
        <span className="text-orange-500">
          ChefKart?
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className="border border-gray-600 rounded-3xl p-8 text-center hover:scale-105 transition"
          >
            <div className="flex justify-center text-orange-500 mb-6">
              {feature.icon}
            </div>

            <h3 className="text-2xl font-semibold">
              {feature.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;