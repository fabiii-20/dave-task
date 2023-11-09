
// App.js
import React, { useEffect, useState } from "react";
import SupplierList from "./SupplierList";
import FiltersAndPagination from "./FiltersAndPagination";

const BASE_URL = "https://staging.iamdave.ai";

function App() {
  const [suppliers, setSuppliers] = useState([]);
  const [filterValues, setFilterValues] = useState({
    category: {},
    channel: {},
    state: {},
  });
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
      if (filters.category)
        url.searchParams.append("category", filters.category);
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

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSuppliers(data?.data);
        setIsLastPage(data.is_last);
      } else {
        console.log(response.not)
      }
    } catch (error) {
      console.log(error)
    }
  };

  const getFiltersOfItem = async (name) => {
    const url = new URL(`${BASE_URL}/unique/supply/${name}`);
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-I2CE-ENTERPRISE-ID": "dave_vs_covid",
        "X-I2CE-USER-ID": "ananth+covid@i2ce.in",
        "X-I2CE-API-KEY": "0349234-38472-1209-2837-3432434",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data.data;
    }
  };

  useEffect(() => {
    console.log("filters change", filters);
    fetchSuppliers(page, filters);
  }, [page, filters]);

  const getAllFilters = async () => {
    const category = await getFiltersOfItem("category");
    const channel = await getFiltersOfItem("channel");
    const state = await getFiltersOfItem("state");
    setFilterValues({ category, channel, state });
  };
  useEffect(() => {
    getAllFilters();
  }, []);

return (
    <div className="relative  isolate overflow-hidden bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 min-h-screen px-6 py-24  sm:px-10 sm:py-20 lg:overflow-visible ">
      <div className="mx-auto bg-white rounded-xl py-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none  lg:items-start lg:gap-y-10">
        <div className="lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl  lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="">
              <p className="text-base font-semibold leading-7 text-indigo-600">
                Suppliers
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Suppliers List
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                Suppliers list from various vendors. You can filter, sort etc.
              </p>
              <div className="flex justify-between items-start my-6">
                <div className="sm:w-3/12">
                  <FiltersAndPagination
                    filters={filters}
                    setFilters={setFilters}
                    setPage={setPage}
                    isLastPage={isLastPage}
                    allFilters={filterValues}
                    page={page}
                  />
                </div>
                <div className="sm:w-9/12">
                  {" "}
                  <SupplierList suppliers={suppliers} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;