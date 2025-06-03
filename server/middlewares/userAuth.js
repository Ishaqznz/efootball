
const auth = (req, res, next) => {
    try {
        console.log('middle ware');
        
        if (req.session.user) {
            console.log('Session exists');
            next()
        } else {
            console.log('No session found');
            return res.status(400).json({ message: 'User not logged In!'})
        }
    } catch (error) {
        console.log('Error while authenticating the user: ', error);
        res.status(500).json({ message: 'Server error! '});
    }
}

module.exports = { auth };