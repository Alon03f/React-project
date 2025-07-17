import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        imageUrl: "",
        imageAlt: "",
        phone: "",
        country: "",
        city: "",
        street: "",
        houseNumber: "",
        zip: "",
        isBusiness: false,
        ceoName: "",
        companyName: ""
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            name: formData.firstName + " " + formData.lastName,
            email: formData.email,
            password: formData.password,
            isBusiness: formData.isBusiness,
            ceoName: formData.ceoName,
            companyName: formData.companyName
        };

        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("user", JSON.stringify(newUser));


        navigate("/");
        window.location.reload();
    };

    return (
        <main>
            <h1>הרשמה</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <input name="firstName" placeholder="First name*" required onChange={handleChange} />
                <input name="lastName" placeholder="Last name*" required onChange={handleChange} />
                <input name="email" type="email" placeholder="Email*" required onChange={handleChange} />
                <input name="password" type="password" placeholder="Password*" required onChange={handleChange} />
                <input name="imageUrl" type="url" placeholder="Image URL" onChange={handleChange} />
                <input name="imageAlt" placeholder="Image alt" onChange={handleChange} />
                <input name="phone" placeholder="Phone*" required onChange={handleChange} />
                <input name="country" placeholder="Country*" required onChange={handleChange} />
                <input name="city" placeholder="City*" required onChange={handleChange} />
                <input name="street" placeholder="Street" onChange={handleChange} />
                <input name="houseNumber" placeholder="House Number" onChange={handleChange} />
                <input name="zip" placeholder="ZIP Code" onChange={handleChange} />

                <label>
                    <input
                        type="checkbox"
                        name="isBusiness"
                        checked={formData.isBusiness}
                        onChange={handleChange}
                    />
                    הירשם כמשתמש עסקי
                </label>

                {formData.isBusiness && (
                    <>
                        <input
                            name="ceoName"
                            placeholder="שם מלא של מנכל החברה"
                            required
                            onChange={handleChange}
                        />
                        <input
                            name="companyName"
                            placeholder="שם החברה*"
                            required
                            onChange={handleChange}
                        />
                    </>
                )}

                <button type="submit">הירשם</button>
            </form>
        </main>
    );
}

export default RegisterPage;
