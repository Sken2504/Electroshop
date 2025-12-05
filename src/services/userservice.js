const User = require('../models/Usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

exports.getProfile = async (userId) => {
    const user = await User.findById(userId).select('name email phone dob gender');
    if (!user) {
        throw new Error('Không tìm thấy người dùng.');
    }
    return user;
};

exports.updateProfile = async (userId, updateData) => {
    const user = await User.findByIdAndUpdate(
        userId,
        {
            name: updateData.name,
            phone: updateData.phone,
            dob: updateData.dob,
            gender: updateData.gender
        },
        { new: true, runValidators: true }
    ).select('name email phone dob gender');

    if (!user) {
        throw new Error('Người dùng không tồn tại.');
    }
    return user;
};

exports.changePassword = async (userId, currentPassword, newPassword) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error('Người dùng không tồn tại.');
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        throw new Error('Mật khẩu hiện tại không chính xác.');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return true;
};

exports.createPasswordResetToken = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        // Trả về lỗi để client không biết email có tồn tại hay không (Tăng bảo mật)
        // Nhưng logic Controller sẽ bắt lỗi này và vẫn trả về thông báo chung
        throw new Error('Không tìm thấy người dùng với email này.');
    }

    // Tạo token ngẫu nhiên
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Lưu phiên bản đã mã hóa (hashed) của token vào DB
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Đặt thời gian hết hạn (1 giờ)
    user.passwordResetExpires = Date.now() + 60 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    // Trả về token gốc để gửi qua email
    return { user, resetToken };
};

// 2. Hàm gửi email
exports.sendPasswordResetEmail = async (user, resetToken) => {

    // 1. Tạo URL đặt lại mật khẩu (Dùng địa chỉ local 127.0.0.1:5500)
    const resetURL = `http://127.0.0.1:5500/reset-password.html?token=${resetToken}&email=${user.email}`;

    // 2. Cấu hình Transporter
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE, // "Gmail"
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // 3. Định nghĩa nội dung Email
    const mailOptions = {
        // BẮT BUỘC phải là email cá nhân của fen đã dùng để tạo App Password
        from: process.env.EMAIL_USERNAME,
        to: user.email,
        subject: 'Đặt Lại Mật Khẩu ElectroShop (Có hiệu lực 1 giờ)',
        html: `
            <p>Chào ${user.name},</p>
            <p>Vui lòng click vào đường link dưới đây để đặt lại mật khẩu:</p>
            <a href="${resetURL}" style="color: #ff6b00; font-weight: bold;">ĐẶT LẠI MẬT KHẨU</a>
            <p>Link này hết hạn sau 1 giờ.</p>
        `,
    };

    try {
        // 4. Gửi Email
        await transporter.sendMail(mailOptions);
        console.log(`✅ Đã gửi email đặt lại mật khẩu thành công tới: ${user.email} qua Gmail.`);
        return true;
    } catch (error) {
        console.error('❌ LỖI GỬI EMAIL (NODEMAILER/GMAIL):', error.message);
        // Throw lỗi để Controller bắt và trả về thông báo chung
        throw new Error('Gửi email đặt lại mật khẩu thất bại. Vui lòng kiểm tra lại App Password hoặc kết nối.');
    }
};

// 3. Hàm đặt lại mật khẩu
exports.resetPassword = async (email, token, newPassword) => {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
        email: email,
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
        throw new Error('Mã thông báo không hợp lệ hoặc đã hết hạn.');
    }

    user.password = await bcrypt.hash(newPassword, 10);

    // Vô hiệu hóa token
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    return user;
};