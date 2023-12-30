export const EmptySearch = ({ headers }) => {
    return (
        <>
            <div className="hidden md:flex justify-between items-center pr-24 pl-6 mt-10">
                {
                    headers.map((title, index) => (
                        <h3 key={index} className="text-lg font-semibold text-black">{title}</h3>
                    ))
                }
            </div>

            <div className="w-full flex flex-col justify-center items-center mt-10">
                <img src="/images/empty-img.png" className='w-[200px] mb-8' alt="Woman with a big lens in search of something" />
                <h2 className="text-3xl font-semibold text-[#252D3F] mb-2">OOPS! It's Empty</h2>
                <p className=" text-xl text-[#6E737F]">Looks like you haven't added any jobs yet...!!!</p>
            </div>
        </>
    )
};