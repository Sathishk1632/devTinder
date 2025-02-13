
// const cloudinary=require('cloudinary').v2
// const fs=require('fs')

// cloudinary.config({ 
//     cloud_name: 'dv5tqm0tl', 
//     api_key: '388429384663898', 
//     api_secret: 'nxwx58pHyXCFLJSOuGFZ8kruV4k' // Click 'View API Keys' above to copy your API secret
// });

// const uploadResult =async ()=>{await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });
//     }

//        const uploadCloudinary=async(localFilePath)=>{
//         try {
//             if(!localFilePath) return null;

//             const url= await cloudinary.uploader.upload(localFilePath,{
//                 resource_type:"auto"
//             })
//             console.log("file Uploaded successfully");
//             return url;
//         } catch (error) {
//             fs.unlinkSync(localFilePath)
//         }
//        }

// module.exports=uploadCloudinary;
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dv5tqm0tl', 
    api_key: '388429384663898', 
    api_secret: 'nxwx58pHyXCFLJSOuGFZ8kruV4k'
});

module.exports = cloudinary;