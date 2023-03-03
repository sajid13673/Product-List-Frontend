import React from "react";
import {Routes, Route} from "react-router-dom";
import Navbar from "./components/navbar";
import AddProducts from "./components/addProducts";
import ProductList from "./components/productlist";
import Footer from "./components/footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [products,setProducts] = React.useState([])
  const [productsListStatus,setProductsListStatus] = React.useState(false)
  const navigate = useNavigate();
  function getProducts(){
    // fetch('/get.php',{
    //   method:'GET',
    //   headers:{
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': 'http://localhost:3000'
    //   },
    // })
    // .then((response) => response.json())
    // .then((data)=>{console.log(data)})
    axios.get('https://sajidahamedacandiwebtestassignment.000webhostapp.com/get.php').then(function(response){
      setProductsListStatus(response.data.status);
      if(response.data.status){
      const array = response.data.list.map((element) => ({
        ...element,
        isChecked: false
      }));
      setProducts(array);}
  });
  }
  
  React.useEffect(function () {
    getProducts();
  }, []);
    const productList = products.map((item) => {
      return (
        <ProductList
          key={item.SKU}
          status={productsListStatus}
          SKU={item.SKU}
          productName={item.productName}
          price={item.Price}
          productType={item.productType}
          size={item.size}
          weight={item.weight}
          height={item.height}
          width={item.width}
          length={item.length}
          isChecked={item.isChecked}
          check={() => check(item.SKU)}
          setNav={(status) => setNav(status)}
        />
      );
    });
    
    const emptyList = (
      <ProductList
        status={productsListStatus}
        setNav={(status) => setNav(status)}
      />
    );

    function check(sku) {
      setProducts((prevProducts) =>
        prevProducts.map((item) => {
          return item.SKU === sku
            ? { ...item, isChecked: !item.isChecked }
            : item;
        })
      );
    }

    function handleMassDelete() {
      const checkedValues = [];
      for (let i = 0; i < products.length; i++) {
        if (products[i].isChecked === true) {
          checkedValues.push(products[i].SKU);
        }
      }
      // fetch('https://sajidahamedacandiwebtestassignment.000webhostapp.com/delete.php',{
      //   method:'POST',
      //   headers:{
      //     'Content-Type': 'application/json',
      //     'Access-Control-Allow-Origin': '*'
      //   },
      //   body:JSON.stringify(checkedValues)
      // })
      // .then((response) => response.json())
      // .then((data)=>{alert(data)})
      // .then(function (response) {
      //       //alert(response.data);
      //       console.log(response.data);
      //  });
      /*axios.post("https://sajidahamedacandiwebtestassignment.000webhostapp.com/delete.php", checkedValues)
      //https://testscandiweb.infinityfreeapp.com
        .then(function (response) {
          alert(response.data);
          console.log(response.data);
        });*/
      //getProducts()
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(checkedValues)
      };
      fetch('https://sajidahamedacandiwebtestassignment.000webhostapp.com/delete.php', requestOptions)
        .then(response => response.json())
        .then(data => {
          alert(data);
        });
        getProducts()
    }

    const [nav, setNav] = React.useState(false);

    const addProduct = <AddProducts setNav = {status=>setNav(status)} 
                                    setSave = {status=>setSave(status)}
                                    getProducts = {()=>getProducts()}
                                    />;
    const [save, setSave] = React.useState(false);

  return (
    <div className="app">
      <Navbar
        handleMassDelete={handleMassDelete}
        nav={nav}
        setNav={(status) => setNav(status)}
        save={save}
      />
      <Routes>
        <Route
          path="/"
          element={
            <div className="products">
              {productsListStatus ? productList : emptyList}
            </div>
          }
        />
        <Route path="add-products" element={addProduct} />
      </Routes>
      <Footer />
    </div>
  );
}
