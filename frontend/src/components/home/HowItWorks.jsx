import { FaUserTie, FaCalendarCheck, FaUtensils } from "react-icons/fa";

function HowItWorks() {
  const steps = [
    {
      icon: <FaUserTie size={30} />,
      title: "Choose Chef",
      desc: "Browse and select from our verified professional chefs."
    },
    {
      icon: <FaCalendarCheck size={30} />,
      title: "Book Service",
      desc: "Schedule your preferred date and time easily."
    },
    {
      icon: <FaUtensils size={30} />,
      title: "Enjoy Meal",
      desc: "Relax and enjoy delicious food at your home."
    }
  ];

  return (
    <section className="py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-10">
        How It Works
      </h2>

      <div className="grid md:grid-cols-3 gap-8 px-6 md:px-20">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="text-purple-600 mb-4 flex justify-center">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;