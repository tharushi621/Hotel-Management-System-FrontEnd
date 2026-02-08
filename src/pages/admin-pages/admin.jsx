import {Link,Route,Routes } from "react-router-dom";

export default function AdminPage(){
    return(
        <div className="w-full max-height-[100vh] overflow-hidden flex">
           <div className="w-[20%] bg-pink-600 h-[100vh] flex flex-col">
            <div className="text-white text-[30px] hover:text-[60px]">
                <Link to="/admin/bookings">Bookings</Link>
            </div>
            <div>
                <Link to="/admin/categories">Categories</Link>
            </div>
            <div>
                <Link to="/admin/rooms">Rooms</Link>
            </div>
             <div>
                <Link to="/admin/feedbacks">Feedbacks</Link>
            </div>
            <div>
                <Link to="/admin/gallery">Gallery</Link>
            </div>

           </div>
           <div className="w-[80%] bg-purple-600">

           </div>

        </div>

    )
}