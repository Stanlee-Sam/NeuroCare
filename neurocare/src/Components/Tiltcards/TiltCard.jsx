import { useEffect, useState } from "react";
import axios from "axios";
import TiltCardItem from "./TiltCardItem"; // Adjust the path if needed

const Cards = () => {
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/journal");
        const sortedEntries = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setJournalEntries(sortedEntries.slice(0, 3));
      } catch (error) {
        console.error("Error fetching journal entries:", error);
      }
    };

    fetchJournalEntries();
  }, []);

  return (
    <div className="grid w-full place-content-center bg-[#D9D9D9] px-4 py-12 text-slate-900">
      <div className="flex flex-wrap justify-center items-center gap-4">
        {journalEntries.map((entry) => (
          <TiltCardItem key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
