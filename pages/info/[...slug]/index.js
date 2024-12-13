import { useRouter } from "next/router";
import { useTheme } from "@/context/theme";
import { useState } from "react";

const InfoPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { theme } = useTheme();

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let content;

  if (!slug || slug.length === 0) {
    content = <h1 className="text-3xl font-bold">Welcome to the Info Page</h1>;
  } else if (slug[0] === "faqs") {
    content = (
      <div>
        <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="border rounded-md p-5 shadow-md">
              <button
                onClick={() => toggleAnswer(index)}
                className={`flex justify-between items-center w-full text-left p-2 rounded ${
                  theme === "dark"
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                <div className="font-semibold">{faq.question}</div>
                <div>{openIndex === index ? "-" : "+"}</div>
              </button>
              {openIndex === index && <p className="mt-2">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  } else if (slug[0] === "support") {
    content = (
      <div>
        <h1 className="text-3xl font-bold mb-4">Support</h1>
        <p className="mb-2">
          If you need support, please contact us at{" "}
          <a
            href="mailto:l215291@lhr.nu.edu.pk"
            className="text-blue-500 hover:underline"
          >
            l215291@lhr.nu.edu.pk
          </a>
          .
        </p>
        <p>
          You can also visit our{" "}
          <a
            href="https://nu.edu.pk/"
            className="text-blue-500 hover:underline"
          >
            Help Center
          </a>{" "}
          for more information.
        </p>
      </div>
    );
  } else if (slug[0] === "contact") {
    content = (
      <div
        className={`border-2 shadow-md ${
          theme === "light" ? "border-black" : "border-white"
        } p-10 rounded`}
      >
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <form className="flex flex-col space-y-4">
          <label className="font-semibold">Name:</label>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded text-black"
          />

          <label className="font-semibold">Email:</label>
          <input
            type="email"
            className="p-2 border border-gray-300 rounded text-black"
          />

          <label className="font-semibold">Message:</label>
          <textarea className="p-2 border border-gray-300 rounded text-black w-[500px]" />

          <button
            className={`px-4 py-2 rounded ${
              theme === "light"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-900 hover:bg-gray-500"
            } text-white`}
          >
            Send Message
          </button>
        </form>
      </div>
    );
  } else {
    content = <h1 className="text-3xl font-bold">Page Not Found</h1>;
  }

  return (
    <div
      className={`${
        theme === "dark" ? "bg-black text-white" : "bg-blue-200 text-black"
      } min-h-screen flex flex-col items-center justify-center p-6`}
    >
      {content}
    </div>
  );
};

const faqData = [
  {
    question: "What is this?",
    answer: "This is a sample FAQ page where you can ask common questions.",
  },
  {
    question: "How does it work?",
    answer: "It works by clicking on the questions to reveal the answers.",
  },
  {
    question: "Where can I find more info?",
    answer: "You can find more information in the support section.",
  },
  {
    question: "What if I encounter issues?",
    answer: "Please contact our support team for assistance.",
  },
];

export default InfoPage;
