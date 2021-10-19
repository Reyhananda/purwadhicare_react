/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { API_URL } from "../../constants/API";
import axios from "axios";
import Swal from "sweetalert2";
import OrderCard from "../../components/OrderCard";

function OrderList() {
  const globalUser = useSelector((state) => state.user);
  const [orderList, setOrderList] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(API_URL + "/order/orderData", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setOrderList(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  const renderOrder = () => {
    return orderList.map((val) => {
      return <OrderCard orderData={val} setOrderList={setOrderList} />;
    });
  };

  return (
    <div className="content-user">
      <div className="content">
        <div className="container-fluid">
          <div className="container pt-4">
            <h2 className="text-center">Daftar Transaksi</h2>
            <div className="line mb-4" />
            <div className="pb-4">{renderOrder()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderList;
