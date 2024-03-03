import React, { useEffect, useState } from "react";
import DisplayCard from "./DisplayCard";
import SearchIcon from "@mui/icons-material/Search";
import { ThreeCircles } from "react-loader-spinner";
import "../App.css";

const Pincode = () => {
  const [pinCode, setPinCode] = useState("");
  const [list, setList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);

    if (pinCode.length !== 6) {
      setError("Postal code should be 6 digits....");
      setLoading(false);
      return;
    }

    try {
      const resp = await fetch(
        `https://api.postalpincode.in/pincode/${pinCode}`
      );
      if (!resp.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await resp.json();

      if (data[0] && data[0].PostOffice) {
        setList(data[0].PostOffice);
        setError(null);
      } else {
        setError("No post offices found");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filterList = list.filter((item) =>
      item.Name.toLowerCase().includes(filterText.toLowerCase())
    );

    setFilterList(filterList);
  }, [filterText, list]);

  return (
    <div className="main">
      <div className="loader">
        {loading && (
          <ThreeCircles
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
      </div>

      {error && <div>{error}</div>}

      {!loading && !error && (
        <>
          {list.length > 0 ? (
            <>
              <h2>Pincode: {pinCode}</h2>
              <p>
                <b>Message</b>: Number of pincode(s)
              </p>

              <div className="input-container">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Filter"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <h2>Enter your pin code:</h2>
              <input
                className="pincode-search"
                type="text"
                placeholder="Pincode"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />{" "}
              <br />
              <button onClick={handleFetch}>LookUp</button>
            </>
          )}

          <div className="cards">
            {filterList.map((item, index) => (
              <DisplayCard
                key={index}
                item={item}
                index={index}
                pinCode={pinCode}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Pincode;
