import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./InterviewPrep.css";


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" }
  })
};

const InterviewPrep = () => {
  const [internships, setInternships] = useState([]);
  const [loadingInternships, setLoadingInternships] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0); 

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_INTERNSHIP_API_URL}?location_filter=India&offset=50`, 
          {
            headers: {
              "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY, //rapidapi-key
              "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST // rapidapi-host-link
            }
          }
        );
        const data = await res.json();
        console.log("API Response:", data);

        const filtered = Array.isArray(data)
          ? data.filter((job) =>
              job.locations_derived?.some((loc) =>
                loc.toLowerCase().includes("india")
              )
            )
          : [];

        setInternships(filtered); 
      } catch (e) {
        console.error("Failed to fetch internships", e);
      }
      setLoadingInternships(false);
    };
    fetchInternships();
  }, []);

  // Filter by search
  const searchedInternships = internships.filter((job) =>
    job.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show only 10 per page
  const displayedInternships = searchedInternships.slice(
    page * 10,
    page * 10 + 10
  );

  const handleNext = () => {
    if ((page + 1) * 10 < searchedInternships.length) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className="interview-prep">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Internship Alert Hub
      </motion.h1>

      {/* Search Bar */}
      <div style={{ marginBottom: "15px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search internships by role..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0); 
          }}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "80%",
            maxWidth: "400px"
          }}
        />
      </div>

      {/* Internship Alerts */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={4}
        className="prep-section internship-alerts"
      >
        {loadingInternships ? (
          <p>Loading internships...</p>
        ) : displayedInternships.length ? (
          <>
            <ul>
              {displayedInternships.map((intn, idx) => (
                <motion.li
                  key={intn.id || idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <strong>{intn.title}</strong> at{" "}
                  <em>{intn.organization}</em> —{" "}
                  {intn.locations_derived?.[0] || "Location N/A"}
                  {intn.url && (
                    <>
                      {" "}
                      —{" "}
                      <a href={intn.url} target="_blank" rel="noreferrer">
                        Apply →
                      </a>
                    </>
                  )}
                </motion.li>
              ))}
            </ul>
            
            {/* Pagination Buttons */}
            <div style={{ marginTop: "15px", textAlign: "center" }}>
              <button onClick={handlePrev} disabled={page === 0}>
                Prev
              </button>
              <span style={{ margin: "0 10px" }}>
                Page {page + 1} of {Math.ceil(searchedInternships.length / 10)}
              </span>
              <button
                onClick={handleNext}
                disabled={(page + 1) * 10 >= searchedInternships.length}
              >
                Next
              </button>
              <p style={{color:"#4f46e5",fontSize:"0.8rem",textAlign:"right",margin:"5px 3px"}}>*Please verify links carefully before applying, as some may lead to fraud</p>
            </div>
          </>
        ) : (
          <p>No internships found for your search.</p>
        )}
      </motion.section>
    </div>
  );
};

export default InterviewPrep;
