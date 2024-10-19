import { useState } from "react";

// react-hook-form + yup/zod

function App() {
  const [selectedOption, setSelectedOption] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState({});

  // Regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Form validation
  const validate = () => {
    let tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = "First Name is required.";
    if (!formData.lastName) tempErrors.lastName = "Last Name is required.";
    if (!formData.email) {
      tempErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Email is not valid.";
    }
    if (!formData.message) tempErrors.message = "Message is required.";
    if (!formData.consent)
      tempErrors.consent =
        "To Submit this form, please consent to being contacted";
    if (!selectedOption) tempErrors.queryType = "Please select a query type.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(
        "Message Sent! Thanks for completing the form. We'll be in touch soon!"
      );
      // Reset form fields
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        consent: false,
      });
      setSelectedOption("");
    }
  };

  return (
    <>
      <div className=" md:h-[100vh] p-4 md:p-0 w-[100%] flex justify-center items-center">
        <form
          className="bg-[#FFFFFF] w-[100%]  md:w-[40%] p-7 rounded-2xl md:rounded-md shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-5">
            <h1 className="font-bold text-[25px] text-[#383a3b]">Contact Us</h1>
          </div>
          <div className="flex md:flex-row flex-col gap-3 mb-4">
            <div className="md:w-[50%] w-[100%]">
              <p className="text-[14px] text-[#383a3b] mb-1 font-normal">
                First Name <span className="text-[#0d6eff]">*</span>
              </p>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`border ${
                  errors.firstName ? "border-red-500" : "border-[#383a3b]"
                } hover:border-[#0C7D69] cursor-pointer focus:border-[#0C7D69] focus:ring-0 text-[15px] ps-4 border rounded-md h-[40px] w-[100%] focus:outline-none`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-[12px]">{errors.firstName}</p>
              )}
            </div>
            <div className="md:w-[50%] w-[100%]">
              <p className="text-[14px] text-[#383a3b] mb-1 font-normal">
                Last Name <span className="text-[#0d6eff]">*</span>
              </p>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`border ${
                  errors.lastName ? "border-red-500" : "border-[#383a3b]"
                } hover:border-[#0C7D69] cursor-pointer focus:border-[#0C7D69] focus:ring-0 text-[15px] ps-4 border rounded-md h-[40px] w-[100%] focus:outline-none`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-[12px]">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <p className="text-[14px] text-[#383a3b] mb-1 font-normal">
              Email Address <span className="text-[#0d6eff]">*</span>
            </p>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`border ${
                errors.email ? "border-red-500" : "border-[#383a3b]"
              } hover:border-[#0C7D69] cursor-pointer focus:border-[#0C7D69] focus:ring-0 text-[15px] ps-4 border rounded-md h-[40px] w-[100%] focus:outline-none`}
              type="email"
            />
            {errors.email && (
              <p className="text-red-500 text-[12px]">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <p className="text-[14px] text-[#383a3b] mb-2 font-normal">
              Query Type <span className="text-[#0d6eff]">*</span>
            </p>
            <div className="md:flex-row flex flex-col gap-3">
              {/* General Enquiry */}
              <div
                className={`flex border text-[14px] rounded-md md:w-[50%] w-[100%] py-2 px-4 gap-3 items-center cursor-pointer ${
                  selectedOption === "enquiry"
                    ? "border-[#0C7D69] bg-[#f0f8f7]"
                    : errors.queryType
                    ? "border-red-500"
                    : "border-[#383a3b] text-[#383a3b]"
                }`}
                onClick={() => setSelectedOption("enquiry")}
              >
                <input
                  className="accent-[#0C7D69]"
                  type="radio"
                  checked={selectedOption === "enquiry"}
                  onChange={() => setSelectedOption("enquiry")}
                />
                <p>General Enquiry</p>
              </div>

              {/* Support Request */}
              <div
                className={`flex border text-[14px] rounded-md  md:w-[50%] w-[100%] py-2 px-4 gap-3 items-center cursor-pointer ${
                  selectedOption === "support"
                    ? "border-[#0C7D69] bg-[#f0f8f7]"
                    : errors.queryType
                    ? "border-red-500"
                    : "border-[#383a3b] text-[#383a3b]"
                }`}
                onClick={() => setSelectedOption("support")}
              >
                <input
                  className="accent-[#0C7D69]"
                  type="radio"
                  checked={selectedOption === "support"}
                  onChange={() => setSelectedOption("support")}
                />
                <p>Support Request</p>
              </div>
            </div>
            {errors.queryType && (
              <p className="text-red-500 text-[12px]">{errors.queryType}</p>
            )}
          </div>
          <div className="mb-5">
            <p className="text-[14px] text-[#383a3b] mb-2 font-normal">
              Message <span className="text-[#0d6eff]">*</span>
            </p>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`border ${
                errors.message ? "border-red-500" : "border-[#383a3b]"
              } hover:border-[#0C7D69] border cursor-pointer focus:border-[#0C7D69] focus:ring-0 focus:outline-none rounded-md md:h-[80px] h-[200px] w-[100%] text-[14px] py-1 px-2`}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-[12px]">{errors.message}</p>
            )}
          </div>
          <div className="mb-6">
            <p className="text-[14px] cursor-pointer text-[#383a3b] flex gap-3 mb-2 font-normal">
              <input
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                className={`accent-[#0C7D69] ${
                  errors.consent ? "border-red-500" : "border-[#383a3b]"
                }`}
                type="checkbox"
              />
              <p>
                {" "}
                I consent to be contacted for the purpose of this enquiry{" "}
                <span className="text-[#0d6eff]">*</span>
              </p>
            </p>
            {errors.consent && (
              <p className="text-red-500 text-[12px]">{errors.consent}</p>
            )}
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="bg-[#0C7D69] hover:bg-[#083E35] h-[40px] rounded-md cursor-pointer text-[#FFFFFF] font-normal w-[100%] text-[14px]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
