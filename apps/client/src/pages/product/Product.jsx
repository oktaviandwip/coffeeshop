import React from 'react';
import Promo from '../../components/Promo';
import CardProduct from '../../components/CardProduct';
import Button from '../../components/Button';
function Product() {
  return (
    <>
      <section className="flex">
        <aside className="border border-gray-300 px-8 py-5 flex flex-col items-center gap-y-14">
          <section className="text-center w-4/5">
            <h3 className="font-bold text-[25px] text-primary">Promo Today</h3>
            <p>Coupons will be updated every weeks. Check them out! </p>
          </section>
          <section>
            <div className="space-y-4 mb-10">
              <Promo />
              <Promo />
              <Promo />
            </div>

            <Button content={'Apply Coupon'} color={'primary'} />
          </section>
          <section>
            <h6>Terms and Condition</h6>
            <ol>
              <li>1. You can only apply 1 coupon per day</li>
              <li>2. It only for dine in</li>
              <li>3. Buy 1 get 1 only for new user</li>
              <li>4. Should make member card to apply coupon</li>
            </ol>
          </section>
        </aside>
        <main>
          <nav>
            <button className="p-3 border-b-2 border-primary drop-shadow-2xl">Favorite & Promo</button>
          </nav>
          <CardProduct title={'Mocca Chino'} price={'23.000'} />
        </main>
      </section>
    </>
  );
}

export default Product;
