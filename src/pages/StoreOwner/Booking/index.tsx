import React, { useState, useEffect } from 'react';

const Sidebar = ({ setActiveTab }) => {
  return (
    <div className="h-screen w-64 bg-gray-800 p-4 text-white">
      <h2 className="mb-4 text-xl font-bold">FUREVER CARE</h2>
      <div className="space-y-2">
        <button
          className="w-full p-2 text-left hover:bg-gray-700"
          onClick={() => setActiveTab('recentOrder')}
        >
          Booking / Order
        </button>
        <button className="w-full p-2 text-left hover:bg-gray-700">
          Product Management
        </button>
        <button className="w-full p-2 text-left hover:bg-gray-700">
          Feedback
        </button>
      </div>
    </div>
  );
};

const Tabs = ({ children, value, onChange }) => {
  return (
    <div className="flex space-x-4 border-b">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          active: child.props.value === value,
          onChange: () => onChange(child.props.value)
        })
      )}
    </div>
  );
};

const Tab = ({ label, value, active, onChange }) => {
  return (
    <button
      className={`p-2 ${active ? 'border-b-2 border-blue-500 font-bold' : ''}`}
      onClick={() => onChange(value)}
    >
      {label}
    </button>
  );
};

const Table = ({ children }) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      {children}
    </table>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="mt-4 flex justify-end">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      <span className="mx-4">
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

const ITEMS_PER_PAGE = 5;

type Order = {
  id: string;
  dateCheckOut: string;
  status: number;
  addressDelivery: string;
  note: string;
  totalPrice: number;
  userId: string;
  orderDetails: any;
};

type Booking = {
  id: string;
  userId: string;
  petId: string;
  nameCustomerBooking: string;
  phoneNumberCustomerBooking: string;
  emailCustomerBooking: string;
  totalAmount: number;
  totalFee: number;
};

const BookingOrder = () => {
  const [activeTab, setActiveTab] = useState('recentOrder');
  const [currentPage, setCurrentPage] = useState(1);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch(
      'https://furever-dmgrecfgevadawew.southeastasia-01.azurewebsites.net/api/booking/get-all'
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          setBookings(data.data as Booking[]);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    fetch(
      'https://furever-dmgrecfgevadawew.southeastasia-01.azurewebsites.net/api/order/get-all'
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          setOrders(data.data as Order[]);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const paginatedOrders = orders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const paginatedBookings = bookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(
    (activeTab === 'recentOrder' ? orders.length : bookings.length) /
      ITEMS_PER_PAGE
  );

  return (
    <div className="flex h-screen">
      <Sidebar setActiveTab={setActiveTab} />

      <div className="flex-1 p-6">
        <Tabs
          value={activeTab}
          onChange={(tab) => {
            setActiveTab(tab);
            setCurrentPage(1);
          }}
        >
          <Tab label="Recent Order" value="recentOrder" />
          <Tab label="Recent Booking" value="recentBooking" />
        </Tabs>

        {activeTab === 'recentOrder' && (
          <Table>
            <thead>
              <tr>
                <th>No</th>
                <th>User ID</th>
                <th>Order ID</th>
                <th>Date</th>
                <th>Address</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order, index) => (
                <tr key={order.id}>
                  <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                  <td>{order.userId}</td>
                  <td>{order.id}</td>
                  <td>{order.dateCheckOut}</td>
                  <td>{order.addressDelivery}</td>
                  <td>{order.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {activeTab === 'recentBooking' && (
          <Table>
            <thead>
              <tr>
                <th>No</th>
                <th>User Name</th>
                <th>User's Phone</th>
                <th>Pet ID</th>
                <th>Fee</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBookings.map((booking, index) => (
                <tr key={booking.id}>
                  <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                  <td>{booking.nameCustomerBooking}</td>
                  <td>{booking.phoneNumberCustomerBooking}</td>
                  <td>{booking.petId}</td>
                  <td>{booking.totalFee}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default BookingOrder;
