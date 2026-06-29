"use client";

export default function Stats() {
  const stats = [
    {
      value: "100+",
      label: "Doctors",
    },
    {
      value: "10K+",
      label: "Patients",
    },
    {
      value: "5K+",
      label: "Appointments",
    },
    {
      value: "4.9★",
      label: "Average Rating",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item) => (
            <div
              key={item.label}
              className="card bg-base-100 border shadow"
            >
              <div className="card-body text-center">
                <h2 className="text-5xl font-bold text-primary">
                  {item.value}
                </h2>

                <p className="opacity-70 mt-2">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}