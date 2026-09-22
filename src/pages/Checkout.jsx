import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { CheckCircle } from "lucide-react";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "cod",
  });

  const MAX_LENGTHS = {
    fullName: 50,
    email: 100,
    phone: 15,
    address: 200,
  };

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (cart.length === 0 && !isSubmitted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
          Your Cart is Empty
        </h2>
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 hover:underline text-lg"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const validateForm = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' .-]+$/.test(formData.fullName.trim())) {
      newErrors.fullName = "Full Name can only contain letters and spaces";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    const phoneRegex = /^\+?[\d\s-]{10,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 to 15 digits";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Delivery Address is required";
    } else if (formData.address.trim().length > MAX_LENGTHS.address) {
      newErrors.address = `Address must be ${MAX_LENGTHS.address} characters or less`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      clearCart();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let sanitizedValue = value;

    if (name === "fullName") {
      sanitizedValue = value.replace(/\d/g, "").slice(0, MAX_LENGTHS.fullName);
    }

    if (name === "email") {
      sanitizedValue = value.slice(0, MAX_LENGTHS.email);
    }

    if (name === "phone") {
      sanitizedValue = value
        .replace(/[^\d+\s-]/g, "")
        .slice(0, MAX_LENGTHS.phone);
    }

    if (name === "address") {
      sanitizedValue = value.slice(0, MAX_LENGTHS.address);
    }

    setFormData({ ...formData, [name]: sanitizedValue });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center flex flex-col items-center">
        <CheckCircle className="h-20 w-20 text-green-500 mb-6" />
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Thank you for your purchase. Your order will be delivered soon to{" "}
          {formData.address}.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
      <div className="lg:w-2/3">
        <div className="bg-white rounded-lg shadow p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Checkout Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                maxLength={MAX_LENGTHS.fullName}
                className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  maxLength={MAX_LENGTHS.email}
                  className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={MAX_LENGTHS.phone}
                  className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Delivery Address *
              </label>
              <textarea
                id="address"
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                maxLength={MAX_LENGTHS.address}
                className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.address ? "border-red-500" : "border-gray-300"}`}
              ></textarea>
              {errors.address && (
                <p className="mt-1 text-sm text-red-500">{errors.address}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <div className="flex items-center">
                <input
                  id="cod"
                  name="paymentMethod"
                  type="radio"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor="cod"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Cash on Delivery
                </label>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-green-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="lg:w-1/3">
        <div className="bg-gray-50 rounded-lg shadow p-6 sticky top-24">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Order Summary
          </h2>
          <div className="space-y-4 mb-4 text-gray-600">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="truncate pr-4">
                  {item.quantity} x {item.name}
                </span>
                <span>₱{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-4 space-y-4 text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₱{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-gray-900 text-lg">
              <span>Total</span>
              <span>₱{cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
