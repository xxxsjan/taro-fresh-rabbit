import { lazy, Suspense } from "react";

const AsyncCart = lazy(() => import("./AsyncCart"));

function Cart() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AsyncCart />
    </Suspense>
  );
}

export default Cart;
