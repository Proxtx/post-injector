export const uploadHandler = (req, res) => {
  req.files.web.mv("./test.png");
};
