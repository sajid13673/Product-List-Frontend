import React from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function AddProducts(props){

    const [formData, setFormData] = React.useState({
      sku:"",
      name:"",
      price:"",
      productType:"",
      weight:"",
      size:"",
      height:"",
      width:"",
      length:""
    })

    const navigate = useNavigate()

    function handleChange(event){
      setFormData(prevFormData=>{return{...prevFormData, [event.target.name] : event.target.value}});
      
      
        if(event.target.name==='productType' && event.target.value !== ""){
            props.setSave(true)
        }
        else if(event.target.name==='productType' && event.target.value === "")
        {props.setSave(false)}
      
    }

    function handleSubmit(event){
      event.preventDefault();
    //   axios.post('https://sajidahamedacandiwebtestassignment.000webhostapp.com/insert.php', formData).then(function(response){
    //   alert(response.data.message)
    //     if(response.data.status){
    //         props.getProducts();
    //         navigate('/');}
    //   })
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(formData)
      };
      fetch('https://sajidahamedacandiwebtestassignment.000webhostapp.com/insert.php', requestOptions)
        .then(response => response.json())
        .then(data => {
          alert(data.message);
          if(data.status){
            props.getProducts();
            navigate('/');
          }
        });
    }


    React.useEffect(function(){
        props.setNav(true);
        props.setSave(false);
        } ,[])

    return(
        <div className="addForm">
            <form id='product_form' onSubmit={handleSubmit}>
                <div className="addForm">
                    SKU :
                    <br/>
                    <input type="text" name="sku" id="sku" onChange={handleChange} value={formData.sku}/>
                    <br/>
                    Product Name :
                    <br/>
                    <input type="text" name="name" id="name" onChange={handleChange} value={formData.name}/>
                    <br/>
                    Price ($):
                    <br/>
                    <input type="decimal" name="price" id="price" onChange={handleChange} value={formData.price} />
                    <br/>
                    Product type :
                    <br/>
                    <select name="productType" id="productType" onChange={handleChange}>
                        <option defaultValue="selected">
                        </option>
                        <option value="Furniture">Furniture</option>
                        <option value="Book">Book</option>
                        <option value="DVD">DVD</option>
                    </select>
                    <br/>
                    <br/>

                    <div id="Furniture" style={{display: formData.productType === "Furniture" ? "block" : "none"}}>
                        <br/>
                        Height (CM):
                        <br/>
                        <input type="decimal" name="height" id="height" onChange={handleChange} value={formData.height}/>
                        <br/>
                        Width (CM):
                        <br/>
                        <input type="decimal" name="width" id="width" onChange={handleChange} value={formData.width} />
                        <br/>
                        Length (CM):
                        <br/>
                        <input type="decimal" name="length" id="length" onChange={handleChange} value={formData.length} />
                        <br/>
                        Please, provide dimensions in HxWxL
                    </div>

                    <div id="Book" style={{display: formData.productType === "Book" ? "block" : "none"}}>
                        Weight (KG):
                        <br/>
                        <input type="decimal" name="weight" id="weight" onChange={handleChange} value={formData.weight} />
                        <br/>
                        Please, provide weight
                    </div>

                    <div id="DVD" style={{display: formData.productType === "DVD" ? "block" : "none"}}>
                        Size (MB):
                        <br/>
                        <input type="decimal" name="size" id="size" onChange={handleChange} value={formData.size}/>
                        <br/>
                        Please, provide size
                    </div>
                </div>
            </form>
        </div>
    )
}