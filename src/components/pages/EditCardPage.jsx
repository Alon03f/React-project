import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditCardPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cardData, setCardData] = useState({
        image: "",
        companyName: "",
        description: ""
    });

    useEffect(() => {
        const allCards = JSON.parse(localStorage.getItem("cards")) || [];
        const cardToEdit = allCards.find(card => card.id === id);
        if (!cardToEdit) {
            alert("כרטיס לא נמצא");
            return navigate("/my-cards");
        }

        setCardData({
            image: cardToEdit.image,
            companyName: cardToEdit.companyName,
            description: cardToEdit.description
        });
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCardData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const allCards = JSON.parse(localStorage.getItem("cards")) || [];
        const updatedCards = allCards.map(card =>
            card.id === id ? { ...card, ...cardData } : card
        );

        localStorage.setItem("cards", JSON.stringify(updatedCards));
        navigate("/my-cards");
    };

    return (
        <main>
            <h1>עריכת כרטיס</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "500px" }}>
                <input
                    type="text"
                    name="image"
                    placeholder="קישור לתמונה"
                    value={cardData.image}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="companyName"
                    placeholder="שם החברה"
                    value={cardData.companyName}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="תיאור קצר"
                    value={cardData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                />
                <button type="submit">שמור שינויים</button>
            </form>
        </main>
    );
}

export default EditCardPage;
