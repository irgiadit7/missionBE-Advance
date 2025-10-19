const uploadImage = (req, res)=> {
    if (!req.file) {
    return res.status(400).send({ message: "Silakan upload sebuah file gambar." });
  }

  const imageUrl = `http://localhost:2000/uploads/${req.file.filename}`;

  res.status(201).send({
    message: "Gambar berhasil di-upload!",
    imageUrl: imageUrl,
  });
}

module.exports = {
    uploadImage
}