
function StaticDets({image,name,text}){
    return(
        <>
            <h1 className="text-3xl font-bold font-serif text-center my-6 uppercase">Helping Hands Foundation</h1>
            <div className="bg-[#E3F2FD] flex justify-evenly">
                <div className="py-10 m-4">
                    <img className="h-100 w-100 " src={image} alt={name} />
                </div>
                <div className="h-auto w-[40%] p-10 m-2">
                    <p className="text-md font-serif">{text}</p>
                </div>
            </div>
        </>

        
    );
}
export default StaticDets;