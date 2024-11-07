import React, { useState } from "react";

interface User {
  id: string;
  name: string;
  phone: string;
}

const SearchFriend: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [searchResult, setSearchResult] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      setError(null);
      // Call API to search phone number
      const response = await fetch(
        `https://api.example.com/search?phone=${phoneNumber}`
      );
      if (!response.ok) throw new Error("User not found");

      const user: User = await response.json();
      setSearchResult(user);
    } catch (err) {
      setSearchResult(null);
      setError("No user found with this phone number.");
    }
  };

  return (
    <div>
      <h2>Search friends</h2>
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter phone number"
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {searchResult && (
        <div>
          <h3>Search results:</h3>
          <p>Name: {searchResult.name}</p>
          <p>Phone number: {searchResult.phone}</p>
          <button
            onClick={() => alert(`Friend request sent to ${searchResult.name}`)}
          >
            Send friend request
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFriend;
