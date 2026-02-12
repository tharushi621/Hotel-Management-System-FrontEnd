import app from "../config/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage(app, "gs://my-custom-bucket");

export default function uploadMedia(file){
   if(!file){
    return;
   }
    const fileref=ref(storage,file.name);
    uploadBytes(fileref,file).then((snapshot)=>{
        getDownloadURL(snapshot.ref).then((url)=>{
            console.log(url)
        })

    })
   
}



