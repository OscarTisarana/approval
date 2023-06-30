import React, { useEffect, useState } from 'react'
import InputGroup from '../../components/InputGroup'
import Button from '../../components/Button'
import LoadingSpinner from '../../components/LoadingSpinner';
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import Layout from '../Layout'

const EditSparePart = () => {
    //const USER_SERVICE_BASE_URL = process.env.REACT_APP_API_URL_User_Service;
    const PART_SERVICE_BASE_URL = process.env.REACT_APP_API_URL_Part_Service;

    const navigate = useNavigate()
    const location = useLocation() // passing value edit part id
    const [isLoading, setIsLoading] = useState(true);

    //use state
    const [partName, setPartName] = useState("") 
    const [stock, setStock] = useState(0) 
    const [sku, setSku] = useState("") 
    const [description, setDescription] = useState("") 
    // const [image, setImage] = useState(null) 
    const [category, setCategory] = useState("")

    //validasi form
    const [validationPartName, setValidationPartName] = useState("")
    const [isValidPartName, setIsValidPartName] = useState(true)
    const [validationStock, setValidationStock] = useState("")
    const [isValidStock, setIsValidStock] = useState(true)
    const [validationSKU, setValidationSKU] = useState("")
    const [isValidSKU, setIsValidSKU] = useState(true)
    const [validationDescription, setValidationDescription] = useState("")
    const [isValidDescription, setIsValidDescription] = useState(true)
    // const [validationImage, setValidationImage] = useState("")
    // const [isValidImage, setIsValidImage] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false) 

    //custom styling
    const styleSubmitButton = "bg-[#5AA6FF] py-2 px-3 w-full border-solid border-0 rounded my-5 text-white font-bold hover:opacity-90"
    const styleCancelButton = "bg-[#FF0000] py-2 px-3 w-full border-solid border-0 rounded my-5 text-white font-bold hover:opacity-90"
    const styleInputGroup = "py-3 px-14 border-0 border-gray-200 drop-shadow-md rounded-md text-sm w-full"
    const styleInputGroupDescription = "py-3 px-8 whitespace-normal resize-none w-full h-20 border-solid border-0 border-gray-200 drop-shadow-md rounded-md text-sm";
    // const styleInputGroupImage = "appearance-none border border-gray-300 drop-shadow-md py-2 px-3 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"

    useEffect(()=>{
        getCategory()
        getPartById()
        console.log(location.state.key)
    },[])

    const getCategory = () => {
        axios.get(`${PART_SERVICE_BASE_URL}category`)
        .then((r)=>{
            console.log(r)
            setCategory(r)
        })
        .catch((e)=>{
            console.log(e)
        })
    }
    
    const getPartById = async () => {
        await axios.get(`${PART_SERVICE_BASE_URL}part?id=${location.state.key}`)
        .then((res) => {
            console.log(res.data.parts[0])
            setPartName(res.data.parts[0].part_name)
            setStock(res.data.parts[0].stock)
            setSku(res.data.parts[0].sku)
            setDescription(res.data.parts[0].part_desc)
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            setIsLoading(false); // Ensure loading is set to false whether or not the request was successful
        })
    }

    // function handleImageChange(e) {
    //     setImage(e.target.files[0]);
    //     setIsValidImage(validateImage(e.target.files[0]));
    //   }

    // const handleChange = (e) => {
    //     let newStock = parseInt(e.target.value, 10);
    //     newStock = isNaN(newStock) ? 0 : newStock;
    //     setStock(Math.max(0, newStock));
    // };
      
    const editSparePartAction = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        let payload = {
            PartId: location.state.key,
            PartName: partName,
            PartCategoryId:2,
            // PartImage:image
            Stock: parseInt(stock),
            SKU: sku,
            PartDescription: description,
        }
        // console.log(payload);
        axios.put(`${PART_SERVICE_BASE_URL}part/update`, payload)
        .then((r)=>{
            setIsSubmitting(false)
            console.log(r)
            alert("Item successfully updated")
            navigate("/sparepart")
            
            
        }).catch((e)=>{
            alert('Failed to update item! Something went wrong')
            setIsSubmitting(false)
            console.log(e);
        })
    }

    function validatePartName(partName) {
        if (partName !== null || partName !== "" || partName !== undefined) {
            if (partName.length < 3) {
                setValidationPartName("Part Name must be at least 3 characters long!");
                return false;
            }
        } else{
            setValidationPartName("Part Name can't be blank!");
            return false;
        }
        return true;
    }

    function validatePartStock(stock) {
        if (parseInt(stock) <= 0 || parseInt(stock) > 1000) {
            setValidationStock("Please submit a suitable quantity")
            return false;
        } 
        return true;
    }

    function validateSKU(sku){
        if(sku.length !== 7){
            setValidationSKU("SKU must be seven characters")
            return false;
        }
        return true;
    }

    function validateDescription(description){
        if(description.length === 0 || description.length === undefined){
            setValidationDescription("Please enter a description")
            return false;
        }
        return true;
    }

    // function validateImage(image){
    //     if(image){
    //         const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    //         const fileExtension = image.name.substring(image.name.lastIndexOf('.')).toLowerCase();
    //         if(allowedExtensions.includes(fileExtension)) {
    //             setValidationImage("");
    //             return true;
    //         }
    //         setValidationImage("Invalid image file!");
    //     } else {
    //         setValidationImage("No image file selected!");
    //     }
    //     return false;
    // }

    function validateForm() {      
        setIsValidPartName(validatePartName(partName));
        setIsValidStock(validatePartStock(parseInt(stock)));
        setIsValidSKU(validateSKU(sku))
        setIsValidDescription(validateDescription(description));
    }

    if (isLoading) {
        return <LoadingSpinner />;
    }

  return (
    <Layout>
        <div className='pl-40 pt-24 w-full h-screen flex justify-center'>
            <div className='flex flex-col'>
                <form onSubmit={(e)=>{editSparePartAction(e)}}>
                    <h1 className="text-3xl font-semibold mb-2 text-start">Edit Part</h1>
                    <div className='flex flex-col'>
                        <div className='flex gap-8 py-4 w-full'>
                            <div className='w-1/2'>
                                <InputGroup
                                    autofocus
                                    classname={styleInputGroup}
                                    label={"Part Name"} 
                                    type={"text"} 
                                    placeholder={"Input the part name here..."} 
                                    name={partName} 
                                    id={partName}
                                    value={partName}
                                    for={partName}
                                    onchange={setPartName}
                                    />
                                    {
                                        !isValidPartName && (
                                            <span className="text-xs text-red-500 italic">
                                                {validationPartName}
                                            </span>
                                        )
                                    }  
                            </div>
                            <div className='w-1/2'>
                                <InputGroup
                                    classname={styleInputGroup}
                                    label={"Stock"} 
                                    type={"number"} 
                                    placeholder={"Input the stock here..."} 
                                    name={stock} 
                                    id={stock}
                                    value={stock}
                                    for={stock}
                                    min={1}
                                    max={1000}
                                    onchange={setStock}
                                />
                                {
                                    !isValidStock && (
                                        <span className="text-xs text-red-500 italic">
                                            {validationStock}
                                        </span>
                                    )
                                } 
                            </div>
                        </div>
                        <div className='flex gap-8 py-4'>
                            <div className='w-1/2'>
                                <InputGroup
                                    classname={styleInputGroup}   
                                    label={"SKU"} 
                                    type={"text"} 
                                    placeholder={"Input the SKU here..."} 
                                    name={sku} 
                                    id={sku}
                                    value={sku}
                                    for={sku}  
                                    onchange={setSku}
                                />
                                {
                                    !isValidSKU && (
                                        <span className="text-xs text-red-500 italic">
                                            {validationSKU}
                                        </span>
                                    )
                                } 
                            </div>
                            {/* <div className='w-1/2'>
                                <InputGroup
                                    classname={styleInputGroupImage}
                                    label={"Image"} 
                                    type={"file"} 
                                    placeholder={"Input the image here..."} 
                                    name={image} 
                                    id={image}
                                    value={image}
                                    for={image} 
                                    accept={".jpg, .jpeg, .png"}
                                    onchange={handleImageChange}
                                />
                                {
                                    !isValidImage && (
                                        <span className="text-xs text-red-500 italic">
                                            {validationImage}
                                        </span>
                                    )
                                } 
                            </div>    */}
                        </div>        
                        <div className='py-4 w-full'>
                            <InputGroup
                                classname={styleInputGroupDescription}
                                label={"Description"} 
                                type={"textarea"} 
                                placeholder={"Input the description here..."} 
                                name={description} 
                                id={description}
                                value={description}
                                for={description} 
                                onchange={setDescription}
                            />
                            {
                                !isValidDescription && (
                                    <span className="text-xs text-red-500 italic">
                                        {validationDescription}
                                    </span>
                                )
                            } 
                        </div>
                        <div className='flex gap-8'>
                            <Button text={"Edit Part"} type={'submit'} classname={styleSubmitButton} disabled={isSubmitting} onclick={validateForm}/>
                            <Button text={"Cancel"} type={'button'} classname={styleCancelButton} onclick={()=>{navigate('/sparepart')}}/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </Layout>
    
  )
}

export default EditSparePart