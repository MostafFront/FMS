import React from 'react';
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import { Link, useNavigate } from 'react-router-dom';

export default function Station({ data, setData }) {
    const navigate = useNavigate();

    const handleDelete = (index) => {
        const newData = data.filter((_, i) => i !== index);
        setData(newData); 
    };

    const handleEdit = (index) => {
        const stationToEdit = data[index];
        navigate('/NewStation', { state: { station: stationToEdit, index } });
    };

    return (
        <>
            <NavBar />
            <SideBar />
            <div className='h-full pt-[15%] w-[95%] absolute right-0 bottom-0 justify-center items-start flex bg-[#F9F5F3]'>
                <div className='flex flex-col w-[80%] min-h-full justify-start items-end'>
                    <div className="relative shadow-md sm:rounded-lg w-full overflow-auto max-h-96 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                        <table className="w-full text-sm text-left rtl:text-right bg-[#FFFFFF]">
                            <thead className="text-xs text-[#707070] border-b border-[#B2BEC3]">
                                <tr>
                                    <th className="px-6 py-3">Station Name</th>
                                    <th className="px-6 py-3">Channel ID</th>
                                    <th className="px-6 py-3">Location</th>
                                    <th className="px-6 py-3">Description</th>
                                    <th className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">There is no info</td>
                                    </tr>
                                ) : (
                                    data.map((item, index) => (
                                        <tr key={index} className="border-b text-[#707070]">
                                            <td className="flex justify-start items-center px-6 py-4 font-medium">
                                                <span className='p-1 mr-2 rounded-full bg-[#FF7F5C]'></span>
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4">{item.id}</td>
                                            <td className="px-6 py-4">{item.location}</td>
                                            <td className="px-6 py-4 truncate w-[30%]">{item.description}</td>
                                            <td className="flex justify-end items-center px-6 py-4">
                                                <button onClick={() => handleEdit(index)}>
                                                    <i className="fa-regular fa-pen-to-square text-sm p-2 mr-4 text-[#2C3E50] bg-[#3D516133] rounded-md"></i>
                                                </button>
                                                <button onClick={() => handleDelete(index)}>
                                                    <i className="fa-regular fa-trash-can text-sm p-2 text-[#FF7F5C] bg-[#FF7F5C33] rounded-md"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className='flex justify-end mt-6'>
                        <Link to='/NewStation' className="text-white bg-[#FF7F5C] hover:bg-[#f56b44] font-medium rounded-lg text-sm px-5 py-2.5">
                            <i className="fa-solid fa-plus mr-2"></i>
                            ADD NEW
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}



// // src/DragAndDrop.js
// import React, { useState } from 'react';
// import './DragAndDrop.css'; // Import the CSS file

// const DragAndDrop = () => {
//   const [isHover, setIsHover] = useState(false); // Track if the drop zone is hovered
//   const [droppedItems, setDroppedItems] = useState([]); // Track dropped items

//   const handleDragStart = (event) => {
//     event.dataTransfer.setData('text/plain', 'Draggable Item'); // Set a simple placeholder item
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     setIsHover(false); // Reset hover state
//     const newItem = { id: Date.now(), value: '' }; // Create a new item with a unique ID
//     setDroppedItems((prev) => [...prev, newItem]); // Add new item to dropped items
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//     setIsHover(true); // Set hover state when dragging over
//   };

//   const handleDragLeave = () => {
//     setIsHover(false); // Reset hover state when leaving
//   };

//   const handleInputChange = (id, value) => {
//     setDroppedItems((prev) =>
//       prev.map((item) => (item.id === id ? { ...item, value } : item))
//     ); // Update item value based on input
//   };

//   const handleDelete = (id) => {
//     setDroppedItems((prev) => prev.filter((item) => item.id !== id)); // Remove the selected item by ID
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px' }}>
//       {/* Draggable item */}
//       <div
//         draggable
//         onDragStart={handleDragStart}
//         style={{
//           padding: '20px',
//           border: '1px solid #000',
//           margin: '5px',
//           cursor: 'grab',
//           textAlign: 'center',
//         }}
//       >
//         <div style={{ width: '100%', textAlign: 'center' }}>
//           Drag Me
//         </div>
//       </div>

//       {/* Drop zone */}
//       <div
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         className={`drop-zone ${isHover ? 'hover' : ''}`}
//         style={{
//           flex: 1, // Allow the drop zone to grow
//           minWidth: '200px',
//           maxWidth: '300px',
//           minHeight: '150px', // Minimum height for the drop zone
//           border: '2px dashed #ccc',
//           padding: '10px',
//           transition: 'background-color 0.3s ease',
//           display: 'flex',
//           flexDirection: 'column', // Stack items vertically
//         }}
//       >
//         <h3>Dropped Items</h3>
//         {droppedItems.length > 0 ? (
//           droppedItems.map((item) => (
//             <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
//               <input
//                 type="text"
//                 value={item.value}
//                 onChange={(e) => handleInputChange(item.id, e.target.value)} // Update input value
//                 style={{ flex: 1, marginRight: '10px' }}
//               />
//               <button onClick={() => handleDelete(item.id)} style={{ marginLeft: '10px' }}>
//                 Delete
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>Drop the item here</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DragAndDrop;
