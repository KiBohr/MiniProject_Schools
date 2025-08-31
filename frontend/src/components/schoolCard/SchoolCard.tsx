import type { ISchool } from "../../contract/interfaces/Interfaces";


const SchoolCard = ({id, name, address, city, image} :ISchool) => {
   
    return ( 
        <div
        key={id}
        className="bg-accentB/20 py-5 rounded-md flex flex-col items-center justify-center cursor-pointer hover:scale-x-105 transition-all duration-300 hover:shadow-xl">
            <img 
            src={image} 
            alt={`picture of ${name}`}
            className="bg-white w-full h-auto rounded-t-md object-cover" />
            <h2 className="font-medium">{name}</h2>
            <p>{address}</p>
            <p>{city}</p>
        </div>
     );
}
 
export default SchoolCard;