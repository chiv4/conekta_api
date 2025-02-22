// src/App.js
import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    currency: "MXN",
    customer_info: {
      name: "",
      email: "",
      phone: ""
    },
    line_items: [
      {
        name: "",
        unit_price: 0,
        quantity: 1
      }
    ],
    charges: [
      {
        payment_method: {
          type: "card",
          token_id: ""
        }
      }
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      customer_info: {
        ...prev.customer_info,
        [name]: value
      }
    }));
  };

  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    const newItems = [...formData.line_items];
    newItems[index][name] = value;
    setFormData((prev) => ({ ...prev, line_items: newItems }));
  };

  const handlePaymentChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      charges: [
        {
          payment_method: {
            type: "card",
            token_id: value
          }
        }
      ]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/payments/charge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log("Respuesta de la API:", data);
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="name" value={formData.customer_info.name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.customer_info.email} onChange={handleChange} />
        </label>
        <label>
          Teléfono:
          <input type="text" name="phone" value={formData.customer_info.phone} onChange={handleChange} />
        </label>
        <label>
          Producto:
          <input type="text" name="name" value={formData.line_items[0].name} onChange={(e) => handleItemChange(e, 0)} />
        </label>
        <label>
          Precio unitario:
          <input type="number" name="unit_price" value={formData.line_items[0].unit_price} onChange={(e) => handleItemChange(e, 0)} />
        </label>
        <label>
          Cantidad:
          <input type="number" name="quantity" value={formData.line_items[0].quantity} onChange={(e) => handleItemChange(e, 0)} />
        </label>
        <label>
          Token de pago:
          <input type="text" value={formData.charges[0].payment_method.token_id} onChange={handlePaymentChange} />
        </label>
        <button type="submit">Pagar</button>
      </form>
    </div>
  );
}

export default App;
