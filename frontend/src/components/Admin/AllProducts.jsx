import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { clearError, createNewProduct, deleteProduct, fetchAllProductsForAdmin, resetSuccessStatus, updateProduct } from '../../reducers/productReducer';
import "./AllProducts.css";
import SearchIcon from '@mui/icons-material/Search';
import ProductForm from './ProductForm';
import Loader from '../layout/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReviewModal from './ReviewModal';

const AllProducts = () => {
    const dispatch = useDispatch();
    const { products, success, loading, error } = useSelector(state => state.product);

    // State for search and filter
    const [filterText, setFilterText] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [showReviewModal, setShowReviewModal] = useState(false)
    const [ productId, setProductId ] = useState(null)
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [reviews, setReviews] = useState([])
    const [ productDetails, setProductDetails ] = useState(
      {
        name : "",
        description: "",
        price: "",
        category : "",
        stock: "",

      }
    )
    const { name, description, price, category, stock } = productDetails

    useEffect(() => {
        dispatch(fetchAllProductsForAdmin());
        if(error){
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
        dispatch(clearError())
        }
        if(success){
          dispatch(resetSuccessStatus())
        }
    }, [dispatch,success,error]);

    useEffect(() => {
        setFilteredProducts(
            products.filter(product => 
                product.name.toLowerCase().includes(filterText.toLowerCase()) ||
                product._id.toLowerCase().includes(filterText.toLowerCase()) ||
                product.stock.toString().toLowerCase().includes(filterText.toLowerCase()) ||
                product.price.toString().toLowerCase().includes(filterText.toLowerCase()) ||
                product.ratings.toFixed(2).toLowerCase().includes(filterText.toLowerCase()) 

            )
        );
    }, [filterText, products]);

    const columns = [
        {
          name: 'Product Image',
          selector: row => (
            <img src={row.images[0].url} alt={row.images[0].url} style={{width:"5vmax",padding:"1vmax"}}/>
          ),
          sortable: true,
        },
        {
          name: 'Product ID',
          selector: row => row._id,
          sortable: true,
        },
        {
          name: 'Product Name',
          selector: row => row.name,
          sortable: true,
        },
        {
          name: 'Stock',
          selector: row => row.stock,
          sortable: true,
        },
        {
          name: 'Price',
          selector: row => row.price,
          sortable: true,
          cell: row => `₹${row.price}`, // Add currency symbol
        },
        {
          name: 'Ratings',
          selector: row => row.ratings.toFixed(2),
          sortable: true,
          
        },

        {
          name: 'Actions',
          cell: row => (
            <div>

                <IconButton
                color="primary"
                onClick={()=>openEditForm(row)}>
                <EditIcon />
              </IconButton>
             
             <IconButton
                color="error"
                onClick={()=>deleteProductHandler(row._id)}
              >
                <DeleteIcon />
              </IconButton>
             
            </div>
          ),
        },
        
        {
          name: 'Reviews',
          cell: row => (
            <div>
              <Button
              size="small"
              variant="outlined"
              color="info"
              className='reviewOpenBtn'
                onClick={()=>openReviews(row)}
              >
              <VisibilityIcon/>
               &nbsp;Reviews
              </Button>
              
            </div>
          ),
        },
      ];

      const openReviews = (productData)=>{
        setReviews(productData.reviews)
        setProductId(productData._id)
        setShowReviewModal(true)
      }
      const closeReviewModal = ()=>{
        setShowReviewModal(false)
        setReviews([])
        setProductId(null)
        dispatch(fetchAllProductsForAdmin());
      }
      

      const openProductCreateForn = ()=>{
        setShowModal(true)
      }
      const closeModal = ()=>{
        setShowModal(false)
        setImages([])
        setImagesPreview([])
        setProductDetails({
          name : "",
          description: "",
          price: "",
          category : "",
          stock: "",
        })
        setProductId(null)
      }
      const registerDataChange = (e)=>{
        if(e.target){
          setProductDetails({...productDetails, [e.target.name]:e.target.value})
        }
        else{
          setProductDetails({...productDetails, ["category"]:e.value})
        }
      }

      const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
    
        // setImages([]);
        // setImagesPreview([]);
    
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagesPreview((old) => [...old, reader.result]);
              setImages((old) => [...old, reader.result]);
            }
          };
    
          reader.readAsDataURL(file);
        });
      };
      const removeImage = (index)=>{
        let imgArr = JSON.parse(JSON.stringify(imagesPreview))
        imgArr.splice(index, 1);
        setImages(imgArr);
        setImagesPreview(imgArr)
      }
    
      const productSubmit = (e)=>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);

        images.forEach((image) => {
          myForm.append("images", image);
        });
        if(productId){
          dispatch(updateProduct({"id":productId,"productData":myForm}))
        }
        else{
        dispatch(createNewProduct(myForm));
        }
        closeModal()
      }
      const openEditForm = (productData)=>{
        setProductId(productData._id)
        setProductDetails({
          name : productData.name,
          description: productData.description,
          price: productData.price,
          category : productData.category,
          stock: productData.stock,
        })
        const urls = productData.images.map(image => image.url);
        setImages(urls)
        setImagesPreview(urls)
        setShowModal(true)
      }
      const deleteProductHandler = (id)=>{
        dispatch(deleteProduct(id))
      }
    return (
      <Fragment>
        {loading ? <Loader/> : 
        <Fragment>
            <div className="allProductsDiv">
                <div className="productDetailsHeader align-items-center">
                    <div>
                      <SearchIcon/>
                    <input
                        id="search"
                        type="search"
                        placeholder="Search Products"
                        value={filterText}
                        onChange={e => setFilterText(e.target.value)}
                        variant="outlined"
                        size="small"
                        style={{ marginLeft: 'auto' }}
                    />
                    </div>
                    <Button
                      size="small"
                      onClick={openProductCreateForn}>
                      <AddIcon/> Product
                      </Button>
                    {/* <button onClick={openProductCreateForn} className=''>
                        <AddIcon /> Product
                    </button> */}
                </div>
                <DataTable
                    title="Product List"
                    columns={columns}
                    data={filteredProducts}
                    pagination
                    highlightOnHover
                />
            </div>
            <ProductForm showModal={showModal} closeModal={closeModal} productSubmit={productSubmit} productDetails={productDetails} registerDataChange={registerDataChange} productId={productId}
            createProductImagesChange={createProductImagesChange} imagesPreview={imagesPreview} removeImage={removeImage}/>
        <ReviewModal showReviewModal={showReviewModal} closeReviewModal={closeReviewModal} productId={productId}/>
        </Fragment>
        }
        <ToastContainer/>
        </Fragment>
    );
}

export default AllProducts;
