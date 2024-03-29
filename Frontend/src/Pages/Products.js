import React from "react";
import logo from '../Images/Iphone 14.jpg';
import './Products.css'
import { useRef, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { listProducts } from "../actions/productAction";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCard from "./productCard";
import "bootstrap/dist/css/bootstrap.min.css";


function Products() {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch(listProducts());
        // if (!userInfo) {
        //   navigate('/');
        // }
    }, [
        dispatch,
        navigate,
        userInfo,
    ]);
  return (
    <div className="super-product-cont">
      {console.log(products)}
      <div className="header"><h1>Products</h1></div>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {/* {products && products.map(product => (
                <div className="product-container" key={product._id}>
                    <a><img src={product.Image} className="product-pic" alt="logo" /> </a>
                    <h1>{product.Product_Name}</h1>
                    <a>{product.Description}</a><br />
                    <a href={product.Link} target="_blank" rel="noreferrer">
                        <button className="take-to-prod">go to Product</button>
                    </a>
                </div>
            ))} */}
      <div className="container-fluid mb-2">
        <div className="mt-2">
          <div className="row" style={{marginLeft: "18rem"}}>
            <div className="col-md-10">
              <div className="row row-cols-1 row-cols-md-4 g-4">
                {products && products.map((product) => {
                  return <ProductCard item={product} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="not-footer"><h1>Want to increase your product outreach?</h1></div>
      <button className="click-here" type="submit">Click here</button>
    </div>
  )
}

export default Products;