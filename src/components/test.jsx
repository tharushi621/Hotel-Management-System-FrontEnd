export default function Test(){
    let num=0;
    return(
        <div className="bg-red-600 w-full h-[100vh] flex justify-center items-center">
            <div className="bg-white w-[350px] h-[350px] flex justify-center items-center">
                <button className="bg-green-500 w-[60px] h-[60px] rounded-full text-2xl text-white text-center" onClick={()=>{
                    num=num-1
                    console.log(num)
                }}> 
                    -
                </button>
                <span className="text-6xl">
                    {num}
                </span>
                <button className="bg-green-500 w-[60px] h-[60px] rounded-full text-2xl text-white text-center" onClick={()=>{
                    alert("Plus button clicked")
                }}> 
                    +
                </button>


            </div>
                sss
        </div>
    )
}