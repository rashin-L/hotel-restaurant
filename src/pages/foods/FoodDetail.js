import React from 'react';


function FoodDetail({ isOpen, onClose, children }) {

    return (
        <>
            {isOpen && (
                <div className=" font-Chalk text-stone-100 fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
                    <div className=" absolute top-10  rounded-lg p-6 w-[62rem] h-[32rem]">                    
                        
                        {children}
                    </div>
                </div>
            )}
        </>
    );
}

export default FoodDetail;