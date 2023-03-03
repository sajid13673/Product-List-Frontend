import React from "react";

export default function ProductList(props){
  const [list, setList] = React.useState(true);
    const productList = <div className="ProductDetails">
                            <input type="checkbox" className="delete-checkbox" name={props.SKU} checked={props.isChecked} onChange={props.check}/><br/>
                            <p>{props.SKU}</p>
                            <p>{props.productName}</p>
                            <p>{props.price} $</p>
                            <p>{props.productType === "Book" && `Weight: ${props.weight}  KG`}</p>
                            <p>{props.productType === "DVD" && `Size: ${props.size} MB`}</p>
                            <div>{props.productType === "Furniture" && (<p>Dimensions: {props.height} x {props.width} x {props.length}</p>)}</div>
                        </div>
    const emptyList = <h1>No products to display</h1>
    React.useEffect(function(){
        props.setNav(false);
        setList(props.status);
        } ,[props])
    return(
        <div>
            {list ? productList : emptyList}
        </div>
    )
}