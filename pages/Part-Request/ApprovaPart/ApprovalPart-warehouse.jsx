import React from "react";
import Button from "../../../components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useMemo } from "react";
import { useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Layout from "../../Layout";
import SuccessCheckmark from "../../../components/SuccessCheckmark";
import ModalComponent from "../../../components/ModalComponent";
import ModalComponentPart from "../../../components/ModalComponentPart";
import "../../../css/SuccessCheckmark.css";

const ApprovalPartWarehouse = () => {
  const [index, setIndex] = useState();
  const USER_SERVICE_BASE_URL = process.env.REACT_APP_API_URL_User_Service;
  const PART_SERVICE_BASE_URL = process.env.REACT_APP_API_URL_Part_Service;
  //custom styling
  const styleSubmitButton =
    "bg-[#17479d] py-2 px-3 w-full border-solid border-0 rounded my-5 text-white font-bold hover:opacity-90";
  const styleCancelButton =
    "bg-[#FF0000] py-2 px-3 w-full border-solid border-0 rounded my-5 text-white font-bold hover:opacity-90";
  // animation success
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationDataTable, setValidationDataTable] = useState("");
  const [isValidDataTable, setIsValidDataTable] = useState(true);
  const [part, setPart] = useState([]);
  const [note, setNote] = useState("");
  //data api
  const [data, setData] = useState([]);
  // data dalam tabel
  const [dataTable, setDataTable] = useState([]);
  // Search query
  const [query, setQuery] = useState("");
  const prevQueryRef = useRef(query);
  // for modal edit
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [newQuantity, setNewQuantity] = useState(1);
  // modal for part
  const [modalOpenPart, setModalOpenPart] = useState(false);
  const [selectedItemPart, setSelectedItemPart] = useState(null);
  const [user, setUser] = useState({});
  // useEffect
  useEffect(() => {
    if (
      window.localStorage.getItem("token") === "" ||
      window.localStorage.getItem("token") === null
    ) {
      navigate("/login");
    } else {
      getUser();
    }
  }, []);
  // // this can't be used because user is hooks, and hooks can only be called on useEffect
  // const getDataUser = useCallback(async () => {
  //   // obviously user will be null bcs it is const
  //   console.log("getdatauser", user);
  //   return axios
  //     .get(
  //       `${PART_SERVICE_BASE_URL}part_request?user_id=${user.UserId}&search=${query}`
  //     )
  //     .then((response) => {
  //       const jsonData = response.data;
  //       return jsonData;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       throw error;
  //     });
  // }, [query]);
  // get data table
  // const getDataTable = async () => {
  //   await axios
  //     .get(
  //       `${PART_SERVICE_BASE_URL}part_request?user_id=${user.UserId}&search_id=${location.state.key}`
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //       const data = res.data;
  //       setDataTable(data[location.state.key]);
  //       if (dataTable !== null) {
  //         setNote(data[location.state.key][0].note);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // use effect called after the first useeffect which is getting userId
  useEffect(() => {
    if (user.UserId) {
      axios
        .get(
          `${PART_SERVICE_BASE_URL}part_request?user_id=${user.UserId}&search=${query}`
        )
        .then((response) => {
          let datas = response.data;
          let newData = [];
          //TODO: still template
          for (let data of datas) {
            data["name"] = "testing";
            data["division"] = "divison";
            data["items"] = "10";
            newData.push(data);
          }
          setData(newData);
          // let table = [];
          // for (let items in data) {
          //   for (let item in data[parseInt(items)]) {
          //     // console.log(data[items][item]["Part Name"])
          //     // console.log((data[items][item]))
          //     table.push(data[items][item]);
          //   }
          // }
          // setData(table);
          // console.log(table);
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
    }
  }, [user]);
  useEffect(() => {
    if (user.UserId) {
      // axios
      //   .get(
      //     `${PART_SERVICE_BASE_URL}part_request?user_id=${user.UserId}&search_id=${location.state.key}`
      //   )
      //   .then((res) => {
      //     console.log(res.data);
      //     const data = res.data;
      //     setDataTable(data[location.state.key]);
      //     if (dataTable !== null) {
      //       setNote(data[location.state.key][0].note);
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  }, [user]); // This will run every time `user` changes.
  const getUser = async () => {
    try {
      await axios
        .get(`${USER_SERVICE_BASE_URL}auth/user`, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        })
        .then((data) => {
          setUser(data.data);
        });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const handleSearchAPI = useCallback(async () => {
    return axios
      .get(`${PART_SERVICE_BASE_URL}part?search=${query}&page=1&page_size=1000`)
      .then((response) => {
        const jsonData = response.data.parts;
        console.log("here");
        console.log(query);
        console.log(jsonData);
        setData(jsonData);
        return jsonData;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }, [query]);
  useEffect(() => {
    if (query !== prevQueryRef.current) {
      handleSearchAPI()
        .then((jsonData) => {
          console.log(jsonData);
        })
        .catch((err) => {
          console.log(err);
        });
      prevQueryRef.current = query;
    }
    console.log(selectedItemPart);
    if (selectedItemPart !== null) {
      //setModalOpenPart(true);
    }
  }, [query, setData, handleSearchAPI, selectedItemPart]);
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleEditTable = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedItemIndex(index);
    setNewQuantity(dataTable[index].quantity);
    setModalOpen(true);
  };
  const handleMinus = (e) => {
    e.preventDefault();
    const updatedQuantity = newQuantity - 1;
    setNewQuantity(updatedQuantity);
  };
  const handlePlus = (e) => {
    e.preventDefault();
    const updatedQuantity = newQuantity + 1;
    setNewQuantity(updatedQuantity);
  };
  const handleSave = (e) => {
    e.preventDefault();
    if (selectedItemIndex != null && dataTable[selectedItemIndex]) {
      const updatedData = [...dataTable];
      updatedData[selectedItemIndex].quantity = newQuantity;
      setDataTable(updatedData);
    }
    setModalOpen(false);
  };
  const handleDeleteTable = (e, index) => {
    e.preventDefault();
    const updatedData = [...dataTable];
    updatedData.splice(index, 1);
    //console.log(index);
    setDataTable(updatedData);
  };
  const handleAddDataToTable = (item) => {
    // e.preventDefault();
    console.log(item);
    setSelectedItemPart(item);
    setNewQuantity(1);
    console.log(selectedItemPart);
    // const newData = [];
    // console.log(selectedItemPart);
    setModalOpenPart(true);
  };
  const handleSaveDataToTable = () => {
    // Create a new data object with the selected item and the new quantity
    const newData = {
      ...selectedItemPart,
      quantity: newQuantity,
    };
    // Check if the part_name already exists in the table data
    const existingIndex = dataTable.findIndex(
      (item) => item.part_name === newData.part_name
    );
    if (existingIndex !== -1) {
      // If the part_name already exists, increment the quantity of the existing entry
      const updatedTableData = [...dataTable];
      updatedTableData[existingIndex].quantity += newData.quantity;
      setDataTable(updatedTableData);
    } else {
      // If the part_name doesn't exist, add the new data item to the table data
      setDataTable((prevData) => [...prevData, newData]);
    }
    // Close the modal
    setModalOpenPart(false);
  };
  const ApprovePartRequestAction = (e) => {
    //setValidationErrors({})
    e.preventDefault();
    if (dataTable.length === 0) {
      setValidationDataTable("Data Table cannot be empty!");
      setIsValidDataTable(false);
      alert("Data tidak boleh kosong!");
    } else {
      setIsSubmitting(true);
      let payload = {
        UserId: user.UserId,
        PartRequestId: parseInt(location.state.key),
        status: "Approved",
      };
      console.log(payload);
      axios
        .put(`${PART_SERVICE_BASE_URL}part_request/update`, payload)
        .then((r) => {
          console.log(r);
          if (r.status === 200) {
            setShowSuccess(true);
            setTimeout(() => {
              setShowSuccess(false);
              navigate("/partrequest");
            }, 2000);
          }
          setIsSubmitting(false);
        })
        .catch((e) => {
          console.log(e);
          setIsSubmitting(false);
        });
    }
  };
  return (
    <Layout>
      <div className="container mx-auto items-center justify-center pt-40 md:pl-40 lg:flex">
        <div className="flow-root pl-5 pr-5">
          <form
            name="Approve-part-request"
            onSubmit={(e) => {
              ApprovePartRequestAction(e);
            }}
          >
            <div className="pl-5 pr-5 lg:float-left">
              <table className="w-fit table-auto">
                <thead className="sticky top-0 border-b bg-slate-300">
                  <tr>
                    <th className="w-8">No</th>
                    <th className="w-64">Name</th>
                    <th className="w-32">Division</th>
                    <th className="w-32">No. ITEMS</th>
                    <th className="w-32">DATE</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {data.map((item, index) => (
                    <tr
                      key={item["id"]}
                      className="border-b bg-white hover:bg-gray-200"
                    >
                      <td className="px-6 py-4">{index + 1}</td>
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                      >
                        {/* TODO: still template */}
                        {item["name"]}
                      </th>
                      <td className="px-6 py-4">
                        {/* TODO: still template */}
                        {item["division"]}
                      </td>
                      <td className="px-6 py-4">
                        {/* TODO: still template */}
                        {item["items"]}
                      </td>
                      <td className="px-6 py-4">{item["joinedat"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* SISI KANAN FULL SIZE SCREEN */}
            <div className="float-right pt-20"></div>
            {/* TABLE DATA PART REQUEST */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-center text-sm text-gray-500">
                {/* table headers */}
                <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Part Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      SKU
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Stock
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                {/* table body */}
                <tbody>
                  {dataTable ? (
                    dataTable.map((item, index) => (
                      <tr
                        key={item.id}
                        className="border-b bg-white hover:bg-gray-200"
                      >
                        <td className="px-6 py-4">{index + 1}</td>
                        <th
                          scope="row"
                          className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                        >
                          {item.part_name}
                        </th>
                        <td className="px-6 py-4">{item.sku}</td>
                        <td className="px-6 py-4">
                          {part.find(
                            (parts) => parts.part_name === item.part_name
                          )?.stock ?? "Not found"}
                        </td>
                        <td className="px-6 py-4">{item.quantity}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              className="inline-flex h-10 w-12 items-center rounded-md bg-yellow-400 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-500"
                              onClick={(e) => handleEditTable(e, index)}
                            >
                              <img
                                src="/images/edit_icon.png"
                                className="h-full w-full"
                                alt="Edit"
                              />
                            </button>
                            <button
                              className="inline-flex h-10 w-12 items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                              onClick={(e) => handleDeleteTable(e, index)}
                            >
                              <img
                                src="/images/delete_icon.png"
                                className="h-full w-full"
                                alt="Trash"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <p>Loading...</p>
                  )}
                </tbody>
              </table>
              {modalOpen && (
                <ModalComponent
                  newQuantity={newQuantity}
                  setNewQuantity={setNewQuantity}
                  setModalOpen={setModalOpen}
                  handleMinus={handleMinus}
                  handlePlus={handlePlus}
                  handleSave={handleSave}
                />
              )}
              {modalOpenPart && (
                <ModalComponentPart
                  selectedItemPart={selectedItemPart}
                  setNewQuantity={setNewQuantity}
                  newQuantity={newQuantity}
                  setModalOpenPart={setModalOpenPart}
                  handleMinus={handleMinus}
                  handlePlus={handlePlus}
                  handleSaveDataToTable={handleSaveDataToTable}
                />
              )}
            </div>
          </form>
        </div>
      </div>
      <SuccessCheckmark showSuccess={showSuccess} />
    </Layout>
  );
};
export default ApprovalPartWarehouse;