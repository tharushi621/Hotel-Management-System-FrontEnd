import uploadMedia from "../utils/mediaUpload"
import { useState } from "react"

export default function TestPage(){
const [file,setFile]=useState(null)

    return(
        <div className="w-full h-[100vh] flex justify-center items-center">
            <input type="file" defaultValue={file} onChange={(e)=>{
                setFile(e.target.files[0])
            }}/>
            <button onClick={()=>{
                uploadMedia(file)
            }}>Submit</button>
        </div>
    )
}