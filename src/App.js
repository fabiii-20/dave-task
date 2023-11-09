// App.js
import React, { useEffect, useState } from "react";
import SupplierList from "./SupplierList";
import FiltersAndPagination from "./FiltersAndPagination";

const BASE_URL = "https://staging.iamdave.ai";

function App() {
  const [suppliers, setSuppliers] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    channel: "",
    state: "",
  });
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  const fetchSuppliers = async (page, filters) => {
    try {
      const url = new URL(`${BASE_URL}/list/supply?_page_number=${page}`);
      if (filters.category) url.searchParams.append("category", filters.category);
      if (filters.channel) url.searchParams.append("channel", filters.channel);
      if (filters.state) url.searchParams.append("state", filters.state);

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "X-I2CE-ENTERPRISE-ID": "dave_vs_covid",
          "X-I2CE-USER-ID": "ananth+covid@i2ce.in",
          "X-I2CE-API-KEY": "0349234-38472-1209-2837-3432434",
        },
      });
console.log(response)
      if (response.ok) {
        const data = await response.json();
        console.log(data) 
        setSuppliers(data.suppliers);
        setIsLastPage(data.is_last);
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchSuppliers(page, filters);
  }, [page, filters]);

  return (
    <div>
      {/* <FiltersAndPagination
        filters={filters}
        setFilters={setFilters}
        setPage={setPage}
        isLastPage={isLastPage}
      /> */}
      <SupplierList suppliers={suppliers} />
    </div>
  );
}

export default App;
