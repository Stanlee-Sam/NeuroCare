import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
const Contact = () => {
  return (
    <section>
      <div>
        <h1 className="text-center font-bold text-[20px] pt-10 pb-5">
          Contact Us
        </h1>
        <p className="text-center pb-5">
          Have any questions or suggestions? Connect with us and let us know how
          we can support your mental health journey.
        </p>
      </div>
      <div className="md:flex justify-evenly place-items-center m-5 ">
        <div className="md:w-[50%] w-[60%] pb-10">
          <div className="flex gap-10 items-center">
            <div className="">
              <FaLocationDot className="text-2xl" />
            </div>
            <div className="text-left">
              <h3>Address</h3>
              <p>Nairobi, Kenya</p>
            </div>
          </div>
          <div className="flex gap-10 items-center">
            <div className="">
              <FaPhoneAlt className="text-2xl" />
            </div>
            <div className="text-left">
              <h3>Phone</h3>
              <p>+254-712-456-789</p>
            </div>
          </div>
          <div className="flex gap-10 items-center">
            <div>
              <IoMail className="text-2xl" />
            </div>
            <div className="text-left">
              <h3>Email</h3>
              <p>neurocare@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-[#F5F5F5] md:w-[50%] w-full">
          <form className="grid justify-center place-items-center w-[100%]" action="">
            <h3 className="p-5 font-bold">Send Message</h3>
            <div className="grid justify-evenly place-items-center gap-5">
              <input
                className="p-3 rounded-lg text-black flex w-full"
                type="text"
                id="name"
                name="name"
                placeholder="Full Name"
                required
              />
              <input
                className="p-3 rounded-lg text-black flex w-full "
                type="email"
                placeholder="Enter Email"
              />

              <textarea
                className="p-3 rounded-lg text-black flex w-full h-[150px]"
                rows="5"
                id="message"
                name="message"
                placeholder="Message"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-[#608BC1] text-white rounded-md p-2 m-10 hover:bg-white w-[70%]"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
