import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React from "react";
import Header from "../components/Header";
function success() {
    const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen">
      <Header />
      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="h-10 text-green-500 mb-5" />
            <h1 className="text-3xl border-b pb-4">
              Thank you, your order has been confirmed!
            </h1>
          </div>
          <p>
            Thank you for shopping with us. We'll send a confirmation once your
            item has shipped, if you would like to check the status of your
            order(s) please press the link below.
          </p>
          <button 
          onClick={() => router.push("/orders")}
          className="button mt-8">Go to my orders</button>
        </div>
      </main>
    </div>
  );
}

export default success;
