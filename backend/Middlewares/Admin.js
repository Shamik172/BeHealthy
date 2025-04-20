const Admin = (req, res, next) => {
    try {
        // Check if user exists and has admin role
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin only.'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error in admin verification'
        });
    }
};

module.exports = Admin;