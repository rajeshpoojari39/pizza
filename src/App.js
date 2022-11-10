import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [total, setTotal] = useState(0);
  const [toPay, setToPay] = useState(0);
  const [pizzaQuantity, setPizzaQuantity] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isAddOn, setIsAddOn] = useState(false);

  useEffect(() => {
    const calculateTotal = () => {
      if (isAddOn) {
        setTotal(pizzaQuantity * 50 + 5);
        return;
      }
      setTotal(pizzaQuantity * 50);
    };
    calculateTotal();

    const payableAmount = () => {
      let discountPrice = (total * discount) / 100;
      setToPay(total - discountPrice);
    };
    payableAmount();
  }, [pizzaQuantity, isAddOn, discount, total]);

  const increasePizzaQuantity = () => {
    setPizzaQuantity((prevQuanttity) => prevQuanttity + 1);
  };

  const decreasePizzaQuantity = () => {
    if (pizzaQuantity === 0) {
      return;
    }
    setPizzaQuantity((prevQuanttity) => prevQuanttity - 1);
  };

  const discountHandler = (e) => {
    if (e.target.value < 0 || e.target.value > 60) {
      return;
    }
    setDiscount(e.target.value);
  };
  return (
    <div className="App">
      <div className="pizza-header">
        <h1>Pizza ABC</h1>
        <p>We are currently serving one pizza only. Please taste and review.</p>
      </div>

      <div className="pizza-body">
        <div className="pizza-add">
          <p>Add Quantity</p>
          <div>
            <button onClick={decreasePizzaQuantity}>-</button>
            {pizzaQuantity}
            <button onClick={increasePizzaQuantity}>+</button>
          </div>
          <div>
            <input
              type="checkbox"
              id="addOn"
              name="addon"
              value="addon"
              checked={isAddOn}
              onChange={() => setIsAddOn(!isAddOn)}
            />
            <label htmlFor="addOn">Add Ons</label>
          </div>
        </div>
        <div className="pizza-image">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdL0INgzNXgb0OlKKMbT2319RTJ1Lv6jX1xg&usqp=CAU"
            alt="pizza"
          />
        </div>
      </div>
      <div className="pizza-footer">
        <div>
          <p>Total ${total}</p>
          <p className="discount">
            Discount -
            <input
              onChange={discountHandler}
              type="number"
              name="discount"
              value={discount}
              min="0"
              max="60"
            />
            %
          </p>
          <p className="topay">To Pay ${toPay}</p>
        </div>
      </div>
    </div>
  );
}
