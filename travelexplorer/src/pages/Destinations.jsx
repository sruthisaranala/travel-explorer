import { useEffect, useState } from "react";
import api from "../services/api";
import DestinationCard from "../components/DestinationCard";
import { Link } from "react-router-dom";


function Destinations() {
  const [category, setCategory] = useState("All");
  const [budget, setBudget] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

 const [destinations, setDestinations] =
   useState([]);

 useEffect(() => {
   getDestinations();
 }, []);
const filteredDestinations =
  destinations.filter(
    destination => {

      const searchMatch =
        destination.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const categoryMatch =
        category === "All" ||
        destination.category ===
          category;
          const budgetMatch =
  budget === "All" ||
  destination.budget === budget;


      return (
        searchMatch &&
        categoryMatch && budgetMatch
      );
    }
  );


 async function deleteDestination(id) {

 await api.delete(
   `/destinations/${id}`
 );

 setDestinations(
   destinations.filter(
     destination =>
     destination.id !== id
   )
 );
}


 async function getDestinations() {
   try {
     const response = await api.get(
       "/destinations"
     );

     setDestinations(response.data);
   } catch (error) {
     console.log(error);
   }
 }
let finalDestinations =
  [...filteredDestinations];

if (sort === "high") {

  finalDestinations.sort(
    (a, b) =>
      b.rating - a.rating
  );

}

if (sort === "low") {

  finalDestinations.sort(
    (a, b) =>
      a.rating - b.rating
  );

}
 return (
   <>
     <h1>Popular Destinations</h1>

    <Link to="/add-destination">
     Add Destination
    </Link>
    <div className="filters">
      <input
  type="text"
  placeholder="Search Destination"
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
/>
<select
  value={category}
  onChange={(e) =>
    setCategory(e.target.value)
  }
>
  <option>All</option>
  <option>Beach</option>
  <option>Hill Station</option>
  <option>Adventure</option>
</select>
<select	
  value={budget}
  onChange={(e) =>
    setBudget(e.target.value)
  }
>
  <option>All</option>
  <option>Low</option>
  <option>Medium</option>
  <option>High</option>
</select>
<select
  value={sort}
  onChange={(e) => 
    setSort(e.target.value)
  }
>
  <option value="">
    Select
  </option>

  <option value="high">
    High To Low
  </option>

  <option value="low">
    Low To High
  </option>
</select>
</div>
     <div className="destinations">
       {finalDestinations.map((destination) => (
         <DestinationCard
           key={destination.id}
           destination={destination}
            onDelete={deleteDestination}
         />
       ))}
     </div>
   </>
 );
}

export default Destinations;