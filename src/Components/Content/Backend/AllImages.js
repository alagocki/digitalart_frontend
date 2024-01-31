import React, {useState, useEffect} from "react";
import axios from "axios";



const AllImages = () => {


    const fetchImagesData = () => {

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [imageData, setImages] = useState([]);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            const fetchImages = async () => {
                try {
                    const response = await axios.get("/images/all");
                    if(response.status === 200) {
                        setImages(response.data.images);
                    } else {
                        console.error('ERROR: '+response.status);
                    }

                } catch (error) {
                    console.error(error);
                }
            };
            fetchImages();
        }, []);

        return (
            <ul className="list-disc">
                {imageData.map((image) => {
                    return <li className="" key={image.id}>{image.name}</li>;
                })}
            </ul>
        );

    };

    return (
        <div>{fetchImagesData()}</div>
    );

}

export default AllImages;