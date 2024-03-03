import React from "react";
import "../App.css";
const DisplayCard = ({ item, index, pinCode }) => {
  return (
    <div>
      <ul className="card">
        <li>
          <b>Name : </b>
          {item.Name}
        </li>
        <li>
          <b>Branch Type : </b>
          {item.BranchType}
        </li>
        <li>
          <b>Delivery Status : </b>
          {item.DeliveryStatus}
        </li>
        <li>
          <b>District : </b>
          {item.District}
        </li>
        <li>
          <b>State : </b>
          {item.State}
        </li>
      </ul>
    </div>
  );
};

export default DisplayCard;
