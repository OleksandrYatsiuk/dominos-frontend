export const ValidationMessages = {
    currentPassword: [
        { type: 'required', message: 'Current Password is required.' },
    ],
    newPassword: [
        { type: 'password', message: 'Password must contain at least 8 symbols with numbers and letters!' },
        { type: 'maxlength', message: 'New Password should contain at most 20 character(s).' },
    ],
    confirmPassword: [
        { type: 'required', message: 'Confirm password is required.' },
        { type: 'confirmPasswordError', message: 'Confirm Password must be equal to "Password".' },
    ],
    fullName: [
        { type: 'required', message: 'Full Name is required.' },
        { type: 'maxlength', message: 'Full Name should contain at most 20 character(s).' },
        { type: 'minlength', message: 'Full Name should contain at least 4 character(s).' },
    ],
    username: [
        { type: 'required', message: 'Username is required.' },
        { type: 'maxlength', message: 'Username should contain at most 10 character(s).' },
        { type: 'minlength', message: 'Username should contain at least 3 character(s).' },
    ],
    password: [
        { type: 'required', message: 'Password is required.' },
        { type: 'password', message: 'Password must contain at least 8 symbols with numbers and letters!' },

    ],
    email: [
        { type: 'required', message: 'Email is required.' },
        { type: 'email', message: 'Email is invalid.' },
    ],
    title: [
        { type: 'required', message: 'Title is required.' },
        { type: 'minlength', message: 'Title should contain at least 10 character(s).' },
    ],
    content: [
        { type: 'required', message: 'Content is required.' },
        { type: 'minlength', message: 'Content should contain at least 20 character(s).' },
        { type: 'maxlength', message: 'Content should contain at most 1000 character(s).' },
    ]
};
