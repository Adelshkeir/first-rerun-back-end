import express from "express";
import Order from "../models/order.js";
import Orderitems from "../models/orderitems.js";

const orderController = {
  createOrder: async (req, res) => {
    console.log(req.body);
    try {
      const { name, phonenumber, date, cart } = req.body;

      // Create an order
      const order = await Order.create({
        name,
        phonenumber,
        date,
      });

      // Create order items associated with the order
      const orderItems = await Promise.all(
        cart.map((item) =>
          Orderitems.create({
            itemname: item.name,
            quantity: item.quantity,
            OrderId: order.id,
          })
        )
      );

      res
        .status(201)
        .json({ message: "Order placed successfully!", order, orderItems });
    } catch (error) {
      console.error("Error placing the order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getOrders: async (req, res) => {
    try {
      // Fetch orders and include associated order items
      const orders = await Order.findAll({
        include: Orderitems,
      });

      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default orderController;
