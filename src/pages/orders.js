import React from "react";
import Header from "../components/Header";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { db } from "../../firebase";
import moment from "moment";

function Orders({ orders }) {
  const [session] = useSession();
  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl vorder-b mb-2 pb-1 border-yellow-400">
          Your orders
        </h1>
        {session ? (
          <h2>{orders.length} Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}
        <div className="mt-5 space-y-4">
          {orders?.map(
            ({ id, amount, amount_shipping, images, timestamp, items }) => (
              <div key={id} className="relative border rounded-md">
                <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
                  <div>
                    <p className="font-bold text-xs">ORDER PLACED</p>
                    <p>{timestamp}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold">TOTAL</p>
                    <p>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(amount)}
                    </p>
                  </div>
                  <div className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
                    {items.length} items
                  </div>
                  <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap"></p>
                </div>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}

export default Orders;
export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  // Get the user logged in credentials...
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
    };
  }
  // Firebase db
  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();
  // Stripe orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );
  return {
    props: {
      orders,
    },
  };
}
