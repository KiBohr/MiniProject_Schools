import { useEffect, useState } from "react";
import SchoolCard from "../../components/schoolCard/SchoolCard";
import axios from "axios";
import type { ISchool } from "../../contract/interfaces/Interfaces";

const ShowSchools = () => {
    
    const [schools, setSchools] = useState<ISchool[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get('http://localhost:3001/schools')
        .then(response => {
            setSchools(response.data);
            setError(null);
        })
        .catch(error => {
            setError('Schools are loading...');
            console.error('Error fetching schools:', error);
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    if (loading) return <div>Loading schools...</div>;
    if (error) return <div>{error}</div>;

    return ( 
        <section className="flex flex-col items-center justify-center gap-5 px-5">
            <h1 className="text-4xl md:text-5xl text-center font-bold mb-10">Explore Schools in Germany</h1>

            <div  className="grid gap-5 w-full place-items-center md:grid-cols-3">
                {schools.map((school) => {
                    console.log({school})
                    return (
                         <SchoolCard
                         id = {school.id}
                         name = {school.name}
                         address= {school.address}
                         city = {school.city}
                         image={school.image}/>
                        );
                })}
            </div>
        </section>

       
     );
}
 
export default ShowSchools;