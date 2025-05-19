import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DeleteModal from "./DeleteModal";

const TicketDashboard = () => {
  const { uid } = useParams();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [solutions, setSolutions] = useState([]);
  const [deleteOpen, setDeleteForm] = useState(false);
  const handleSelect = (ticket) => {
    axios
      .get(
        `http://localhost:3000/api/researcher/solutions/ticket/${ticket._id}`
      )
      .then((res) => {
        setSolutions(res.data);
      })
      .catch((e) => {
        setSolutions(false);
      });

    setSelectedTicket(ticket);
  };

  const [tks, setTicketInfo] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3000/api/v1/ticket/parameters", {
        farmerID: String(uid),
      })
      .then((res) => {
        setTicketInfo(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const handleCreateTicket = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    data = { ...data, farmerID: uid };

    axios.post("http://localhost:3000/api/v1/ticket", data).then((res) => {
      setIsOpen(false);
      setSubmitted(true);
    });
  };

  useEffect(() => {
    axios
      .post("http://localhost:3000/api/v1/ticket/parameters", {
        farmerID: String(uid),
      })
      .then((res) => {
        setTicketInfo(res.data.data);
        setSubmitted(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [submitted == true]);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/api/v1/ticket/${selectedTicket._id}`)
      .then((res) => {
        setSubmitted(true);
        setSelectedTicket(null);
        setDeleteForm(false);
      });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Ticket List */}
      <div className="mx-5  w-2/5 p-4 overflow-y-auto border-r bg-white">
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-700">Tickets</h2>
          <button
            className="float-right  mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setIsOpen(true)}
          >
            Create ticket
          </button>

          {/* AI route */}

          {/* AI route end */}

          {/* Delete Modal */}
          {deleteOpen ? (
            <div className="fixed inset-0 z-50 backdrop-blur-sm bg-white/10 flex justify-center items-center">
              <div class="bg-white border rounded-lg shadow relative max-w-sm">
                <div class="flex justify-end p-2">
                  <button
                    type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div class="p-6 pt-0 text-center">
                  <svg
                    class="w-20 h-20 text-red-600 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h3 class="text-xl font-normal text-gray-500 mt-5 mb-6">
                    Are you sure you want to delete this ticket?
                  </h3>
                  <button
                    onClick={handleDelete}
                    class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    onClick={() => {
                      setDeleteForm(false);
                    }}
                    class="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {/* Modal */}
          {isOpen && (
            <div className="fixed inset-0 z-50 backdrop-blur-sm bg-white/10 flex justify-center items-center">
              <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
                <h2 className="text-xl font-semibold mb-4">New Ticket</h2>
                <form onSubmit={handleCreateTicket} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Subject</label>
                    <input
                      type="text"
                      className="w-full border px-3 py-2 rounded"
                      name="subject"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Description
                    </label>
                    <textarea
                      className="w-full border px-3 py-2 rounded"
                      rows="4"
                      name="description"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Image-URL
                    </label>
                    <input
                      type="text"
                      className="w-full border px-3 py-2 rounded"
                      name="image"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      priority
                    </label>
                    <select
                      type="text"
                      className="w-full border px-3 py-2 rounded"
                      name="priority"
                      required
                    >
                      <option>High</option>
                      <option>Low</option>
                      <option>Medium</option>
                    </select>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        <ul>
          {/* Original fetch data */}

          {tks.map((ticket, index) => (
            <li
              key={index}
              onClick={() => handleSelect(ticket)}
              className={`p-3 mb-2 rounded cursor-pointer border hover:bg-gray-100 ${
                selectedTicket?.id === ticket._id
                  ? "bg-blue-50 border-blue-500"
                  : "border-gray-200"
              }`}
            >
              <p className="font-semibold text-gray-800">{ticket.subject}</p>
              <p className="text-sm text-gray-500">
                From Toni • Updated {ticket.createdAt}
              </p>
              <div className="mt-1">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium text-white ${
                    ticket.priority === "Low"
                      ? "bg-red-500"
                      : ticket.priority === "Medium"
                      ? "bg-yellow-400 text-black"
                      : "bg-green-500"
                  }`}
                >
                  {ticket.priority}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Ticket Details & Replies */}
      <div className="flex-1 p-6 overflow-y-auto">
        {selectedTicket ? (
          <>
            <div className="border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedTicket.subject}
              </h2>
              <p className="text-gray-600"></p>
              <img src={selectedTicket.image} />
              <p className="text-sm text-gray-500 mt-1"></p>
            </div>
            <div className="space-y-4">
              {/* {selectedTicket.messages.map((msg, idx) => (
                <div key={idx} className="bg-white p-4 shadow rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800">
                      {msg.author}
                    </span>
                    <span className="text-xs text-gray-500">{msg.time}</span>
                  </div>
                  <p className="text-gray-700">{msg.content}</p>
                </div>
              ))} */}

              <div className="bg-white p-4 shadow rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-800">
                    {selectedTicket.updatedAt}
                  </span>
                  <span className="text-xs text-gray-500">
                    {selectedTicket.createdAt}
                  </span>
                </div>
                <p className="text-gray-700">{selectedTicket.description}</p>
              </div>

              {solutions ? (
                solutions.map((sol, index) => {
                  return (
                    <div className="bg-white p-4 shadow rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-800">
                          {sol.createdAt}
                        </span>
                        <span className="text-xs text-gray-500">
                          {sol.updatedAt}
                        </span>
                      </div>
                      <p className="text-gray-700">{sol.description}</p>
                    </div>
                  );
                })
              ) : (
                <div>
                  <p className=" text-gray-500">No replies yet</p>
                  <button
                    onClick={() => {
                      setDeleteForm(true);
                    }}
                    type="button"
                    class="mt-5 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Delete
                  </button>
                </div>
              )}

              <div className="mt-6">
                <textarea
                  rows="4"
                  placeholder="Write your reply..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Send Reply
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-gray-500 text-center mt-20">
            Select a ticket to view details
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketDashboard;
