import React, { Fragment, useEffect, useState } from 'react'
import "../Product/Products.css"
import { useSelector, useDispatch } from 'react-redux'
import { clearError, fetchProducts } from '../../reducers/productReducer'
import ProductCard from '../Home/ProductCard'
import Loader from '../layout/Loader/Loader'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import { ToastContainer, toast } from 'react-toastify';
import MetaData from '../layout/MetaData'
import FilterImg from "../../images/filter.png"
import FilterBox from '../Product/FilterBox'
import Select from 'react-select';

const Products = () => {
    const dispatch = useDispatch();
    const { keyword } = useParams()
    const { products, error, loading, productCount, resultPerPage,filterProductsCount } = useSelector(state=> state.product)
    const [currentPage, setCurrentPage] = useState(1)
    const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);
    const [price, setPrice] = useState([0, 50000]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedRatings, setSelectedRatings] = useState([])
    const [ratings,setRatings] = useState([0,5])

    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'tomato' : state.isFocused ? '#f0f0f0' : 'white',
        color: state.isSelected ? 'white' : 'black',
        padding: 10,
        cursor: 'pointer', 
        '&:hover': {
          backgroundColor: '#f0f0f0',
          color: 'black',
        },
      }),
      control: (provided) => ({
        ...provided,
        borderColor: 'tomato',
        '&:hover': {
          borderColor: 'tomato',
        },
        boxShadow: 'none',
      }),
      singleValue: (provided) => ({
        ...provided,
        color: 'black',
      }),
    };

    const categories = [
      {value: "", label: "All" },
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
   // const categories = ["Household","Accessories","Cloth","Furniture","Mobile","Laptop"]

    const setCurrentPageNo = (e)=>{
      console.log(e)
      setCurrentPage(e)
    }
    const onCategoryChange = (selectedOption) => {
      setSelectedCategory(selectedOption);
      console.log(selectedOption)
      setCurrentPage(1); // Reset to first page on category change
      dispatch(fetchProducts({ keyword, currentPage: 1, price, category: selectedOption ? selectedOption.value : '' }));

      //dispatch(fetchProducts({ keyword, currentPage, category }));
    };
    const handleFilter = () => {
      // Apply filters here
      console.log(price);
      console.log(selectedRatings)
      let minRate = 0;
      let maxRate = 5;
      let minFlag = false;
      let maxFlag = false;
      if(selectedRatings.includes('Above 4.0')){
        maxFlag = true;
        maxRate = 5;
        minRate = 4;
      }
      if(selectedRatings.includes('3.0 to 4.0')){
        if(!maxFlag){
          maxRate = 4;
        }
        minRate = 3;
      }
      if(selectedRatings.includes('2.0 to 3.0')){
        if(!maxFlag){
          maxRate = 3;
        }
        minRate = 2;
      }
      if(selectedRatings.includes('Below 2.0')){
        if(!maxFlag){
          maxRate = 2;
        }
        minRate = 0;
      }
      const ratingsArr = [minRate,maxRate]
      setRatings(ratingsArr)
      console.log(ratingsArr)
      setCurrentPage(1)
      //setPrice(price)
      // Dispatch fetchProducts with filters
      dispatch(fetchProducts({keyword,"currentPage":1,price, category: selectedCategory ? selectedCategory.value : '',"ratings":ratingsArr}))
      
    };

    const resetFilter = ()=>{
      setSelectedRatings([]);
      setRatings([0,5])
      setPrice([0,50000])
      setCurrentPage(1)
      dispatch(fetchProducts({keyword,"currentPage":1,"price":[0, 50000], category: selectedCategory ? selectedCategory.value : '',"ratings":[0,5]}))

    }

    useEffect(() => {
      if (error) {
        toast.error(error,{
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
          });
          dispatch(clearError)
        }
      dispatch(fetchProducts({keyword,currentPage,price,category: selectedCategory ? selectedCategory.value : '',ratings}))
    }, [dispatch,keyword,currentPage,selectedCategory,error])

    

    
    
  return (
    <Fragment>
        {loading ? <Loader/> :
        <Fragment>
          <MetaData title="PRODUCTS -- MiniStore." />
            <h2 className='productHeading'>Products</h2>
            <div className='filter-section'>
            <div className="category-section">
            <Select
                value={selectedCategory}
                onChange={onCategoryChange}
                options={categories}
                placeholder="Select Category"
                styles={customStyles}
                className='category-select'
            />
         
          </div>
              <div className='price-section'>
            <button className='filter-button' onClick={()=>{setIsFilterBoxOpen(true)}}>
             Filter <img src={FilterImg} alt="filter" />
            </button>
            <FilterBox
            isOpen={isFilterBoxOpen}
            onClose={() => setIsFilterBoxOpen(false)}
            onFilter={handleFilter}
            price={price}
            setPrice={setPrice}
            selectedRatings={selectedRatings}
            setSelectedRatings = {setSelectedRatings}
            resetFilter = {resetFilter}
          />
          </div>
         
          </div>
            <div className="products">
            {products && products.length > 0 ? products.map((product)=>(
                <ProductCard key={product._id} product={product}/>
            )) :
            <p className='noProduct'>No Products Found</p>}
            </div>
            {resultPerPage < filterProductsCount &&
            <div className='paginationBox'>
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                pageRangeDisplayed={5}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
        </div>}
            </Fragment>}
            
            <ToastContainer/>
    </Fragment>
  )
}

export default Products
