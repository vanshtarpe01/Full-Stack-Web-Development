// require('dotenv').config();
const ImageKit = require('@imagekit/nodejs');

const imagekit = new ImageKit({
    privateKey: "private_Rkyd2XYiSn7JxGrjMNHt2wZR2J4="
});


async function uploadFile(buffer) {
    const result = await imagekit.files.upload({
        file: buffer.toString("base64"),
        fileName: "image.jpg"
    });

    return result;
}

module.exports = uploadFile;