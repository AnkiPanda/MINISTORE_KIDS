// FilterBox.jsx
import React, { useState } from 'react';
import './FilterBox.css';
import  Slider  from 'rc-slider';
import 'rc-slider/assets/index.css';
import Form from 'react-bootstrap/Form';




const FilterBox = ({ isOpen, onClose, onFilter, price, setPrice,selectedRatings,setSelectedRatings,resetFilter }) => {
  

  const ratingOptions = ["Above 4.0","3.0 to 4.0","2.0 to 3.0","Below 2.0"]
  
  // const [filters, setFilters] = useState({
  //   category: '',
  //   priceRange: '',
  // });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFilters({
  //     ...filters,
  //     [name]: value,
  //   });
  // };
  const handleRatingUpdate = (e)=>{
    const selectedItem = e.target.value;
    const updatedRating = [...selectedRatings]
    if(updatedRating.includes(selectedItem)){
      updatedRating.splice(updatedRating.indexOf(selectedItem),1)
    }
    else{
      updatedRating.push(selectedItem)
    }
    setSelectedRatings(updatedRating)
  }

  const handlePriceChange = (value) => {
    setPrice(value);
  };

  const handleApplyFilter = () => {
    onFilter();
    onClose();
  };
  const handleResetFilter = () => {
    resetFilter();
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    
      <div className="filter-box">
        <h1>Filter Products</h1>
        
        <h2>PRICE RANGE</h2>
       <p>Use Slider to enter Minimum of Maximum Price</p>
       <Slider
            range
            min={0}
            max={50000}
            defaultValue={price}
            onChange={handlePriceChange}
            value={price}
            
          />
          <div className='price-range'>
            <span>₹{price[0]}</span> - <span>₹{price[1]}</span>
          </div>
          <h2>CUSTOMER RATINGS</h2> 
    
         <Form className='mb-3'>
          {ratingOptions.map((item,index)=>(
            <Form.Check 
            type={"checkbox"}
            id={`default-checkbox-${index}`}
            key={index}
            label={item}
            value={item}
            checked={selectedRatings.includes(item) ? true : false}
            onChange={handleRatingUpdate}
          />
          ))}
      
          </Form>
        <button onClick={handleApplyFilter}>Apply</button>
        <button onClick={onClose}>Close</button>
        <button onClick={handleResetFilter}>Reset</button>
      
    </div>
  );
};

export default FilterBox;
