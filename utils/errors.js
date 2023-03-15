exports.handleError = (err, res) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
};