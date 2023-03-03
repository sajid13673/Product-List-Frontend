import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar(props){
    const navigate = useNavigate()
    
    function handleAdd(){
        navigate('add-products')
    }
    function handleCancel(){
        navigate('/');
    }
    return(
        <nav>
            <h1 className="nav-title">{props.nav ? "Product Add" : "Product List"}</h1>
            <div >
                <ul className='nav-items'>
                <li><button className='addButton' onClick={handleAdd} style={{ display: props.nav ? "none" : "block"}}> ADD </button></li>
                <li><button className='deleteButton' onClick={props.handleMassDelete} style={{ display: props.nav ? "none" : "block"}}>MASS DELETE</button></li>
                <li><button className='cancelButton'onClick={handleCancel} style={{ display: props.nav ? "block" : "none"}}>Cancel</button></li>
                <li><button form='product_form' className='saveButton' type='submit' style={{ display: props.nav && props.save ? "block" : "none"}}>Save</button></li>
                </ul>
            </div>
        </nav>
    )
}
