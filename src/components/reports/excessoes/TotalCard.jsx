import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

const TotalCard = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#f8f9fa",
        padding: "10px 20px",
        borderRadius: "20px",
        gap: "10px",
      }}
    >
      <div
        style={{
          background: "#0d6efd",
          color: "#fff",
          borderRadius: "50%",
          width: "35px",
          height: "35px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FontAwesomeIcon icon={faUsers} />
      </div>

      <div>
        <div style={{ fontSize: "12px" }}>TOTAL</div>
        <div style={{ fontWeight: "bold", color: "#0d6efd" }}>70</div>
      </div>
    </div>
  );
};

export default TotalCard;