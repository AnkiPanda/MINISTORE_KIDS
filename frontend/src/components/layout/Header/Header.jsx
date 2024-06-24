import React, { useEffect, useRef, useState } from 'react'
import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import { Navbar, Nav, Form, NavDropdown } from 'react-bootstrap';
import logo from '../../../images/MiniStore-logo.png'
import cart from '../../../images/cart.svg'
import search from '../../../images/search.svg'
//import profile from '../../../images/profile.svg'
import profile from "../../../images/profile.png"
import "../Header/Header.css"
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, logoutUser } from '../../../reducers/userReducer';
import { ToastContainer, toast } from 'react-toastify';
import { loadCart } from '../../../reducers/cartReducer';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Header = () => {

  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [showOptions, setShowOptions] = useState(false);
  // const ulRef = useRef(null)

  const toggleOptions = () => {


    setShowOptions(!showOptions);

  };
  const handleChange = (value) => {
    setKeyword(value)
    if (value.trim()) {
      navigate(`/products/${value}`)
    }
    else {
      navigate('/products')
    }
  }
  const { user, message, isAuthenticated, error } = useSelector(state => state.user)
  const [avatarPreview, setAvatarPreview] = useState(user.avatar ? user.avatar.url : profile)
  const { cartItems } = useSelector(state => state.cart)

  useEffect(() => {
    
    if (!isAuthenticated && message === "Logged Out") {

      Swal.fire({
        title: "Logged Out",
        text: "Logged out Successfully",
        icon: "success"
      });

      setAvatarPreview(profile)
      navigate('/login')

    }
    if (isAuthenticated) {
      setAvatarPreview(user.avatar.url != "" ? user.avatar.url : profile)
      dispatch(loadCart())
    }
  }, [isAuthenticated])

  const handleLogout = () => {
    setShowOptions(!showOptions);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Log Out from this Account!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Log Out"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logoutUser())

      }
    })
  }
  const [isMobileView, setIsMobileView] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 600) {
      setIsMobileView(true)
    } else {
      setIsMobileView(false)
    }
  }, [])

  return (
    <Navbar expand="lg" className="nav-bg sticky-top">
      <Container className='header_container'>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Brand as={Link} to="/"><img src={logo} alt="MiniStore" /></Navbar.Brand>
        {isMobileView &&
          <>
            <Nav.Link className="nav-text cartImageDiv ms-auto" onClick={() => {
              if (isAuthenticated)
                navigate('/cart')
              else
                Swal.fire({ text: "You need login first to access cart" });

            }}>
              <ShoppingCartIcon />
              {/* <img className="cartImage" src={cart} alt="cart" /> */}
              {isAuthenticated && <div className="badge">{cartItems ? cartItems.length : 0}</div>}
            </Nav.Link>
            <NavDropdown title={<img className="avatarImage" src={avatarPreview} alt="Avatar Preview" />} id="basic-nav-dropdown" align={{ lg: 'start' }}>
              {!isAuthenticated && <NavDropdown.Item as={Link} to="/login" onClick={toggleOptions}>Register/Login </NavDropdown.Item>}
              {isAuthenticated && <NavDropdown.Item as={Link} to="/account">Account</NavDropdown.Item>}
              {isAuthenticated && user.role === 'user' && <NavDropdown.Item as={Link} to="/orders" onClick={toggleOptions}>Orders</NavDropdown.Item>}
              {isAuthenticated && user.role === 'admin' && <NavDropdown.Item as={Link} to="/admin/dashboard" onClick={toggleOptions}>Dashboard</NavDropdown.Item>}
              {isAuthenticated && <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>}
            </NavDropdown>
          </>
        }
        <Navbar.Collapse id="basic-navbar-nav justify-content-between">
          <Nav className="me-auto">
            <Nav.Link as={Link} className="nav-text" to="/">Home</Nav.Link>
            <Nav.Link as={Link} className="nav-text" to="/products">Products</Nav.Link>
            <Nav.Link as={Link} className="nav-text" to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} className="nav-text" to="/about">About</Nav.Link>
          </Nav>
          <Nav className="align-items-center gap-3">
            <div className='search-div'>
              <SearchIcon />
              <input type="search"
                placeholder="Search for Products" value={keyword} onChange={(e) => handleChange(e.target.value)} />
            </div>
            {!isMobileView &&
              <>
                <Nav.Link className="nav-text cartImageDiv d-flex" onClick={() => {
                  if (isAuthenticated)
                    navigate('/cart')
                  else
                    Swal.fire({ text: "You need login first to access cart" });

                }}>
                  <ShoppingCartIcon />
                  {/* <img className="cartImage" src={cart} alt="cart" /> */}
                  {isAuthenticated && <div className="badge">{cartItems ? cartItems.length : 0}</div>}
                </Nav.Link>
                <NavDropdown title={<img className="avatarImage" src={avatarPreview} alt="Avatar Preview" />} id="basic-nav-dropdown" align={{ lg: 'end' }}>
              {!isAuthenticated && <NavDropdown.Item as={Link} to="/login" onClick={toggleOptions}>Register/Login </NavDropdown.Item>}
              {isAuthenticated && <NavDropdown.Item as={Link} to="/account">Account</NavDropdown.Item>}
              {isAuthenticated && user.role === 'user' && <NavDropdown.Item as={Link} to="/orders" onClick={toggleOptions}>Orders</NavDropdown.Item>}
              {isAuthenticated && user.role === 'admin' && <NavDropdown.Item as={Link} to="/admin/dashboard" onClick={toggleOptions}>Dashboard</NavDropdown.Item>}
              {isAuthenticated && <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>}
              </NavDropdown>

                {/* <Nav.Link className="nav-text" onClick={toggleOptions}>
                  <img className="avatarImage" src={avatarPreview} alt="Avatar Preview" />
                  {showOptions && (
                    <ul id="accountOptionsUL" className='accountOptions'>
                      {!isAuthenticated && <li><Link to="/login" onClick={toggleOptions}>Register/Login </Link></li>}
                      {!isAuthenticated && <li></li>}
                      {isAuthenticated && <li><Link to="/account" onClick={toggleOptions}>Profile</Link></li>}
                      {isAuthenticated && <li></li>}
                      {isAuthenticated && user.role === 'user' && <li><Link to="/orders" onClick={toggleOptions}>Orders</Link></li>}
                      {isAuthenticated && user.role === 'user' && <li></li>}
                      {isAuthenticated && user.role === 'admin' && <li><Link to="/admin/dashboard" onClick={toggleOptions}>Dashboard</Link></li>}
                      {isAuthenticated && user.role === 'admin' && <li></li>}
                      {isAuthenticated && <li><a onClick={handleLogout}>Log Out</a></li>}
                    </ul>
                  )}
                </Nav.Link> */}
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
      <ToastContainer />
    </Navbar>
  )
}

export default Header
