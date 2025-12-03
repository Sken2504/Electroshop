exports.submitContactForm = async (req, res) => {
    try {
        const { name, email, phone, subject, content } = req.body; 

        if (!name || !email || !content) {
            return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin bắt buộc.' });
        }
        
        res.status(200).json({
            message: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ.'
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi gửi form liên hệ.' });
    }
};