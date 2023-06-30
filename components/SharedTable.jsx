// import React from 'react';

// const SharedTable = ({ data }) => {
//   const getStatusColor = (status) => {
//     if (status === 'Denied') {
//       return 'text-red-500';
//     } else if (status === 'Approved') {
//       return 'text-green-500';
//     } else if (status === 'Pending') {
//       return 'text-yellow-500';
//     }
//     return 'text-gray-900';
//   };

//   if (!Array.isArray(data) || data.length === 0) {
//     return <div>No data available.</div>;
//   }

//   return (
//     <div className="relative rounded-lg h-96 sm:h-96 md:h-96 lg:h-144 overflow-y-auto border border-gray-300 mb-4 mr-4">
//       <table className="w-full text-sm text-gray-500 text-center">
//       <thead className="text-xs text-gray-700 uppercase bg-gray-100">
//           <tr>
//             <th scope="col" className="px-6 py-3">
//               No
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Part Request ID
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Divison Status
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Warehouse Status
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {Array.isArray(data) &&
//             data.map((datas, index) => (
//               <tr key={index} className="bg-white border-b hover:bg-gray-200">
//                 <td className="px-6 py-4">{index + 1}</td>
//                 <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
//                   {datas.id}
//                 </td>
//                 <td className={`px-6 py-4 ${getStatusColor(datas.division_request_status)}`}>
//                   {datas.division_request_status}
//                 </td>
//                 <td className={`px-6 py-4 ${getStatusColor(datas.warehouse_request_status)}`}>
//                   {datas.warehouse_request_status}
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SharedTable;
