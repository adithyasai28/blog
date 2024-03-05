import { Link } from "react-router-dom";
const Signin = () => {
    return ( 
        <div className="flex justify-center items-center h-screen flex-col ">
            <form className=" bg-gray-200 p-4 rounded-lg shadow-lg w-96">
                <h2 className="text-center text-2xl font-bold mb-4">Signin</h2>
                <div className="mb-4 flex flex-col">
                    <label className="block font-bold text-lg mb-2" htmlFor="Email">Email</label>
                    <input className="p-2 rounded-lg bg-yellow-200 text-slate-800" type="text" id="Email" />
                </div>
                <div className="mb-4 flex flex-col">
                    <label className="block font-bold text-lg mb-2" htmlFor="Password">Password</label>
                    <input className="p-2 rounded-lg bg-yellow-200 text-slate-800" type="password" id="Password" />
                </div>
                <div className="flex justify-center">
                    <button className="bg-amber-300 hover:bg-amber-500 rounded-full py-2 px-6 font-bold text-black" 
                    type="submit">Signin</button>
                </div>
            </form>
            <div className=" w-full flex justify-center my-10 border-black font-black">
                <hr className="w-1/4 border-black opacity-10 m-2" />
                <p>OR</p>
                <hr className="w-1/4 border-black opacity-10 m-2" />
            </div>
            <div className='flex flex-col'>
                <div className='flex justify-center'>
                    <button className="flex items-center justify-center px-6 rounded-full bg-black font-bold text-white py-4 gap-6">
                        <i className="w-5" class="fab fa-google"></i>
                        Continue With Google</button>
                </div>
                <div className='mt-6 text-dark-gray text-center mb-10'>
                    <p>Don't Have an Account ?
                        <Link className="underline textblack ml-2" to='/signup'>
                            Signup Here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
     );
}
 
export default Signin;
