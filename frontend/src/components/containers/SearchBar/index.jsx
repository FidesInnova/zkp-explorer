import React, { useRef, useState } from "react";
import "./style.scss";
import SearchIcon from "../../../icons/search";
import AnimatedWidth from "../../ui/Animated/Width";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const filters = [
  { title: "All Filters", value: "all" },
  { title: "Transactions", value: "transaction" },
  { title: "Services", value: "service" },
  { title: "Devices", value: "device" },
  { title: "Device Data+ZKP's", value: "zkp" },
  { title: "Device Commitments", value: "commitment" },
];

export default function SearchBar({ initialValue = "" }) {
  const [inputValue, setInputValue] = useState(initialValue);
  const [selectedFilter, setSelectedFilter] = useState(filters[0].value);
  const inputRef = useRef(null);
  const navigateTo = useNavigate();

  async function handleSearch(string) {
    if (String(string).trim().length === 0) {
      return false;
    } else {
      navigateTo(
        `/search?text=${encodeURIComponent(
          string
        )}&page=1&filter=${selectedFilter}`
      );
    }
  }

  // Handler for dropdown filter change
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <AnimatedWidth duration={1} className="custom-input">
      {/* Dropdown for filters */}
      <FormControl className="custom-drop-down" variant="outlined">
        <Select
          size="small"
          labelId="filter-dropdown-label"
          id="filter-dropdown"
          value={selectedFilter}
          onChange={handleFilterChange}
          hiddenLabel={true}
        >
          {filters.map((item) => (
            <MenuItem value={item.value}>{item.title}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Search input */}
      <input
        ref={inputRef}
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch(inputValue);
          }
        }}
        placeholder="Search by IoT Server Id / Service Contract Name / Service Contract Id / Device Name / Device Id"
      />

      {/* Search button */}
      <Button
        onClick={() => handleSearch(inputValue)}
        className="icon-holder"
        variant="contained"
      >
        <SearchIcon className="icon" />
      </Button>
    </AnimatedWidth>
  );
}
