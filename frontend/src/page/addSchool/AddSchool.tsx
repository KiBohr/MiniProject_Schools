import AddSchoolForm from "../../components/addSchoolForm/AddSchoolForm";

const AddSchool = () => {
    return ( 
        <section className="flex flex-col items-center justify-center gap-5">
            <div className="mb-10 text-center">
                <h1 className="text-4xl  text-center md:text-5xl font-bold mb-1">Add School</h1>
                <p className="text-sm md:text-md">Enter the information for your school to be added to our collection</p>
            </div>
           
            <AddSchoolForm/>
        </section>
        
     );
}
 
export default AddSchool;