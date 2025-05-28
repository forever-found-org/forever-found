import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
function Footer(){
    return (
        <footer>
            <div className="bg-slate-300 ">
                <div className="p-8 pb-5 flex justify-evenly">
                    <div >
                        <h1 className="mb-2 text-lg font-semibold">Support and Legal</h1>
                        <ul>
                            <li className="hover:cursor-pointer hover:text-blue-700">FAQs</li>
                            <li className="hover:cursor-pointer hover:text-blue-700">Terms of Service</li>
                            <li className="hover:cursor-pointer hover:text-blue-700">Privacy Policy</li>
                        </ul>
                    </div>
                    <div >
                        <h1 className="mb-2 text-lg font-semibold">Contact</h1>
                        <ul>
                            <li  className="hover:cursor-pointer hover:text-blue-700">Email : support@foreverfound.org</li>
                            <li  className="hover:cursor-pointer hover:text-blue-700">Phone: 9076783812</li>
                        </ul>
                    </div>
                    <div >
                        <h1 className="mb-2 text-lg font-semibold">Follow Us</h1>
                        <div className="flex  hover:text-blue-700 hover:cursor-pointer">
                            <FaFacebookF className="mt-1 mr-1"/>
                            <p>Facebook</p>
                        </div>
                        <div className="flex  hover:text-blue-700 hover:cursor-pointer">
                            <FaInstagram className="mt-1 mr-1"/>
                            <p>Instagram</p>
                        </div>
                        <div className="flex  hover:text-blue-700 hover:cursor-pointer">
                            <FaTwitter className="mt-1 mr-1"/>
                            <p>Twitter</p>
                        </div>
                        <div className="flex  hover:text-blue-700 hover:cursor-pointer">
                            <FaLinkedinIn className="mt-1 mr-1"/>
                            <p>LinkedIn</p>
                        </div>
                    </div>
                </div>
                <p className="pb-3 text-center text-lg text-gray-800">© 2025 Forever Found. All rights reserved.</p>
            </div>
        </footer>

    );
}
export default Footer;