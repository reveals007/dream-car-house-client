import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import ReviewHouse from '../Components/Checkout/ReviewHouse'
import CheckoutCart from '../Components/Checkout/CheckoutCart'
import WhosComing from '../Components/Checkout/WhosComing'
import Payment from '../Components/Checkout/Payment'
import { AuthContext } from '../contexts/AuthProvider'
import { saveBooking } from '../api/bookings'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

const Checkout = () => {
  const { user } = useContext(AuthContext)
  const [product, setProduct] = useState([]);
  
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://server-nine-mocha.vercel.app/allproducts/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [id]);

  console.log(product._pid)
 const homeData = {
    _pid:product._id,
    location: product?.location,
    brandName: product?.brandName,
    image: product?.image,
    date: product?.date,
    
    host: {
      name:product?.host?.name ,
      image: product?.host?.image,
      email: product?.host?.email,
    },
    price: parseFloat(product?.price),
    ratings: 4.8,
    reviews: 64,
  }

  const booking = {
    email:user?.email,
    booking: homeData,
  }

  const [bookingData, setBookingData] = useState({
    UserId: user?.email,
  })
  console.log(bookingData);

 




  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleBooking = () => {
    console.log(bookingData)

    saveBooking(booking)

      .then(data => {
        console.log(data)
        toast.success('Booking Successful!')
      })
      .catch(err => {
        console.log(err)
        toast.error(err?.message)
      })
  }

  return (
    <div className='md:flex gap-5 items-start justify-between sm:mx-10 md:mx-20 px-4 lg:mx-40 py-4'>
      {/* Details */}
      <div className='flex-1'>
        <Tab.Group
          selectedIndex={selectedIndex}
          onChange={setSelectedIndex}
          defaultIndex={1}
        >
          <Tab.List>
            <div className='container flex flex-wrap items-center py-4 mx-auto overflow-y-auto whitespace-nowrap'>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={selected ? 'text-blue-600' : 'text-gray-600'}
                  >
                    1. Reviews house rules
                  </button>
                )}
              </Tab>

              <span className='mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={selected ? 'text-blue-600' : 'text-gray-600'}
                  >
                    2. Who's coming?
                  </button>
                )}
              </Tab>

              <span className='mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={selected ? 'text-blue-600' : 'text-gray-600'}
                  >
                    3. Confirm and pay
                  </button>
                )}
              </Tab>
            </div>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <ReviewHouse setSelectedIndex={setSelectedIndex} />
            </Tab.Panel>
            <Tab.Panel>
              {/* WhosComing Comp */}
              <WhosComing
                setSelectedIndex={setSelectedIndex}
                host={homeData?.host}
                bookingData={bookingData}
                setBookingData={setBookingData}
              />
            </Tab.Panel>
            <Tab.Panel>
              {/* Payment Comp */}
              <Payment handleBooking={handleBooking} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      {/* Cart */}
      <CheckoutCart />
    </div>
  )
}

export default Checkout
