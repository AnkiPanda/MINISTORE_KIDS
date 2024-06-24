import React from 'react'
import Select from 'react-select';
import "./ProductForm.css"
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import CheckroomIcon from '@mui/icons-material/Checkroom';
import DescriptionIcon from '@mui/icons-material/Description';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CategoryIcon from '@mui/icons-material/Category';
import StorageIcon from "@mui/icons-material/Storage";

const ProductForm = ({showModal, closeModal, productSubmit,  productDetails, registerDataChange,productId, imagesPreview, createProductImagesChange, removeImage}) => {

    if(!showModal){
        return null;
    }
    const categories = [
        {value: "Girls Clothes", label: "Girls Clothes" },
        {value: "Boys Clothes", label: "Boys Clothes" },
        {value: "Girls Footwear", label: "Girls Footwear"},
        {value: "Boys Footwear", label: "Boys Footwear"},
        {value: "Girls Accessories", label: "Girls Accessories"},
        {value: "Boys Accessories", label: "Boys Accessories"},
        {value: "Toys", label: "Toys"},
        {value: "Nursery Essentials", label: "Nursery Essentials"},
        {value: "Feeding & Nursing", label: "Feeding & Nursing"},
        {value: "Diaparing Essentials", label: "Diaparing Essentials"},
        {value: "Bath & Skin Care", label: "Bath & Skin Care"},
        {value: "School Supplies", label: "School Supplies"},
        {value: "Art & Hobbies", label: "Art & Hobbies"},
    ]
    const isMobile = window.innerWidth <= 600;
    const customStyles = {
        menu: (provided,state) => ({
            ...provided,
            zIndex: 9999,
            backgroundColor: state.isSelected ? 'tomato' : state.isFocused ? '#f0f0f0' : 'white',
            color: state.isSelected ? 'white' : 'black',
            padding: 10,
            cursor: 'pointer', 
            '&:hover': {
            backgroundColor: '#f0f0f0',
            color: 'black',
        },
        }),
    };

  return (
    <div className="modal-overlay" onClick={closeModal}>
    <div className="modal-content-product-form" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeModal}>x</button>
        <h2 className='p-2'>Product Form</h2>
        <form className='productForm' onSubmit={productSubmit} encType='multipart/form-data'>
                    <div className="productName">
                        {/* <CheckroomIcon/> */}
                        <SpellcheckIcon/>
                        <input type="text" name="name" placeholder='Product Name' required value={productDetails.name} onChange={registerDataChange} />
                    </div>
                    <div className="productDescription">
                        <DescriptionIcon/>
                        
                        <textarea rows={3} name="description" placeholder='Description' required value={productDetails.description} onChange={registerDataChange} />
                    </div>
                    <div className="price">
                       <CurrencyRupeeIcon/>
                        <input type="number" name='price' placeholder='Price' required value={productDetails.price} onChange={registerDataChange} />
                    </div>
                    
                    <div className="category">
                        <CategoryIcon/>
                        <Select
                            styles={customStyles}
                            placeholder="Select Category"
                            options={categories}
                            required 
                            value={categories.find(option => option.value === productDetails.category)}
                            onChange={registerDataChange} 
                            name='category'
                        />
                        {/* <input type="text" name='category' placeholder='Category' required value={productDetails.category} onChange={registerDataChange} /> */}
                    </div>
                    <div className="stock">
                        <StorageIcon/>
                        <input type="number" name='stock' placeholder="Stock" required value={productDetails.stock} onChange={registerDataChange} />
                    </div>
                    <div id="createProductFormFile">
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={createProductImagesChange}
                            multiple
                        />
                    </div>

                    <div id="createProductFormImage">
                    {imagesPreview.map((image, index) => (
                        <div key={index} id={`img_${index}`}>
                        <img  src={image} alt="Product Preview" />
                        <span className='badge' onClick={()=>removeImage(index)}>x</span>
                        </div>
                    ))}
                    </div>
                   {productId ? <input type="submit" value="Update" className="addProductBtn" />
                   : <input type="submit" value="Add" className="addProductBtn" />}
                </form>
    </div>
    </div>
  )
}

export default ProductForm