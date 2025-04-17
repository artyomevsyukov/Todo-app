export const INITIAL_STATE = {
    isValid: {
        title: true,
        date: true,
        post: true,
    },
    value: {
        title: '',
        date: new Date().toISOString().slice(0, 10),
        tag: '',
        post: '',
    },
    isFormReadyToSubmit: false,
};
