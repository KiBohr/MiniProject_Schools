import {useForm} from 'react-hook-form'
import axios from 'axios';

interface SchoolFormData {
    name: string;
    address: string;
    city: string;
    state: string;
    contact: string;
    email_id: string;
    image: FileList; // image comes as FileList from input[type='file']
  }
  

const AddSchoolForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<SchoolFormData>();

    const onSubmit = async (data: any) => {
        // Create FormData to hold form text data and the file
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
          if (key === "image" && value instanceof FileList) {
            formData.append(key, value[0]); // append file from FileList
          } else {
            formData.append(key, value as string); // append text fields
          }
        });
    
        try {
            await axios.post('http://localhost:3001/schools', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
              });
          alert('School added successfully');
        } catch (error) {
          alert('Error adding school');
          console.error(error);
        }
      };
    

    return ( 
        <form onSubmit={handleSubmit(onSubmit)}
        className='bg-accentB/20 p-5 rounded-md flex flex-col items-start justify-center gap-2 w-[90%] md:w-1/2'>
            <div className='flex flex-col items-start justify-center gap-2 w-full mb-2'> 
                <input 
                type="text" 
                placeholder="Name"
                className='bg-white/90 rounded-md px-2 py-1 w-full' {...register("name", { required: true })} />
                {errors.name && <p className='text-accentY'>Name is required</p>}

                <input 
                className='bg-white/90 rounded-md px-2 py-1 w-full' type="text" 
                placeholder="Address" {...register("address", { required: true })} />

                <input 
                type="text" 
                placeholder="City" {...register("city", { required: true })} 
                className='bg-white/90 rounded-md px-2 py-1 w-full'/>

                <input 
                type="text" 
                placeholder="State" {...register("state", { required: true })}
                className='bg-white/90 rounded-md px-2 py-1 w-full' />

                <input 
                type="text" 
                placeholder="Contact" {...register("contact", { required: true, pattern: /^[0-9]+$/ })}
                className='bg-white/90 rounded-md px-2 py-1 w-full' />
                {errors.contact && <p className='text-accentY'>Contact must be number</p>}

                <input 
                type="email" 
                placeholder="Email" {...register("email_id", { required: true, pattern: /\S+@\S+\.\S+/ })}
                className='bg-white/90 rounded-md px-2 py-1 w-full' />
                {errors.email_id && <p className='text-accentY'>Email format invalid</p>}
            </div>
            
            {/* image upload */}
            <div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              {...register("image", {
                required: "Image is required",
                validate: {
                  acceptedFormats: files =>
                    ['image/jpeg', 'image/png'].includes(files[0]?.type) || 'Only JPEG or PNG files',
                  lessThan5MB: files =>
                    files[0]?.size < 5000000 || 'File size should be less than 5MB',
                },
              })}
            />
            
              <label
              htmlFor="file-upload"
              className="cursor-pointer text-white"
              >
                Upload Image
              </label>
            {errors.image && <p className="text-accentY mt-1">{errors.image.message}</p>}
            </div>


            <button 
            className='font-bold self-center text-2xl hover:scale-110 transition-all duration-300 cursor-pointer hover:text-main' 
            type="submit">Submit</button>
        </form>
     );
}
 
export default AddSchoolForm;