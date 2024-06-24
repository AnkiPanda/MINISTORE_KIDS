import React from 'react';
import Select from 'react-select';
import "./ShippingModal.css";
import userLogo from "../../images/happiness.png";
import homeLogo from "../../images/home-address.png";
import locationLogo from "../../images/location.png";
import pinLogo from "../../images/pin.png";
import phnLogo from "../../images/phone.png";
import { Country, State } from 'country-state-city';
import flagLogo from "../../images/flag.png";
import placeLogo from "../../images/placeholder.png";

const ShippingModal = ({ showModal, onClose, shippingDetails, registerDataChange, addressSubmit, shippingId}) => {
    if (!showModal) {
        return null;
    }
    console.log(Country)
    const countryOptions = Country.getAllCountries().map((country) => ({
        value: country.isoCode,
        label: country.name
    }));

    const stateOptions = shippingDetails.country ? State.getStatesOfCountry(shippingDetails.country).map((state) => ({
        value: state.isoCode,
        label: state.name
    })) : [];
    const isMobile = window.innerWidth <= 600;
    // const customStylesCountry = {
    //     menu: (provided) => ({
    //         ...provided,
    //         zIndex: 9999,
    //         height: "9vmax",
    //         overflow: "auto"
    //     }),
    // };
    const customStyles = {
        menu: (provided,state) => ({
            ...provided,
            zIndex: 9999,
            height: isMobile ? "15vmax" : "9vmax",
            overflow: "auto",
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
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content-shipping" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>x</button>
                <form className='addressForm' onSubmit={addressSubmit}>
                    <div className="shippingName">
                        <img src={userLogo} alt="userLogo" />
                        <input type="text" name="shippingName" placeholder='Name' required value={shippingDetails.shippingName} onChange={registerDataChange} />
                    </div>
                    <div className="address">
                        <img src={homeLogo} alt="gmail" />
                        <input type="text" name="address" placeholder='Address' required value={shippingDetails.address} onChange={registerDataChange} />
                    </div>
                    <div className="city">
                        <img src={locationLogo} alt="unlock" />
                        <input type="text" name='city' placeholder='City' required value={shippingDetails.city} onChange={registerDataChange} />
                    </div>
                    <div className="pinCode">
                        <img src={pinLogo} alt="unlock" />
                        <input type="number" name='pinCode' placeholder='Pin Code' required value={shippingDetails.pinCode} onChange={registerDataChange} />
                    </div>
                    <div className="phoneNo">
                        <img src={phnLogo} alt="unlock" />
                        <input type="number" name='phoneNo' placeholder="Phone No" required value={shippingDetails.phoneNo} onChange={registerDataChange} />
                    </div>
                    <div className="country">
                        <img src={flagLogo} alt="unlock" />
                        <Select
                            styles={customStyles}
                            placeholder="Select Country"
                            options={countryOptions}
                            value={countryOptions.find(option => option.value === shippingDetails.country)}
                            onChange={(selectedOption) => registerDataChange({ target: { name: 'country', value: selectedOption.value } })}
                        />
                    </div>
                    {shippingDetails.country && (
                        <div className="state">
                            <img src={placeLogo} alt="unlock" />
                            <Select
                                styles={customStyles}
                                placeholder="Select State"
                                options={stateOptions}
                                value={stateOptions.find(option => option.value === shippingDetails.state)}
                                onChange={(selectedOption) => registerDataChange({ target: { name: 'state', value: selectedOption.value } })}
                            />
                        </div>
                    )}
                   {shippingId ? <input type="submit" value="Update" className="addAddressBtn" />
                   : <input type="submit" value="Add" className="addAddressBtn" />}
                </form>
            </div>
        </div>
    );
};

export default ShippingModal;
