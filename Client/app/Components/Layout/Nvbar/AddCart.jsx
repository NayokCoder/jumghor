"use client";

import { useContext } from "react";
import { CartContext } from "../../Context/CardContext";
import { ShoppingCart } from "lucide-react";

const AddCart = () => {
  const { cart } = useContext(CartContext);

  const itemCount = cart.length;
  const subtotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  return (
    <div className="relative drawer-end">
      <input id="cart-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Cart button */}
        <label htmlFor="cart-drawer" className="btn btn-ghost btn-circle relative">
          <ShoppingCart className="w-5 h-5" />
          {itemCount > 0 && <span className="badge badge-sm indicator-item absolute -top-1 -right-1">{itemCount}</span>}
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="cart-drawer" className="drawer-overlay"></label>
        <div className="menu bg-base-100 text-base-content min-h-full w-80 p-4">
          <h2 className="text-xl font-medium mb-4">Shoping Cart </h2>
          <div className="flex flex-col gap-3 my-6 max-h-[70vh] overflow-y-auto no-scrollbar">
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 border-b pb-2">
                  <img src={item.images} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-500">৳ {item.price}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mt-auto">
            <p className="font-semibold mb-2">Subtotal: ৳ {subtotal}</p>
            <button className="btn btn-primary w-full">Go to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCart;
