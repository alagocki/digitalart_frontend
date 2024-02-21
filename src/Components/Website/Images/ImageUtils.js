import ImageItem from "../List/ImageItem";
import React from "react";

class ImageUtils {

    static errorHandler = (error) => {
        if ("ERR_BAD_REQUEST" === error.code) {
            // window.location.href = '/login';
        } else {
            console.log('Error: ', error);
        }
    }

    static prepareImageDataNew = (images, name) => {
        let imageData = [];
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const fileTypeParts = image.type.split('/');
            const fileReader = new FileReader();
            fileReader.readAsDataURL(image);
            fileReader.onload = () => {
                imageData[i] = {
                    name: ('' !== name) ? name + '_' + i + '.' + fileTypeParts.pop() : image.name,
                    description: 'Bild ' + i,
                    status: 'unbearbeitet',
                    ordered: false,
                    base64encoded: fileReader.result,
                    blocked: false
                }
            };
            fileReader.onerror = (error) => {
                console.log('Error: ', error);
            };
        }
        return imageData
    }

    static createImageListBlock = (imageData) => {
        return <div className="w-full grid md:grid-cols-3 md:gap-3 sm:grid-cols-1 sm:gap-1">
            {
                imageData.map((data, key) => {
                    let elementList = '';
                    // eslint-disable-next-line array-callback-return
                    Object.keys(data).map(() => {
                        elementList = <ImageItem
                            id={data.id}
                            key={key}
                            image={data}
                            selectedImagesCustomer=''
                            orderId=''
                            ordered=''
                            onChangePlus=''
                            onChangeMinus=''
                        />
                    });
                    return elementList;
                })
            }
        </div>
    }

}

export default ImageUtils;