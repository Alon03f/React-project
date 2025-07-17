import { useState } from "react";
import "./AddCardModal.css";

function AddCardModal({ onClose, onCardCreated, user }) {
    const [formData, setFormData] = useState({
        image: "",
        companyName: "",
        description: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newCard = {
            id: Date.now().toString(),
            image: formData.image,
            companyName: formData.companyName,
            description: formData.description,
            ceo: user.ceoName,
            createdAt: new Date().toLocaleDateString("he-IL"),
            createdByEmail: user.email,
            isFavorite: false,
            favoriteBy: []
        };

        const existingCards = JSON.parse(localStorage.getItem("cards")) || [];
        existingCards.push(newCard);
        localStorage.setItem("cards", JSON.stringify(existingCards));
        onCardCreated();
        onClose();
    };

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <button onClick={onClose} className="close-btn">✖</button>
                <h2>יצירת כרטיס חדש</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <input
                        name="image"
                        placeholder="קישור לתמונה"
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="companyName"
                        placeholder="שם החברה"
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="תיאור קצר על החברה"
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">צור כרטיס</button>
                </form>
            </div>
        </div>
    );
}

export default AddCardModal;
